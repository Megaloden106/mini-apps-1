// imports
const fs = require('fs');

// helper functions
const converter = (data) => {
  let rows = [];
  const rowGenerator = (data) => {
    let keys = [];
    let row = []
    for (let key in data) {
      if (rows.length === 0) {
        keys.push(key)
      }
      row.push(data[key]);
    }
    if (rows.length === 0) {
      rows.push(keys.slice(0, -1).join(','));
    }
    rows.push(row.slice(0, -1).join(','));
    data.children.forEach((child) => {
      rowGenerator(child);
    });
  }
  rowGenerator(data)
  return rows.join('\n');
}

// module
module.exports = {
  post: (body, cb) => {
    let csv = converter(body);
    fs.writeFile('./data/data.csv', csv, (err) => {
      err && console.log(err);
      cb();
    });
  },
  get: (cb) => {
    fs.readFile('./data/data.csv', (err, data) => {
      err && console.log(err);
      cb(data);
    });
  }
};