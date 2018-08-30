const model = require('./../model')

module.exports = {
  get: (req, res) => {
    console.log('GET: Router')
    model.get()
      .then(data => res.send(data))
  },

  account: {
    post: (req, res) => {
      model.account.post(req.body)
        .then(() => res.send({account: 'POST'}));
    }
  },

  shipping: {
    post: (req, res) => {
      model.shipping.post(req.body)
        .then(() => res.send({shipping: 'POST'}));
    }
  },

  billing: {
    post: (req, res) => {
      model.billing.post(req.body)
        .then(() => res.send({billing: 'POST'}));
    }
  }
}