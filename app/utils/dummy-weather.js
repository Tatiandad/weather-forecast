const weather = {
	"coord": {
		"lon": -73.99,
		"lat": 40.73
	},
	"weather": [{
		"id": 501,
		"main": "Rain",
		"description": "moderate rain",
		"icon": "10n"
	}, {
		"id": 701,
		"main": "Mist",
		"description": "mist",
		"icon": "50n"
	}],
	"base": "stations",
	"main": {
		"temp": 39.78,
		"pressure": 1010,
		"humidity": 91,
		"temp_min": 37.94,
		"temp_max": 41
	},
	"visibility": 8047,
	"wind": {
		"speed": 10.29,
		"deg": 20,
		"gust": 7.7
	},
	"rain": {
		"1h": 0.94
	},
	"clouds": {
		"all": 90
	},
	"dt": 1545002100,
	"sys": {
		"type": 1,
		"id": 4686,
		"message": 0.0049,
		"country": "US",
		"sunrise": 1544962454,
		"sunset": 1544995800
	},
	"id": 5128581,
	"name": "New York",
	"cod": 200
};

export default weather;