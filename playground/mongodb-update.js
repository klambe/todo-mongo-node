// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('unable to connect to mongo db server');
    }

    console.log('connected to MongoDB server');

    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('598e2bed6bdfb0360bfa439f')
    }, {
        $set:{
            completed:true
        }

    },{
        returnOriginal: false
    }).then((result) =>{
        console.log(result);

    });

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('598df955fcedb044b3e73e8a')
    }, {
        $set: {
            name: 'kevin'
        }, $inc: {
            age: 1
        }

    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);

    });

    // db.close();

});