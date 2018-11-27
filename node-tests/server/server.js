const express = require('express');

var app = express();

app.get('/', (request, response) => {
	//response.send('Hello World!');
	response.status(404).send({
		error: 'Page not found.',
		name: 'Todo App v1.0'
	});
});

app.get('/user', (request, response) => {
	response.send([{
		name: 'Allen',
		age: 23
	}, {
		name: 'Andrew',
		age: 25
	}, {
		name: 'Jen',
		age: 26
	}]);
})

app.listen(3000);

module.exports.app = app;