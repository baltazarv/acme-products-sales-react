import React, { Component } from 'react';
import ProductTypes from './ProductTypes';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      regularProducts: [],
      specialProducts: []
    };
    this.PROD_REGULAR = 'Regular';
    this.PROD_SPECIAL = 'Special';
    this.switchProducts = this.switchProducts.bind(this);
  }

  switchProducts(productId) {
    let product = this.state.products.find(_product => _product.id === productId * 1);
    let specialProducts = [],
      regularProducts = [];
    if (product.isSpecial) {
      // if special, make regular
      specialProducts = this.state.specialProducts.filter(_product => {
        return _product.id !== product.id;
      });
      product.isSpecial = false;
      regularProducts = [...this.state.regularProducts, product];
    } else {
      // if regular, make special
      regularProducts = this.state.regularProducts.filter(_product => {
        return _product.id !== product.id;
      });
      product.isSpecial = true;
      specialProducts = [...this.state.specialProducts, product];
    }
    axios.put('/api/products/' + product.id, product)
    .then(result => result.data)
    .then(() => {
      this.setState({ specialProducts, regularProducts });
    });
  }

  componentWillMount() {
    const regularProducts = [];
    const specialProducts = [];
    axios.get('/api/products')
      .then(result => result.data)
      .then(products => {
        this.setState({ products });
        products.forEach(product => {
          product.key = product.id;
          if (product.isSpecial) {
            specialProducts.push(product);
          } else {
            regularProducts.push(product);
          }
        });
        this.setState({
          regularProducts,
          specialProducts
        });
      });
  }

  render() {
    const { regularProducts, specialProducts } = this.state;
    const { switchProducts } = this;
    return (
      <div>
        <strong className="subtitle">We've got { specialProducts.length } special product{ specialProducts.length > 1 ? 's' : '' } ({ regularProducts.length * 1 + specialProducts.length * 1 } total)</strong>
        <div className="flex-container">
          <div className="panel">
            <ProductTypes
              type={ this.PROD_REGULAR }
              submitType={ this.PROD_SPECIAL }
              products={ regularProducts }
              onPushProduct={ switchProducts } />
              </div>
              <div className="panel">
              <ProductTypes
              type={ this.PROD_SPECIAL }
              submitType={ this.PROD_REGULAR }
              products={ specialProducts }
              onPushProduct={ switchProducts } />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
