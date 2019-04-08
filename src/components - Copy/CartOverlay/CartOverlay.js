import React from 'react';
import './CartOverlay.css';
console.clear();

/* Total */
class Total extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      overlayClass: 'overlay-bg hidden'
    };
    this.overLayTimeout = '';
    this._hideOverlay = this._hideOverlay.bind(this);
    
  }
  componentDidUpdate() {
    if (this.overLayTimeout) {
        clearTimeout(this.overLayTimeout);
    }
    this.overLayTimeout = setTimeout(function() {
        //document.querySelectorAll('.js-cart-overlay')[0].classList.remove('slide-in');
    }, 4000);
  }
  _hideOverlay(e) {
    this.setState({
        overlayClass : this.state.overlayClass + ' hidden'
    });
  }
  render() {
    let that = this;
    let total = this.props.total.toFixed(2);
    let cartOverlayClass = 'js-cart-overlay product-list__cart-overlay cart-confirm';
    let cartListProducts = [];
    let buildProductsRow = function(obj, i) {
      function filterProduct(sku) {
          if (sku.SKU_ID === i) {
            sku.qty = obj.qty;
            sku.subtotal = sku.qty * sku.PRICE;
            return true;
          } else {
            return false;
          }
      }
      function allSkus(eachProduct) {
        let filteredItem = eachProduct.skus.find(filterProduct);
        if (typeof filteredItem !== "undefined") {
          filteredItem.PROD_RGN_NAME = eachProduct.PROD_RGN_NAME;
          filteredItem.PROD_RGN_SUBHEADING = eachProduct.PROD_RGN_SUBHEADING;
          cartListProducts.push(filteredItem);
        }
      }
      that.props.products.map(allSkus);
    }
    
    if(Object.keys(this.props.cartList).length) {
        for (let x in this.props.cartList) {
          buildProductsRow(this.props.cartList[x], x);
        }
        /*
        this.setState({
            overlayClass : 'overlay-bg'
        });*/
        //cartOverlayClass = 'js-cart-overlay product-list__cart-overlay slide-in';
        document.querySelectorAll('.js-cart-overlay')[0].classList.add('slide-in');
    }
    
    return (
    <div>
      <div className={cartOverlayClass}>
        <div className="cart-confirm__content">
          <div className="product-list__cart-overlay--item-container">
          {
          cartListProducts.map((data, i) => <div className="product-list__cart-overlay--each-item" key={Date.now()+i}>
          <div className="cart-confirm__image-container PROD57611">
            <img className="cart-confirm__image" src={this.props.domain + data.SMALL_IMAGE} alt=""/></div>
            <div className="cart-confirm__description">
                <a href="/product/649/57611/product-catalog/makeup/lips/lipstick/pure-color-desire/rouge-excess-lipstick#/shade/Rouge Excess">
                  <h5 className="cart-confirm__header">{data.PROD_RGN_NAME}</h5>
                  <h6 className="cart-confirm__sub-header">{data.PROD_RGN_SUBHEADING}</h6>
                </a>
                <div className="cart-confirm__shade">
                  <div className="cart-confirm__shade-swatch swatches--single">
                    <div className="swatch__container">
                      <div className="swatch--1" style={{backgroundColor: data.HEX_VALUE_STRING}}></div>
                      <div className="swatch--2" style={{backgroundColor:""}}></div>
                      <div className="swatch--3" style={{backgroundColor:""}}></div>
                      <div className="swatch--4" style={{backgroundColor:""}}></div>
                      <div className="swatch--5" style={{backgroundColor:""}}></div>
                    </div>
                  </div>
                  {data.SHADENAME}
                </div>
                <div className="cart-confirm__shade SKU92155">{data.PRODUCT_SIZE}. {data.formattedPrice}</div>
                <div className="product-list__cart-overlay--qty">Qty: {data.qty}</div>
                <div className="product-list__cart-overlay--subtotal">${data.subtotal.toFixed(2)}</div>
              </div>
          </div>)
          }    
          </div>      
          <div className="product-list__cart-overlay--total-price" style={{ fontWeight: 400 }}>
            <span className="col-6">total price:</span>
            <span className="col-6 text-right">${total}</span>
          </div>
          <a href="/viewcart" className="cart-overlay__button--checkout js-cart-overlay-checkout cart-confirm__shade-button button--secondary button--dark">Checkout</a>
        </div>
      </div>      
    </div>
    );
  }
}

export default Total;