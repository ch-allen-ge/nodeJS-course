const request = require('request');

var getWeather = (latitude, longitude, callback) => {
	request({
		url: `https://api.darksky.net/forecast/1152cf525f840547e0d793c027ed2dcb/${latitude},${longitude}`,
		json: true
	}, (error, response, body) => {
		if (!error && response.statusCode === 200) {
			callback(undefined, {
				temperature: body.currently.temperature,
				apparentTemperature: body.currently.apparentTemperature
			});
		} else {
			callback('Unable to fetch weather');
		}
	});
}

module.exports.getWeather = getWeather;