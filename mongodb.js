//CRUD operations

const {MongoClient, ObjectID} = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

const id = new ObjectID();



console.log(id);

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if(error){
        return console.log('Unable to connect to database');
    }

    console.log('Connected correctly');

    const db = client.db(databaseName);

    // db.collection('users').insertOne({
    //     name: 'Ankit',
    //     age: 20,
    // }, (error, result) => {
    //     if(error){
    //         return console.log('Unable to insert user');
    //     }

    //     console.log(result.ops);
    // });

    // db.collection('users').findOne({ name: 'Ank'}, (error, user) => {
    //     if(error){
    //         return console.log('Unable to fetch');
    //     }

    //     console.log(user);
    // });

    // db.collection('users').find({age: 20}).toArray( (error, user) => {
    //     if(error){
    //         return console.log('Unable to fetch');
    //     }

    //     console.log(user);
    // });

    db.collection('users').updateOne({
        _id: new ObjectID("605cba37a4ea1f44e80321ad")
    }, {
        $set: {
            name: 'Kim'
            }
    }).then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    });
});