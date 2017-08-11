// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} =  require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('unable to connect to mongo db server');
    }

    console.log('connected to MongoDB server');

// db.collection('Todos').find({
//     _id: new ObjectID('598e00296bdfb0360bfa4394')
// }).toArray().then((docs) => {
//     console.log('Todos');
//     console.log(JSON.stringify(docs, undefined, 2));
//
// }, (err) =>{
//     console.log('unable to fetch', err);
// });


    db.collection('Users').find({
        name: 'Kevin'
    }).toArray().then((docs) => {
        console.log('Users');
        console.log(JSON.stringify(docs, undefined, 2));

    }, (err) =>{
        console.log('unable to fetch', err);
    });

    // db.collection('Todos').find({ }).count().then((count) => {
    //     console.log(`Todos count: ${count}`);
    // }, (err) =>{
    //     console.log('unable to fetch', err);
    // });

    db.collection('Users').find({ name: 'Kevin'}).count().then((count) => {
        console.log(`Users count: ${count}`);
    }, (err) =>{
        console.log('unable to fetch', err);
    });

    // db.close();

});