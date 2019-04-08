import React from 'react';
import './OrderSummary.css';

class OrderSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shippingCost: 10
    }
  }
  render() {
    let cartSubTotal = 0;
    this.props.cartItems.map(product => (
      cartSubTotal += (parseInt(product.Quantity) * parseInt(product.PRICE))
    ));
    cartSubTotal = parseFloat(cartSubTotal);
    let totalCost = '$' + ((this.state.shippingCost + cartSubTotal).toFixed(2));
    cartSubTotal = parseFloat(cartSubTotal).toFixed(2);
    return(
      <div id="order-summary-panel" className="order-summary-panel panel order-summary ">
        <header>
            <h2 className="order-summary-panel__title checkout__panel-title">Order Summary
              <span className="item-count checkout__header-item-count" id="header-item-count">
              <span className="item-count__number js-item-count-number">{this.props.cartItems.length}</span>
              <span className="item-count__language">items</span>
              </span>
            </h2>
        </header>
        <div className="order-summary__content content clearfix">
            <div className="subtotal label order-summary__subtotal-label">Sub Total</div>
            <div className="subtotal value order-summary__subtotal-value" id="subtotal-row-total" data-test-id="cart_subtotal">
              ${cartSubTotal}
            </div>
            <div className="shipping label order-summary__shipping">
              <div>
                  <p className="order-summary__shipping-method">Shipping</p>
                  <form id="checkout_shipmethod" name="checkout_shipmethod" method="post" action="/checkout/index.tmpl">
                    <input type="hidden" name="_SUBMIT" value="checkout_shipmethod" />
                    <input type="hidden" name="_RPCACTION" value="checkout_shipmethod" />
                    <div className="single_ship_method"></div>
                    <div className="form-item ship-method">
                        <select id="form--checkout_shipmethod--field--SHIP_METHOD" name="SHIP_METHOD" data-test-id="cart_select_shipping" className="no-js" aria-required="true" required="" value="11">
                          <option value="11">Standard - FREE</option>
                          <option value="12">Second Day - $10.00</option>
                          <option value="13">Overnight - $15.00</option>
                        </select>
                    </div>
                    <input type="hidden" name="DEFAULT_SHIP_METHOD" value="11" />
                    <input type="hidden" name="ENGRAVE_SHIP_METHOD" value="11" data-cost="$0.00" />
                    <div className="js_hidden hidden">
                        <input type="submit" className="btn btn-mini" />
                    </div>
                  </form>
              </div>
            </div>
            <div className="shipping value order-summary__shipping-value js-order-summary-shipping-value">$0.00</div>
            <div className="total label order-summary__total-label">
              <span className="total-label__wrapper">Estimated Total</span>
            </div>
            <div className="total value order-summary__total-value">
              <span className="total-value__wrapper">{totalCost}</span>
            </div>
            <div className="order-summary__loyalty-points-description hidden">
              <span className="order-summary__loyalty-points-earning">You will earn 216 Estée E-List points with this order. <span className="disclaimer">Points are pending until order has completely shipped.</span></span>
            </div>
        </div>
      </div>
    )
  }
}
export default OrderSummary;