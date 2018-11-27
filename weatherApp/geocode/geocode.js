const request = require('request');

var geocodeAddress = (address, callback) => {
	var encodedAddress = encodeURIComponent(address);

	request({
		url: `http://www.mapquestapi.com/geocoding/v1/address?key=xVQitE8PA4McJpKofQMhHz5QBbMo2hAS&location=${encodedAddress}`,
		json: true
	}, (error, response, body) => {
			callback(undefined, {
				address: body.results[0].providedLocation.location,
				latitude: body.results[0].locations[0].latLng.lat,
				longitude: body.results[0].locations[0].latLng.lng
			});
	});
}

module.exports.geocodeAddress = geocodeAddress;