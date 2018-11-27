var asyncAdd = (a,b) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (typeof a === 'number' && typeof b === 'number') {
				resolve(a+b);
			} else {
				reject('Arguements must be numbers');
			}
		}, 1500);
	});
}

asyncAdd(1,2).then((result) => {
	console.log('Result: ', result);
	asyncAdd(result, 10);
}).then((result) => {
	console.log('New total: ', total);
}).catch((errorMessage) => {
	console.log(errorMessage);
});

// var somePromise = new Promise((resolve, reject) => {
// 	setTimeout(() => {
// 		//resolve('Hey. It worked');
// 		reject('Unable to fulfill promise');
// 	}, 2500);
// });

// somePromise.then((message) => {
// 	console.log('Success: ', message);
// }, (errorMessage) => {
// 	console.log('Error: ', errorMessage);
// });

//you can only resolve or reject with one arguement. If you need multiple parameters, just make an object and use that as 
//the arguement

//resolve and reject are like return statements. once one is called, it's over, can't call the other one later or even itself again