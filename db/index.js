const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_products_sales_react');

const Product = db.define('product', {
  name: Sequelize.STRING,
  isSpecial: Sequelize.BOOLEAN
});

const data = [
  { id: 1, name: 'foot', isSpecial: false},
  { id: 2, name: 'bliss', isSpecial: false},
  { id: 3, name: 'bass', isSpecial: true},
  { id: 4, name: 'booze', isSpecial: true}
];

const sync = () => {
  return db.sync({ force: true });
};

const seed = () => {
  data.map(product => {
    return Product.create(product);
  });
};

module.exports = {
  db,
  sync,
  seed,
  models: {
    Product
  }
}
