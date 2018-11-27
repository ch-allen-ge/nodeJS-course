var square = (x) => x * x;
console.log(square(9));

var user = {
	name: 'Allen',
	sayHi: () => {
		console.log(arguements);
		console.log(`Hi. I'm ${this.name}`);
	},
	sayHiAlt () {
		console.log(arguements);
		console.log(`Hi. I'm ${this.name}`)
	}
};

user.sayHi(1, 2, 3);