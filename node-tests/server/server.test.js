const supertest = require('supertest');
const expect = require('expect');

var app = require('./server').app;

describe('server', () => {

	describe('GET /', => {
		it('should return hello world response', (done) => {
			supertest(app)
				.get('/')
				.expect(200)
				//.expect('Hello World!')
				//.expect({
				//	error: 'Page not found.',
				//})
				.expect((res) => {
					expect(res.body).toInclude({
						error: 'Page not found.'
					});
				})
				.end(done);
		});
	});

	describe('GET /users', () => {
		it('should return my user object', (done) => {
			supertest(app)
				.get('/user')
				.expect(200)
				.expect((res) => {
					expect(res.body).toInclude({
						name: 'Andrew',
						age: 25
					});
				})
				.end(done);
		});
	});
});