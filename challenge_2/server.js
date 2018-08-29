const express = require('express');
const app = express();
const router = require('./routes.js')

// middleware
const parser = require('body-parser');
const morgan = require('morgan');

app.set('port', 3000);

// use middleware
app.use(morgan('dev'));
app.use(parser.json());

// static files
app.use('/', express.static('client'));

// set-up routing
app.use('/', router);

app.listen(app.get('port'), () => {
  console.log('app is listening to port 3000')
});