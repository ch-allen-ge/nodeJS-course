const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';

bcrypt.genSalt(10, (error, salt) => {
	bcrypt.hash(password, salt, (error, hash) => {
		console.log(hash);
	})
});

var hashedPassword = '$2a$10$rW/9tUNRWIZAGQP2Ztxpye7mbdL96qwvM7uaOya6hOHBSDUfFx5vy';

bcrypt.compare(password, hashedPassword, (error, result) => {
	console.log(res);
})
// var message = 'I am user number 3';
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
// 	id: 4
// };

// var token = {
// 	data: data,
// 	hash: SHA256(JSON.stringify(data) + 'somesecret').toString();
// };

// var resultHash = SHA256(JSON.stringify(toke.data) + 'somesecret').toString();

// if (resultHash === token.hash) {
// 	console.log('Data was not changed');
// } else {
// 	console.log('Data was changed, do not trust');
// }

// var data = {
// 	id: 10
// };

// var token = jwt.sign(data, '123abc');
// console.log(token);

// var decoded = jwt.verify(token, '123abc');
// console.log('decoded', decoded);