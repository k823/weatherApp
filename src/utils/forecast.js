const request = require("request");

// Body equals the response object destructured i.e.: response.body

const forecast = (latitude, longitude, callback) => {
  const url = "http://api.weatherstack.com/current?access_key=7b7b570c8c6ee36fd6395abdfaa6c1c2&query=" + encodeURIComponent(latitude) + ",%20-" + encodeURIComponent(longitude) + "#";
  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback("Unable to connect to weather services", undefined);
    } else if (body.error) {
        callback("Unable to find location", undefined);
    } else {
        callback(undefined, {
          temperature: body.current.temperature,
          forecast: body.current.weather_descriptions[0]
        });
    }
  });
};

module.exports = forecast;
