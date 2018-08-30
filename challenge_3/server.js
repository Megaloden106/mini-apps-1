const express = require('express');
const app = express();

// middleware
const router = require('./routes.js');
const morgan = require('morgan');
const parser = require('body-parser');

// set port
app.set('port', process.env.PORT || 7878);

// use middleware
app.use(morgan('dev'));
app.use(parser.json());

// serve static
app.use(express.static('public'))

app.use('/', router)

// listen to port
app.listen(app.get('port'), () => {
  console.log(`app is listening ${app.get('port')}`)
});