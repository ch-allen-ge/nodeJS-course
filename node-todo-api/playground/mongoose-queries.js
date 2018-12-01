const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose.js');
const {Todo} = require('./../server/models/todo.js');
const {User} = require('./../server/models/user.js');

//var id = '5c0210ac9e9b701f00e891b0';

// if (!ObjectID.isValid(id)) {
// 	console.log('ID not valid');
// }

// Todo.find({
// 	_id: id;
// }).then((todos) => {
// 	console.log('Todos', todos);
// });

// Todo.findOne({
// 	_id: id;
// }).then((todo) => {
// 	console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
// 	if (!todo) {
// 		return console.log('Id not found');
// 	}
// 	console.log('Todo By Id', todo);
// }).catch((error) => {
// 	console.log(error);
// });

User.findById('5c022ab92e338e7f872d4213').then((user) => {
	if (!user) {
		return console.log('User not found');
	}

	console.log(JSON.stringify(user, undefined, 2));
}, (error) => {
	console.log(error);
})
//if searching by an ID that doesn't exist, it will still 'succees', but will return nothing, so the promise resolved case will still run. Instead, we need to handle this properly