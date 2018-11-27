const expect = require('expect');
const utils = require('./utils.js');

describe('Utils', () => {

	describe('#add', () => {
		it('should add two numbers', () => {
			var res = utils.add(33,11);

			expect(res).toBe(44).toBeA('number');
		});
	});

	it ('should square a number', () => {
		var res = utils.square(4);

		expect(res).toBe(16).toBeA('number');
	});

	it('should expect some value', () => {
		expect(12).toNotBe(11);
		expect({name: 'Allen'}).toEqual({name: 'Allen'});
		expect({name: 'allen'}).toNotEqual({name: 'Allen'});
		expect([2,3,4]).toInclude(3);
		expect([2,3,4]).toExclude(5);
		expect({
			name: 'Allen',
			age: 23,
			location: 'Boston'
		}).toInclude({
			age: 23
		});
		expect({
			name: 'Allen',
			age: 23,
			location: 'Boston'
		}).toExclude({
			age: 25
		})
	});
});


it('should set firstName and lastName', () => {
	var user = {location: 'Boston', age: 23};

	var res = utils.setName(user, 'Allen Tan');

	expect(res).toInclude({
		firstName: 'Allen',
		lastName: 'Tan'
	});
});

it('should async add two numbers', (done) => {
	utils.asyncAdd(4, 3, (sum) => {
		expect(sum).toBe(7).toBeA('number');
		done();
	});
});

it('should async square two numbers', (done) => {
	utils.asyncSquare(4, (sum) => {
		expect(sum).toBe(16).toBeA('number');
		done();
	});
});
//toBe() uses === to test, so will work for numbers, strings, and booleans, but won't work for array or JSON comparison. Instead, use toEqual()