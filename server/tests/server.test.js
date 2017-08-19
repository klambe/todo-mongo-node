const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .set('x-auth', users[0].tokens[0].token)
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));

            });
    });

    it('Should not create todo with invalid body data', (done) => {

        request(app)
            .post('/todos')
            .set('x-auth', users[0].tokens[0].token)
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));

            });
    });
});

describe('GET /todos', () => {
    it('should get all todos for user', (done) => {
        request(app)
            .get('/todos')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(1);

            })
            .end(done);

    });
});

describe('GET /todos/:id', () => {
    it('should get todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);

            })
            .end(done);
    });

    it('should not return todo doc created by other user', (done) => {
        request(app)
            .get(`/todos/${todos[1]._id.toHexString()}`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(404)
            .end(done);
    });

    it('return a 404 if todo is not found', (done) => {
        request(app)
            .get(`/todos/${new ObjectID().toHexString()}`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(404)
            .end(done);

    });

    it('return a 404 for non object id', (done) => {
        request(app)
            .get(`/todos/123`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(404)
            .end(done);

    });
});

describe('DELETE /todos/:id', () => {
    it('Should remove a todo', (done) => {
        var id = todos[0]._id.toHexString();
        request(app)
            .delete(`/todos/${id}`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(id);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                //query database try find by id should return toNotExist
                Todo.findById(id).then((todo) => {

                    expect(todo).toNotExist();
                    done();

                }).catch((e) => done(e));
            });
    });

    it('return a 404 if delete todo is not found', (done) => {
        request(app)
            .delete(`/todos/${new ObjectID().toHexString()}`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(404)
            .end(done);
    });

    it('return a 404 for non object id to delete entered', (done) => {
        request(app)
            .delete(`/todos/123`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(404)
            .end(done);
    });

    it('return a 404 for request to delete todo from different creator', (done) => {
        var id = todos[0]._id.toHexString();
        request(app)
            .delete(`/todos/${id}`)
            .set('x-auth', users[1].tokens[0].token)
            .expect(404)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                //query database try find by id should return toNotExist
                Todo.findById(id).then((todo) => {

                    expect(todo).toExist();
                    done();

                }).catch((e) => done(e));
            });
    });
});

describe('PATCH /todos/:id', () => {
    it('should find todo and update complete to true', (done) => {

        var id = todos[0]._id.toHexString();
        var text = 'new string text';

        request(app)
            .patch(`/todos/${id}`)
            .set('x-auth', users[0].tokens[0].token)
            .send({
                text,
                completed: true
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completedAt).toBeA('number');
                expect(res.body.todo.completed).toBe(true);

            })
            .end(done);

    });

    it('should clear completedAt when todo is not completed', (done) => {

        var id = todos[1]._id.toHexString();

        request(app)
            .patch(`/todos/${id}`)
            .set('x-auth', users[1].tokens[0].token)
            .send({
                completed: false
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.completedAt).toBe(null);
                expect(res.body.todo.completed).toNotExist();
            })
            .end(done);
    });

    it('should return 404 if id and _creator dont match user', (done) => {

        var id = todos[1]._id.toHexString();

        request(app)
            .patch(`/todos/${id}`)
            .set('x-auth', users[0].tokens[0].token)
            .send({
                completed: false
            })
            .expect(404)
            .end(done);
    });

    //could also add later checks for invalid id and id not found similar to delete and find
});

describe('GET /users/me', () => {
    it('should return user if authenticated', (done) => {
        request(app)
            .get('/users/me')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(users[0]._id.toHexString());
                expect(res.body.email).toBe(users[0].email);

            })
            .end(done);

    });

    it('should return 401 if not authenticated', (done) => {
        request(app)
            .get('/users/me')
            // .set('x-auth', '123')
            .expect(401)
            .expect((res) => {
                expect(res.body).toEqual({});
            })
            .end(done);
    });
});

describe('POST /users', () => {
    it('should create a user', (done) => {

        var email = 'example@example.com';
        var password = '123MnB!';

        request(app)
            .post('/users')
            .send({email, password})
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toExist();
                expect(res.body._id).toExist();
                expect(res.body.email).toBe(email);
            })
            .end((err) => {
                if (err) {
                    return done(err);
                }
                User.findOne({email}).then((user) => {
                    expect(user).toExist();
                    expect(user.password).toNotBe(password);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should return validation errors if request email is invalid', (done) => {
        var email = 'example';
        var password = '123MnB!';

        request(app)
            .post('/users')
            .send({email, password})
            .expect(400)
            .end(done);

    });

    it('should return validation errors if request password is invalid', (done) => {
        var email = 'example@example.com';
        var password = '1234';

        request(app)
            .post('/users')
            .send({email, password})
            .expect(400)
            .end(done);

    });


    it('should not create user if email already registered', (done) => {
        var email = 'test@example.com';
        var password = '123MnB!';

        request(app)
            .post('/users')
            .send({email, password})
            .expect(400)
            .end(done);


    });
});

describe('POST /users/login', () => {
    it('should return valid token if username and password are correct', (done) => {

        request(app)
            .post('/users/login')
            .send({
                email: users[1].email,
                password: users[1].password
            })
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toExist();
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                User.findById(users[1]._id).then((user) => {
                    expect(user.tokens[1]).toInclude({
                        access: 'auth',
                        token: res.headers['x-auth']
                    });
                    done();
                }).catch((e) => done(e));
            });

    });

    it('should not return valid token if username is incorrect', (done) => {
        var email = 'xxfgxhg@example.com';
        var password = 'userOnePass';

        request(app)
            .post('/users/login')
            .send({email, password})
            .expect(400)
            .expect((res) => {
                expect(res.headers['x-auth']).toNotExist();
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                User.findById(users[1]._id).then((user) => {
                    expect(user.tokens.length).toBe(1);
                    done();
                }).catch((e) => done(e));
            });

    });

    it('should not return valid token if  password is incorrect', (done) => {
        var email = 'kevin@example.com';
        var password = 'userOnePassxxxxx';

        request(app)
            .post('/users/login')
            .send({email, password})
            .expect(400)
            .expect((res) => {
                expect(res.headers['x-auth']).toNotExist();
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                User.findById(users[1]._id).then((user) => {
                    expect(user.tokens.length).toBe(1);
                    done();
                }).catch((e) => done(e));
            });
    });
});

describe('Delete /users/me/token', () => {
    it('should delete token when user logs out', (done) => {

        request(app)
            .delete('/users/me/token')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                User.findById(users[0]._id).then((user) => {
                    expect(user.tokens.length).toBe(0);
                    done();
                }).catch((e) => done(e));
            });
    });
});