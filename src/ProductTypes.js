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
    if (ev.target.value) {
      ev.target.parentElement.querySelector('button').disabled = false;
    } else {
      ev.target.parentElement.querySelector('button').disabled = true;
    }
    this.setState({ productId: ev.target.value });
  }
  onSubmitProduct(ev) {
    ev.preventDefault();
    if (this.state.productId) {
      this.props.onPushProduct(this.state.productId);
    }
    const select = ev.target.querySelector('select');
    select.selectedIndex = 0;
    select.parentElement.querySelector('button').disabled = true;
  }
  render() {
    const { type, submitType, products } = this.props;
    const { onSelectProduct, onSubmitProduct } = this;
    return (
      <div className="panel">
        <h2>{ type } Products</h2>
        <form onSubmit={ onSubmitProduct } method="POST">
          <select onChange={ onSelectProduct }>
            <option value="">-- choose --</option>
            {
              products.map(product => {
                return (
                  <option key={ product.id } value={ product.id }>{ product.name }</option>
                );
              })
          }
          </select>
          <button disabled>Make { submitType }</button>
        </form>
        <ul>
        {
          products.map(product => {
            return (
              <li key={ product.id }>{ product.name }</li>
            );
          })
      }
    </ul>
      </div>
    );
  }
}

export default Product;
