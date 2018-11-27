const express = require('express');
const handlebars = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

handlebars.registerPartials(__dirname + '/views/partials');

handlebars.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

handlebars.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((request, response, next) => {
	var now = new Date().toString();
	var log = `${now}: ${request.method} ${request.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append to server log');
		}
	});
	next();
});

// app.use((request, response, next) => {
// 	response.render('maintenance.hbs');
// });

//app.use() runs in the order its written. make sure to write them in order to avoid having people accessing pages we don't want shown

app.get('/', (request, response) => {
	//response.send('<h1>Hello Express</h1>');
	response.render('home.hbs', {
		welcomeMessage: 'Welcome to my website',
		pageTitle: 'Home Page',
	})
});

app.get('/projects', (request, response) => {
	response.render('projects.hbs', {
		welcomeMessage: 'Welcome to my website',
		pageTitle: 'Projects Page',
	});
});

app.get('/about', (request, response) => {
	//response.send('About Page');
	response.render('about.hbs', {
		pageTitle: 'About Page',
	});
});

app.get('/bad', (request, response) => {
	response.send({
		errorMessage: 'Unable to handle request'
	});
});

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});