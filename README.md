# Five day weather forecast
A weather forecast single-page app using OpenWeatherMap API (http://openweathermap.org/forecast5)

## Stack
* Node - v10.14.1
* npm - 8.0.0
* React - 16.6.3
* Webpack - 4.27.1
* Jest
* Enzyme

## Libraries
* react-collapsible - 2.3.2
* moment.js - 2.23.0

## Running the app
You should have Node.js installed

npm run install
npm run start

## Testing
I'm using jest and enzyme for testing

The following command will run all tests
npm run test

The following command will output the coverage
npm run coverage

# What to improve

### Caching
As per OpenWeatherMap documentation, the data is updated every 10 minutes, which means that ideally we'd want to store the previous results and limit the calls to the API sooner than every 10 minutes.

In general locations and images (icons) could also be cached to avoid calling API every time we need any of those

### Getting city ID
As per OpenWeatherMap documentation, the best accurancy is achieved when using the city ID. While OpenWeatherMap seems to offer "find" service, I've decided not to use it for this demo app as there seemed to a wating time to activate the service

### Usability
Right now I don't provide a list of cities that would match the user's input. This means that the first matched location is used to retirive the weather data. 
If I had more time, I would definitely add this feature. This way should the user enter a name of the city that match a number of cities, I would display a dropdown with a city name and a country so that the user could refine the search

Also I only provided a limit weather data, temperature, temperature description, wind data. This could be adjusted based on the target audience. For example garden lovers or farmers might need more details.

### API Calls
Right now I have them directly in the component, which is not necessarily the best way of doing it. Also the my API key is hardcoded, which is not so good either. Having this project build in the real world would require apply security techniques etc.

### Cross-browser compatibility and responsive design
This app has only been tested in Chrome. I would expect certain bugs if used in other browsers.
As for the responsive design, even though I did implement it, it has very limited adjustments for various devices, e.g. the break points might need to be revisited as well as the design concept.

The responsive aspect of the app was tested only in the Chrome's Responsive design mode, it was not tested on simulators nor on actual devices.
 
### Errors handling
Currently I provide a very simple error handling for a very limited errors set. Ideally this would need more investigation and as result might require to introduce additional error cases.


