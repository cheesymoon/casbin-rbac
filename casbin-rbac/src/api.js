const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const status = require('./routes/status');
const articles = require('./routes/articles');

const app = express();

// Set up port
app.set('port', 3001);

// Set up middleware

// Set up body parser in order to get post values
app.use(bodyParser.json());

// Allow to override PUT and DELETE methods using custom header
app.use(methodOverride('X-HTTP-Method-Override'));

// Set up default content type
app.get('*', (req, res, next) => {
  res.header('Content-Type', 'application/json; charset=utf-8');
  next();
});

// Routers

// /status
app.use('/status', status);

// // /articles
app.use('/articles', articles);

// // /locations
// app.use('/locations', locations);

// app.use('/auth', auth);
// Not found error handling
/* eslint-disable no-unused-vars */
app.use((req, res) => {
  console.log(`Not found URL: ${req.url}`);
  res.status(404).send(JSON.stringify({
    status: 'error',
    message: 'Not found',
  }));
});

// 500 error handling
app.use((err, req, res, next) => {
  console.log(`Internal server error: ${err}`);
  res.status(500).send(JSON.stringify({
    status: 'error',
    message: 'Internal server error',
  }));
});
/* eslint-enable no-unused-vars */

// Express error logging
app.on('error', (err) => {
  console.log(`Express: ${err}`);
});

// Start web server using defined port
app.listen(app.get('port'), () => {
  console.log('App is running on port', app.get('port'));
});
