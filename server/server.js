var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo', {
    text: {
        type: String
    },
    completed: {
        type: Boolean

    },
    completedAt: {
        type: Number

    }
});

var newTodo = new Todo({
    text: 'Cook Dinner'
});

var newTodo2 = new Todo({
    text: 'Eat Dinner',
    completed: true,
    completedAt: 25
});

newTodo.save().then((doc) => {
    console.log('Saved Doc', doc);

}, (e) => {
    console.log('unable to connect', e)

});


newTodo2.save().then((doc) => {
    console.log('Saved Doc', doc);

}, (e) => {
    console.log('unable to connect', e)

});

// newTodo2.save(); //this is valid but you get no response in the consoleg