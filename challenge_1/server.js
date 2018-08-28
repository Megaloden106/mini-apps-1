const express = require('express');
const app = express();

app.use('/', express.static('app'));

app.listen(3000, () => {
  console.log('app is listening to port 3000')
});