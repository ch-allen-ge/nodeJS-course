const db = require('./db.js');

module.exports.handleSignup = (email, password) => {
	//check if email already exists
	db.saveUser({
		email: email,
		password: password
	});
	//send the welcome email
}