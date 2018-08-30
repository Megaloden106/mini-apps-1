const { db, User, Ship, Bill } = require('./../db')


module.exports = {
  get: () => {
    let results = {};
    return db.sync()
      .then(() => User.findAll({
        limit: 1,
        order: [[ 'createdAt', 'DESC' ]]
      })).then(user => {
        results = Object.assign(results, user[0].dataValues);
        return Ship.findAll({
          limit: 1,
          order: [[ 'createdAt', 'DESC' ]]
        })
      }).then(ship => {
        results = Object.assign(results, ship[0].dataValues);
        return Bill.findAll({
          limit: 1,
          order: [[ 'createdAt', 'DESC' ]]
        })
      }).then(bill => Object.assign(results, bill[0].dataValues))
  },

  account: {
    post: (data) => {
      return db.sync()
        .then(() => User.create(data));
    }
  },

  shipping: {
    post: (data) => {
      return db.sync()
        .then(() => Ship.create(data));
    }
  },

  billing: {
    post: (data) => {
      return db.sync()
        .then(() => Bill.create(data));
    }
  }
}