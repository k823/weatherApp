const request = require("request");

// Body equals the response object destructured i.e.: response.body

const geocode = (adress, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(adress)}.json?access_token=pk.eyJ1Ijoia2FzcGFtYW4yMyIsImEiOiJjazliZHZwNDQwMTU0M2ZteWg2OHhmdTlxIn0.j-bvfRHGujJLh8B93IjzvQ&limit=1`;
  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[0],
        longitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;