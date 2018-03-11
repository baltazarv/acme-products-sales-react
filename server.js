const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const db = require('./db');
const { Product } = db.models;
const bodyParser = require('body-parser');

app.use(bodyParser.json());

db.sync()
  .then(() => db.seed());

app.use('/', express.static(path.join(__dirname + '/')));

app.get('/api/products', (req, res, next) => {
  Product.findAll()
    .then(products => res.send(products));
});

app.put('/api/products/:id', (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => {
      Object.assign(product, req.body);
      return product.save();
    })
    .then(product => res.send(product))
    .catch(next);
});

app.listen(port, () => console.log(`Serving on http://localhost:${port}`));
