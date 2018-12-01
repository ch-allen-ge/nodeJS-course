//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true},  (error, client) => {
	if (error) {
		return console.log('Unable to connect to MongoDB server');
	} 

	console.log('Connected to MongoDB server');
	const db = client.db('TodoApp');

	db.collection('Todos').find({
		_id: new ObjectID('5bfedd10f15bfb23c4b5c17d');
		//completed: false
	}).toArray().then((docs) => {  //.find() returns everything in collection, adding object inside helps to specify things
		console.log('Todos');
		console.log(JSON.stringify(docs, undefined, 2));
	}, (error) => {
		console.log('Unable to fetch todos', error);
	});

	db.collection('Todos').find().count().then((count) => { 
		console.log(`Todos count: ${count}`);
	}, (error) => {
		console.log('Unable to fetch todos', error);
	});

	db.collection('Users').find({name: 'Allen'}).toArray().then((docs) => {
		console.log(JSON.stringify(docs, undefined, 2));
	}, (error) => {
		console.log('Error fetching data', error);
	});
	//client.close();
});