var env = process.env.NODE_ENV || 'development';

console.log('env ******', env);

if (env === 'development') {
	process.env.PORT = 3000;
	process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if (env === 'test') {
	process.env.PORT === 3000;
	process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash')

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');

var app = express();

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
			response.send(400).send();
		});
});

app.delete('/todos/:id', (request, response) => {
	var id = request.params.id;

	if (!ObjectID.isValid(id)) {
		return response.status(404).send();
	}

	Todo.findByIdAndRemove(id)
		.then((todo) => {
			if (!todo) {
				return response.send(404).send();
			}

			response.send({todo});
		})
		.catch((error) => {
			response.status(400).send();
		});
});

app.patch('/todos/:id', (request, response) => {
	var id = request.params.id;
	var body = _.pick(request.body, ['text', 'completed']);

	if (!ObjectID.isValid(id)) {
		return response.status(404).send();
	}

	if (_.isBoolean(body.completed) && body.completed) {
		body.completedAt = new Date().getTime();
	} else {
		body.completed = false;
		body.completedAt = null;
	}

	Todo.findByIdAndUpdate(id, {
		$set: body
	}, {
		new: true
	}).then((todo) => {
		if (!todo) {
			return response.status(404).send();
		}

		response.send({todo});
	}).catch((error) => {
		response.status(400).send();
	})
});

app.listen(process.env.PORT, () => {
	console.log(`Started server on port ${process.env.PORT}`);
});

module.exports.app = app;