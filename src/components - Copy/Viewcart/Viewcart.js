import React, {Component} from 'react';
import {PostData} from '../../services/PostData';
import '../../styles/common-styles.css';
import './Viewcart.css';
//import {CartProducts} from './cartproducts';
import ViewcartList from '../../components/Viewcart/ViewcartList';
import OrderSummary from '../OrderSummary/OrderSummary';
import EmptyCart from './EmptyCart';
import LoadingIcon from '../Misc/RingLoader'

let domain = 'https://www.esteelauder.com';
//console.log(CartProducts);

class Viewcart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewcartProdcutLists:[],
      orderNumb: null,
      showLoading: true
    };  
    if(sessionStorage.getItem('orderNumber')){
      let data = JSON.parse(sessionStorage.getItem("orderNumber"));
	  this.state.orderNumb = data.cartInsertData.orderNumber;
    }    
    PostData('cartproducts',this.state).then((result) => {
        let responseJson = result;
        if (responseJson.cartprod) {         
            this.setState({
              viewcartProdcutLists: responseJson.cartprod,
              showLoading: false
            });
       } else {
          this.setState({
            showLoading: false
          });
        }
    });
    this.changeQty = this.changeQty.bind(this);
    this.removeSkuItem = this.removeSkuItem.bind(this);
  }

  changeQty(e) {
    e.preventDefault();
    let cartSkuBaseId = e.target.getAttribute('data-sku-base-id');
    let newQty = e.target.value;
    let cartItems = this.state.viewcartProdcutLists;
    cartItems.forEach(function(data, i) {
      if (data.SKU_BASE_ID === cartSkuBaseId) {
        data.Quantity = newQty;
        return false;
      }
    })

	this.state.SKU_ID = cartSkuBaseId;
	this.state.qty = newQty;
    PostData('quantityupdate',this.state).then((result) => {
        let responseJson = result;
        if(responseJson.quantityupdate){  
                //this.setState({redirectToReferrer: true});
        }else{
                //this.setState({errorMsg: responseJson.error["text"]});
        }
    });
    this.setState({viewcartProdcutLists: cartItems});
  }
  removeSkuItem(e) {
    e.preventDefault();
    let cartSkuBaseId = e.target.getAttribute('data-sku-base-id');
    let cartItemContainer = e.target.closest('.js-cart-item');
    let _this = this;
    cartItemContainer.classList.add('slideup');
    let cartItems = this.state.viewcartProdcutLists;
    function skipCartItem(cartItem) {
      return cartItem.SKU_BASE_ID !== cartSkuBaseId;
    }
    let arrRes = cartItems.filter(skipCartItem);
    setTimeout(function() {
     _this.setState({viewcartProdcutLists: arrRes});
    }, 1000)
    
    this.state.SKU_ID = cartSkuBaseId;
    PostData('removeproduct',this.state).then((result) => {
        let responseJson = result;
        if(responseJson.removeproduct){  
                //this.setState({redirectToReferrer: true});
        }else{
                //this.setState({errorMsg: responseJson.error["text"]});
        }
    });
  }
  /*componentDidMount() {
    this.setState({viewcartProdcutLists: CartProducts['cartprod']});
  }*/
  
  render() {
      if (this.state.showLoading) {
        return <LoadingIcon />;
      }
      var strUserName = sessionStorage.getItem('userData');
      const buttonUrl = strUserName ? '/checkout' : '/login';
    
      var products = this.state.viewcartProdcutLists.length ? 
      this.state.viewcartProdcutLists.map(product => (
          <ViewcartList
            sku_details={product}
            key={Date.now()+Math.random()}
            changeQty={this.changeQty}
            domain={domain}
            removeSkuItem={this.removeSkuItem}
          />
      )) : <EmptyCart />;

    const OrderSummaryPanel = this.state.viewcartProdcutLists.length ? 
      <OrderSummary cartItems={this.state.viewcartProdcutLists} /> : '';

    const checkoutButton = this.state.viewcartProdcutLists.length ?
      <div className="button-containers">
        <a href={buttonUrl} className="button--secondary button--dark">CHECKOUT</a>
      </div>
      : '';
    
    return (
      <div className="viewcart">
        <div className="viewcart__panel--left">
          <section id="viewcart-panel" className="viewcart-panel panel edit  js-viewcart-panel">
            <header className="viewcart-header checkout-header">
              <h2 className="viewcart-panel__title checkout__panel-title checkout-page-title">
                My Bag
                <span className="item-count checkout__header-item-count" id="header-item-count">
                <span className="item-count__number js-item-count-number">{this.state.viewcartProdcutLists.length}</span>
                <span className="item-count__language js-item-count-language" data-singular="item" data-plural="items">item</span>
                </span>
              </h2>
            </header>
            <div className="content clearfix viewcart-panel__content checkout__panel-content">
              <div className="cart-items products">
                <div className="cart-header clearfix">
                  <div className="products">Products</div>
                  <div className="price">Price</div>
                  <div className="qty">Quantity</div>
                  <div className="total">Total</div>
                </div>
                {products}
              </div>
            </div>
          </section>
          {OrderSummaryPanel}
          {checkoutButton}
        </div>
        <div className="viewcart__panel--right checkout__sidebar">
          Place holder for other modules
        </div>
      </div>
    );
  }
}

export default Viewcart;