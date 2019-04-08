import React, {Component} from 'react';
import './Viewcart.css';
class EmptyCart extends Component {
  render() {
    return(
      <div className="viewcart--empty-panel">
        <div className="error_message empty-cart">Please add a priced product to your bag in order to checkout.</div>
        <a href="/" className="continue-shopping button--secondary button--dark" >Start Shopping</a>
      </div>
    )
  }
}

export default EmptyCart;