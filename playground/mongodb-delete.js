// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} =  require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('unable to connect to mongo db server');
    }

    console.log('connected to MongoDB server');

    //deleteMany
    // db.collection('Todos').deleteMany({text:'eat lunch'}).then((result) =>{
    //     console.log(result);
    //
    // });

    //deleteOne

    // db.collection('Todos').deleteOne({text:'deleteone'}).then((result) =>{
    //     console.log(result);
    //
    // });

    //findOneAndDelete

    // db.collection('Todos').findOneAndDelete({completed:true}).then((result) =>{
    //     console.log(result);
    // });

    // db.collection('Users').deleteOne({name:'Kevin'}).then((result) =>{
    //     console.log(result);
    // });

    // db.collection('Users').deleteMany({name:'Kevin'}).then((result) =>{
    //     console.log(result);
    // });

    db.collection('Users').findOneAndDelete({_id:new ObjectID('598e2e206bdfb0360bfa43a0')}).then((result) =>{
        console.log(result);
    });



    // db.close();

});