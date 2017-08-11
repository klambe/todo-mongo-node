// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} =  require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('unable to connect to mongo db server');
    }

    console.log('connected to MongoDB server');


    // db.collection('Todos').insertOne({
    //     text: 'Kevin do something',
    //     completed: false
    // }, (err, result) =>{
    //     if(err){
    //         return console.log('unable to insert', err);
    //     }
    //
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    //
    // });

    //insert new doc into Users collection (name, age, location)

    // db.collection('Users').insertOne({
    //     name: 'Kevin',
    //     age: 31,
    //     location: 'Dublin'
    // }, (err, result) =>{
    //     if(err){
    //         return console.log('unable to insert', err);
    //     }
    //
    //     console.log(JSON.stringify(result.ops[0]._id.getTimestamp()));
    //
    // });

    db.close();

});