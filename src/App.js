import React, { Component } from 'react';
// import { Component } from 'react-dom';
import ProductTypes from './ProductTypes';

const data = [
  { id: 1, name: 'foot', isSpecial: false},
  { id: 2, name: 'bliss', isSpecial: false},
  { id: 3, name: 'bass', isSpecial: true},
  { id: 4, name: 'booze', isSpecial: true}
];

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
    const product = data.find(_product => _product.id === productId * 1);
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
    this.setState({ specialProducts, regularProducts });
  }

  componentWillMount() {
    const regularProducts = [];
    const specialProducts = [];
    data.forEach(product => {
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
  }

  render() {
    const { regularProducts, specialProducts } = this.state;
    const { switchProducts } = this;
    return (
      <div>
        <strong>We've got { specialProducts.length } special product{ specialProducts.length > 1 ? 's' : '' } ({ regularProducts.length * 1 + specialProducts.length * 1 } total)</strong>
       <div className="left-panel">
          <ProductTypes
            type={ this.PROD_REGULAR }
            products={ regularProducts }
            onPushProduct={ switchProducts } />
        </div>
        <div className="right-panel">
          <ProductTypes
            type={ this.PROD_SPECIAL }
            products={ specialProducts }
            onPushProduct={ switchProducts } />
        </div>
      </div>
    );
  }
}

export default App;
