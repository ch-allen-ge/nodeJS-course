const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
	.options({
		a: {
			demand: true,
			alias: 'address',
			describe: 'Address to fetch weather for',
			string: true
		}
	})
	.help()
	.alias('help', 'h')
	.argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=xVQitE8PA4McJpKofQMhHz5QBbMo2hAS&location=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
	if (response.data.status === 'ZERO_RESULTS') {
		throw new Error('Unable to find that address');
	}

	var latitude = response.data.results[0].locations[0].latLng.lat;
	var longitude = response.data.results[0].locations[0].latLng.lng;
	var weatherUrl = `https://api.darksky.net/forecast/1152cf525f840547e0d793c027ed2dcb/${latitude},${longitude}`;
	
	return axios.get(weatherUrl);
}).then((response) => {
	var temperature = response.data.currently.temperature;
	var apparentTemperature = response.data.currently.apparentTemperature;

	console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
}).catch((error) => {
	if (error.code === 'ENOTFOUND') {
		console.log('Unable to connect to API servers');
	} else {
		console.log(error.message);
	}
});