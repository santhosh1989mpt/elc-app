import React from 'react';
import './QuickShop.css';
console.clear();

class QuickShop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayState: 'none',
      selectedSwatch: '',
      selectedShade: '',
      selectedShadeQty: 1,
      selectedShadeSize: '',
      selectedShadePrice: '',
      selectedSwatchSkuId: ''
    };
    this.showProduct = this.showProduct.bind(this);
    this.hideQuickShop = this.hideQuickShop.bind(this);
    this.selectSwatch = this.selectSwatch.bind(this);
    this.shadeQtyChange = this.shadeQtyChange.bind(this);
  }
  
  hideQuickShop(e) {
    e.target.closest('.js-product-brief').classList.remove('quickshop-open');
  }
  
  shadeQtyChange(e) {
    this.setState({
      selectedShadeQty: e.target.value
    })
  }
  
  selectSwatch(e) {
    e.preventDefault();
    //e.target.closest('.js-shade-picker').querySelectorAll('.swatch').classList.remove('selected');
    e.target.classList.add('selected');
    this.setState({
      selectedSwatch: parseInt(e.target.getAttribute('data-sku-base-id')),
      selectedShade: e.target.getAttribute('data-sku-shade-name'),
      selectedShadePrice: e.target.getAttribute('data-sku-price'),
      selectedSwatchSkuId: e.target.getAttribute('data-sku-id')
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      displayState: nextProps.displayStatus
    });
  }

  showProduct(info) {
    console.log(info);
    alert(info);
  }

  render() {
    var component = this;
    return (
      <div className="product_brief__sub-panel product_brief__sub-panel--shaded js-product-brief-quickshop product_brief__quickshop" data-qs={this.props.activeQS} data-curr-prod-id={this.props.prodId} >
        <button className="product_brief__sub-panel-close" onClick={this.hideQuickShop}></button>
        <ul className="product_brief__sku-price">
          <li data-skubaseid={this.state.selectedSwatch ? this.state.selectedSwatch : this.props.skus[0].SKU_ID} style={{display: "block"}}>
            {this.state.selectedShadeSize ? this.state.selectedShadeSize : this.props.skus[0].PRODUCT_SIZE}&nbsp;{this.state.selectedShadePrice ? this.state.selectedShadePrice : this.props.skus[0].formattedPrice}
          </li>
        </ul>        
        <div className="product_brief__swatch-select-container is_intensity is_color-family hidden">
          <select className="product_brief__swatch-select intensity color-family selectBox" data-product-id={this.props.prodId}>
            <option className="product_brief__all-shades">All Shades</option>
            <option className="product_brief__intensity">Creme</option>
            <option className="product_brief__intensity">Chrome</option>
            <option className="product_brief__color-family">Coral to Red</option>
            <option className="product_brief__color-family">Nude to Brown</option>
            <option className="product_brief__color-family">Mauve to Plum</option>
            <option className="product_brief__color-family">Pink to Berry</option>
          </select>
        </div>
  
        <div className="product_brief__swatch-list">
          <ul className="js-shade-picker shade-list" data-product-id={this.props.prodId}>
            {
            this.props.skus.map((data, i) => <li className="swatches--single" data-sku-base-id={data.SKU_BASE_ID} data-inventory="1" key={Date.now()+i}>
              <a className={"swatch swatch--selected " + (this.state.selectedSwatch===data.SKU_BASE_ID ? 'selected' : '') + (this.state.selectedSwatch == '' && i === 0 ? 'selected' : '')} data-product-id={this.props.prodId} data-sku-base-id={data.SKU_BASE_ID} data-intensity={data.INTENSITY} name={data.SHADENAME} href="#" onClick={this.selectSwatch} data-sku-shade-name={data.SHADENAME} data-sku-price={data.PRICE} data-sku-id={data.SKU_ID}></a>
              <div className="swatch__container">
                <div className="swatch--1" style={{backgroundColor: data.HEX_VALUE_STRING}}></div>
                <div className="swatch--2" style={{backgroundColor: ""}}></div>
                <div className="swatch--3" style={{backgroundColor: ""}}></div>
                <div className="swatch--4" style={{backgroundColor: ""}}></div>
                <div className="swatch--5" style={{backgroundColor: ""}}></div>
              </div>
            </li>)
            }
          </ul>
        </div>
        <div className="product_brief__shadename">{this.state.selectedShade ? this.state.selectedShade : this.props.skus[0].SHADENAME}</div>
        <div className="product_brief__misc-flag-sku"></div>
        <div className="product_brief__sub-panel-buttons-container">
          <div className="product_brief__quantity-container js-quantity" data-product-id={this.props.prodId}>
            <select className="product_brief__quantity selectBox" onChange={this.shadeQtyChange}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </div>
          <button 
            data-product-id={this.props.prodId}
            data-sku-base-id={this.state.selectedSwatch ? this.state.selectedSwatch : this.props.skus[0].SKU_BASE_ID}
            data-sku-id={this.state.selectedSwatchSkuId ? this.state.selectedSwatchSkuId : this.props.skus[0].SKU_ID}
            data-qty={this.state.selectedShadeQty}
            data-price={this.state.selectedShadePrice}
            className="js-add-to-cart product_brief__button--add-to-bag button--secondary button--dark product_brief__button--add-to-bag" href="#" data-test-id="add-to-cart" onClick={this.props.click}>
              Add To Bag
          </button>
          <a href="/product/649/57611/product-catalog/makeup/lips/lipstick/pure-color-desire/rouge-excess-lipstick" className="product_brief__full-details" data-test-id="spp_full_detail">View Details</a>
        </div>
      </div>
    );
  }
}

export default QuickShop;