const express = require('express');
const app = express();
const controller = require('./controller')

// middleware
const parser = require('body-parser');

app.set('port', 3000);

// use middleware
app.use(parser.json());

// static files
app.use('/', express.static('client'));

// set-up routing
app.post('/data', (req, res) => {
  console.log('POST Request')
  controller.post(req.body, () => {
    res.send();
  });
});

app.get('/data', (req, res) => {
  console.log('GET Request')
  controller.get((data) => {
    res.send(data);
  });
});

app.listen(app.get('port'), () => {
  console.log('app is listening to port 3000')
});