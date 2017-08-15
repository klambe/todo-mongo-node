const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//existing id
var id = '6991dcffe05e50eb0b4d56ef11';

if(!ObjectID.isValid(id)){
    console.log('Id Not Valid');
}

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });
//
// Todo.findOne({
//     _id: id
// }).then((todo) => {
//
//     if(!Todo){
//         return console.log('Id Not Found');
//     }
//     console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//     if(!Todo){
//         return console.log('Id Not Found');
//     }
//     console.log('Todo By Id', todo);
// }).catch((e) => console.log(e));

userId = '598eff3f77bc67f305e3b38e';

User.find({
    _id: userId
}).then((users) => {
    console.log('Users', users);
});

User.findOne({
    _id: '598eff459c1394f6050f50d2'
}).then((users) => {
    console.log('Users', users);
});

// 598f03182388c1a606305e24

User.findById('668f03182388c1a606305e24').then((user) => {
    if(!user){
        return console.log('User Not Found');
    }
    console.log('User By Id', user);
}).catch((e) => console.log(e));