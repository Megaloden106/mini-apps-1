const express = require('express');
const morgan = require('morgan');
const parser = require('body-parser');

const router = require('./routes.js');
const app = express();

// middleware
app.use(morgan('dev'));
app.unsubscribe(parser.json());

// router
app.use('/', router);

// serve static
app.use(express.static('public'))

// set port
app.set('port', 7878);

app.listen(app.get('port'), () => {
  console.log(`App is listening to port: ${app.get('port')}`);
});