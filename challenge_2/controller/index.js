const model = require('./../model');
var url = require('url');

module.exports = {
  post: (req, res) => {
    model.post(req.body, () => {
      res.send();
    });
  },
  get: (req, res) => {
    const { query } = url.parse(req.url, true).query;
    model.get((data) => {
      data = data.toString().split('\n');
      for (let i = 1; i < data.length; i++) {
        if (!data[i].toLowerCase().includes(query)) {
          data.splice(i, 1);
          i--;
        }
      }
      res.send(data.join('\n'));
    });
  }
};