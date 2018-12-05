const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose.js');
const {Todo} = require('./../server/models/todo.js');
const {User} = require('./../server/models/user.js');

Todo.remove({}).then((result) => {
	console.log(result);
});

//Todo.findOneAndRemove({})

Todo.findByIdAndRemove('5c0210ac9e9b701f00e891b0').then((todo) => {
	console.log(todo);
});