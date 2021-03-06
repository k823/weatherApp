const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
// Fix to path problem with handlebars
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'George K'
    });
});
 
app.get('/about', (req, res) => {
    res.render("about", {
      title: "About me",
      name: "George K",
    });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    name: 'George K',
    helpText: 'Help yourself'
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error })
    }

    forecast(latitude, longitude, (error, { temperature, forecast = 'Hopefully sunny' } = {}) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        address: req.query.address,
        location,
        temperature,
        forecast,
      });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    });
  }
  console.log(req.query.search);
  res.send({
    products: []
  });
});

app.get('/help/*', (req, res) => {
  res.render("404", {
    title: '404',
    errorText: "Cannot find help, have no mercy either",
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorText: 'Nothing to see here bud.'
  });
});
 
app.listen(port, () => {
    console.log('Server is up on port' + port);
});