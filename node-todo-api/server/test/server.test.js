const expect = require('expect');
const supertest = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server.js');
const {Todo} = require('./../models/todo.js');

const todos = [{
	_id: new ObjectID(),
	text: 'First todo test'
}, {
	_id: new ObjectID(),
	text: 'Second test todo'
}];

beforeEach((done) => {
	Todo.remove({}).then(() => {
		return Todo.insertMany(todos);
	}).then(() => {
		done();
	});
});

describe('POST /todos', () => {
	it('should create a new todo', (done) => {
		var text = 'Run Florida Beast'

		supertest(app)
			.post('/todos')
			.send({text})
			.expect(200)
			.expect((response) => {
				expect(response.body.text).toBe(text)
			})
			.end((error, response) => {
				if (error) {
					return done(error);
				}

				Todo.find({text}).then((todos) => {
					expect(todos.length).toBe(1);
					expect(todos[0].text).toBe(text);
					done();
				}).catch((error) => {
					done(error);
				});
			});
	});

	it('should not create todo with invalid body data', (done) => {
		supertest(app)
			.post('/todos')
			.send('')
			.expect(400)
			.end((error, response) => {
				if (error) {
					return done();
				}
				
				Todo.find().then((todos) => {
					expect(todos.length).toBe(2);
					done();
				}).catch((error) => {
					done(error);
				})
			});
	});
});

describe('GET /todos', () => {
	it('should get all todos', (done) => {
		supertest(app)
			.get('/todos')
			.expect(200)
			.expect((response) => {
				expect(response.body.todos.length).toBe(2);
			})
			.end(done);
	});
});

describe('GET /todos/:id', () => {
	it('should return todo doc', (done) => {
		supertest(app)
			.get(`/todos/${todos[0]._id.toHexString()}`)
			.expect(200)
			.expect((response) => {
				expect(response.body.todo.text).toBe(todos[0].text);
			})
			.end(done);
	});

	it('should return a 404 if todo not found', (done) => {
		var fakeId = new ObjectID().toHexString();

		supertest(app)
			.get(`/todos/${fakeId}`)
			.expect(404)
			.end(done);
	});

	it('should return 404 for non-object ids', (done) => {
		var fakeId = '12345';

		supertest(app)
			.get(`/todos/${fakeId}`)
			.expect(404)
			.end(done);
	});
});