const expect = require('expect');
const supertest = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user')
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

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

describe('DELETE /todos/:id', () => {
	it('should remove a todo', (done) => {
		var hexId = todos[1]._id.toHexString();

		supertest(app)
			.delete(`/todos/${hexId}`)
			.expect(200)
			.expect((response) => {
				expect(response.body.todo._id).toBe(hexId);
			}).end((error, response) => {
				if (error) {
					return done(error);
				}

				Todo.findById(hexId).then((todo) => {
					expect(todo).toNotExist();
					done();
				}).catch((error) => {
					done(error);
				});
			});
	});

	it('should return a 404 if todo not found', (done) => {
		var hexId = new ObjectID().toHexString();

		supertest(app)
			.delete(`/todos/${hexId}`)
			.expect(404)
			.end(done);
	});

	it('should return a 404 if object id is invalid', (done) => {
		var hexId = todos[1]._id.toHexString();

		supertest(app)
			.delete('/todos/abc123')
			.expect(404)
			.end(done);
	});
});

describe('PATCH /todos/:id', () => {
	it('should update the todo', (done) => {
		var id = todos[0]._id.toHexString();

		var newData = {
			text: "Replacement Text",
			completed: true
		};

		supertest(app)
			.patch(`/todos/${id}`)
			.send(newData)
			.expect(200)
			.expect((response) => {
				expect(response.body.todo.text).toBe(newData.text);
				expect(typeof response.body.todo.completedAt).toBe('number');
				expect(response.body.todo.completed).toBe(true);
			})
			.end(done);
	});

	it('should clear completedAt when todo is not completed', (done) => {
		var id = todos[1]._id.toHexString();

		var newData = {
			text: "Replacement Text",
			completed: false
		};

		supertest(app)
			.patch(`/todos/${id}`)
			.send(newData)
			.expect(200)
			.expect((response) => {
				expect(response.body.todo.text).toBe(newData.text);
				expect(response.body.todo.completedAt).toBe(null);
				expect(response.body.todo.completed).toBe(false);
			})
			.end(done);
	});
});

describe('GET users/me', () => {
	it('should return user if authenticated', (done) => {
		supertest(app)
			.get('/users/me')
			.set('x-auth', users[0].tokens[0].token)
			.expect(200)
			.expect((response) => {
				expect(response.body._id).toBe(users[0]._id.toHexString());
				expect(response.body.email).toBe(users[0].email);
			})
			.end(done);
	});

	it('should return a 401 if not authenticated', (done) => {
		supertest(app)
			.get('/users/me')
			.expect(401)
			.expect((response) => {
				expect(response.body).toEqual({});
			})
			.end(done);
	});
});

describe('POST /users', () => {
	it('should create a user', (done) => {
		var email = 'example@example.com';
		var password = '123mnb!';

		supertest(app)
			.post('/users')
			.send({email, password})
			.expect(200)
			.expect((response) => {
				expect(response.headers['x-auth']).toExist();
				expect(response.body._id).toExist();
				expect(response.body.email).toBe(email);
			})
			.end((error) => {
				if (error) {
					return done(error);
				}

				User.findOne({email}).then((user) => {
					expect(user).toExist();
					expect(user.password).toNotBe(password);
					done();
				}).catch((error) => {
					done(error);
				});
			});
	});

	it('should return validation errors if request invalid', (done) => {
		supertest(app)
			.post('/users')
			.send({
				email: 'fakeemail.com',
				password: 'fake123'
			})
			.expect(400)
			.end(done);
	});

	it('should not create user if email in use', (done) => {
		supertest(app)
			.post('/users')
			.send({
				email: users[0].email,
				password: 'doesntmatter'
			})
			.expect(400)
			.end(done);
	});
});

describe('POST /users/login', () => {
	it('should login user and return auth token', (done) => {
		supertest(app)
			.post('/users/login')
			.send({
				email: users[1].email,
				password: users[1].password
			})
			.expect(200)
			.expect((response) => {
				expect(response.headers['x-auth']).toExist();
			})
			.end((error, response) => {
				if (error) {
					return done(error);
				}

				User.findById(users[1]._id).then((user) => {
					expect(user.tokens[0]).toInclude({
						access: 'auth',
						token: response.headers['x-auth']
					});

					done();
				})
				.catch((error) => {
					done(error);
				});
			});
	});

	it('should reject invalid login', (done) => {
		supertest(app)
			.post('/users/login')
			.send({
				email: users[1].email,
				password: 'wrongPassword'
			})
			.expect(400)
			.expect((response) => {
				expect(response.headers['x-auth']).toNotExist();
			})
			.end((error, response) => {
				if (error) {
					return done(error);
				}

				User.findById(users[1]._id).then((user) => {
					expect(user.tokens.length).toEqual(0);

					done();
				})
				.catch((error) => {
					done(error);
				});
			});
	});
});

describe('DELETE /users/me/token', () => {
	it('should remove auth token on logout', (done) => {
		supertest(app)
			.delete('/users/me/token')
			.set('x-auth', users[0].tokens[0].token)
			.expect(200)
			.end((error, response) => {
				if (error) {
					return done(error);
				}

				User.findById(users[0]._id)
					.then((user) => {
						expect(user.tokens.length).toBe(0);
						done();
					})
					.catch((error) => {
						done(error);
					});
			});
	});
});