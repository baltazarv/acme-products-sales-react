import React, { Component } from 'react';

class Product extends Component {
  constructor() {
    super();
    this.state = {
      productId: ''
    };
    this.onSelectProduct = this.onSelectProduct.bind(this);
    this.onSubmitProduct = this.onSubmitProduct.bind(this);
  }
  onSelectProduct(ev) {
    this.setState({ productId: ev.target.value });
    // why is this wrong?!
    // console.log('prod id', this.state.productId);
  }
  onSubmitProduct(ev) {
    ev.preventDefault();
    // console.log(this.state.productId,  this.props.onPushProduct(this.props.products[this.state.productId - 1]));
    if (this.state.productId) {
      this.props.onPushProduct(this.state.productId);
    }
  }
  render() {
    const { type, products } = this.props;
    const { productId } = this.state;
    const { onSelectProduct, onSubmitProduct } = this;
    return (
      <div className="panel">
        <h2>{ type } Products</h2>
        <form onSubmit={ onSubmitProduct } method="POST">
          <select value={ productId } onChange={ onSelectProduct }>
            <option value="">-- choose --</option>
            {
              products.map(product => {
                return (
                  <option key={ product.id } value={ product.id }>{ product.name }</option>
                );
              })
          }
          </select>
          <button disabled={ productId === 0 || productId === '' }>Make { type }</button>
        </form>
      </div>
    );
  }
}

export default Product;
