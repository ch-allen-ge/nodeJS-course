var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (request, response) => {
	var todo = new Todo({
		text: request.body.text
	});

	todo.save().then((doc) => {
		response.send(doc);
	}, (error) => {
		response.status(400).send(error);
	});
});

app.get('/todos', (request, response) => {
	Todo.find().then((todos) => {
		response.send({todos});
	}, (error) => {
		response.status(400).send(error);
	});
});

//GET /todos/12343

app.get('/todos/:id', (request, response) => {
	var id = request.params.id;

	if (!ObjectID.isValid(id)) {
 		return response.status(404).send();
 	}
	
 	Todo.findById(id)
 		.then((todo) => {
			if (!todo) {
				return response.status(404).send();
			} 
				
			response.send({todo});
			
		}).catch((error) => {
			response.send(400).send({});
		});
});

app.listen(port, () => {
	console.log(`Started server on port ${port}`);
});

module.exports.app = app;