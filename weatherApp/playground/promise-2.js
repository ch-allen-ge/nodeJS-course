const request = require('request');

var geocodeAddress = (address) => {

	return new Promise((resolve, reject) => {
		var encodedAddress = encodeURIComponent(address);
		request({
			url: `http://www.mapquestapi.com/geocoding/v1/address?key=xVQitE8PA4McJpKofQMhHz5QBbMo2hAS&location=${encodedAddress}`,
			json: true //tells us object being returned is a json string, so it can convert it back into a json object for us
		}, (error, response, body) => {
				if (error) {
					reject('Unable to fetch weather');
				} else {
					resolve({
						address: body.results[0].providedLocation.location,
						latitude: body.results[0].locations[0].latLng.lat,
						longitude: body.results[0].locations[0].latLng.lng
					});
				}
		});
	});
};

geocodeAddress('19146').then((location) => {
	console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
	console.log(errorMessage);
});