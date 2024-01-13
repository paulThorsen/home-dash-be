const axios = require('axios');
const async = require('async');

const apiBaseURI = 'https://api.openweathermap.org/data/2.5';

openWeatherApiCall = async (path) => {
    const options = {
        method: 'GET',
        url: `${apiBaseURI}/${path}?lat=${process.env.OPEN_WEATHER_LAT}&lon=${process.env.OPEN_WEATHER_LON}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=imperial`,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        return (await axios(options)).data;
    } catch (e) {
        console.error(e);
    }
};

getWeather = async () => {
    return new Promise((resolve, reject) => {
        const apiPaths = ['weather', 'forecast'];
        console.log('Getting weather');
        async.parallel(
            apiPaths.map(
                (path) => (cb) =>
                    openWeatherApiCall(path)
                        .then((data) => cb(null, data))
                        .catch((error) => cb(error))
            ),
            (error, [weather, forecast]) => {
                if (error) {
                    reject(error);
                }
                resolve({
                    cod: weather.cod,
                    sunrise: forecast.city.sunrise,
                    sunset: forecast.city.sunset,
                    weather: weather.weather,
                    main: weather.main,
                    forecast: forecast.list.slice(0, 5),
                });
            }
        );
    });
};

module.exports = { getWeather };
