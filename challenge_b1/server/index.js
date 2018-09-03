const express = require('express');
const app = express();

const morgan = require('morgan');
const parser = require('body-parser');

app.use(morgan('dev'));
app.use(parser.json());

app.use('/', express.static('client'))

app.set('port', process.env.PORT || 7878);

app.listen(app.get('port'), () => {
  console.log(`listening to port ${app.get('port')}`);
})