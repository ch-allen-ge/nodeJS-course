//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true},  (error, client) => {
	if (error) {
		return console.log('Unable to connect to MongoDB server');
	} 

	console.log('Connected to MongoDB server');
	const db = client.db('TodoApp');

	db.collection('Todos').findOneAndUpdate({
		_id: new ObjectID('5bfef87d2e338e7f872cf7ef')
	}, {
		$set: {
			completed: true
		}
	}, {
		returnOriginal: false
	}).then((result) => {
		console.log(result);
	});

	db.collection('Users').findOneAndUpdate({
		_id: new ObjectID('5bfef2b489080c1a54aeb42d')
	}, {
		$inc: {
			age: 1
		}
	}, {
		returnOriginal: false
	}).then((result) => {
		console.log(result);
	});

	//client.close();
});

//5bfef87d2e338e7f872cf7ef