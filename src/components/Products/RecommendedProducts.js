import React from 'react';
import Product from './Product';
import {PostData} from '../../services/PostData';
import '../../styles/common-styles.css';
import './Product.css';
import './RecommendedProducts.css';
import CartOverlay from '../CartOverlay/CartOverlay';
import LoadingIcon from '../Misc/RingLoader'

console.clear();

let domain = 'https://www.esteelauder.com';

/* ProductList */
class RecommendedProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      productList: "",
      cartList: [],
      showLoading: true
    };

    
    this.createProduct = this.createProduct.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.showProduct = this.showProduct.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      PostData('productlist',this.state).then((result) => {
            let responseJson = result;
            if (responseJson.productData) {         
                this.setState({
                  productList: responseJson.productData.slice(0,3),
                  showLoading: false
                });
            } else {
              this.setState({
                showLoading: false
              });
            }
        });
    }, 1000);
  }

  createProduct(product) {
    this.setState({
      products: this.state.productList.push(product)
    });
  }

  calculateTotal(price, skuId, qty) {
      
    let cartListArr = this.state.cartList;
    if (Object.keys(cartListArr).length && cartListArr[skuId] !== undefined) {
        for (let x in cartListArr) {
            if (x === skuId)  {
                cartListArr[skuId] = {qty: cartListArr[skuId].qty + qty};        
            }
        }    
    } else {
        cartListArr[skuId] = {qty: qty};
    }
    this.setState({
      total: this.state.total + (price * qty) ,
      cartList: cartListArr
    });
  }

  showProduct(info) {
    console.log(info);
    alert(info);
  }

  render() {
    if (this.state.showLoading) {
      return <LoadingIcon />;
    }

    var component = this;
    var products = this.state.productList.map(function(product, i) {
      return (
        <Product
          category={product.category}
          name={product.PROD_RGN_NAME}
          subHeading={product.PROD_RGN_SUBHEADING}
          priceForDisplay={product.defaultSku[0].formattedPrice}
          price={product.defaultSku[0].PRICE}
          handleShow={component.showProduct}
          handleTotal={component.calculateTotal}
          image={domain + product.defaultSku[0].MEDIUM_IMAGE.split(',')[0]}
          prodId={product.PRODUCT_ID}
          desc={product.MPP_DESC_1}
          key={Date.now()+i}
          skuBaseId={product.defaultSku[0].SKU_ID}
          skus={product.skus}
          productURL={product.url}
        />
      );
    });

    return (
      <div>
        <div className="mpp js-mpp-wrapper recommended-products">
          <h2 className="mpp__header ">Recommended Products</h2>
          <ul className="mpp__product-grid">
            {products}
          </ul>
        </div>
        <CartOverlay total={this.state.total} products={this.state.productList} cartList={this.state.cartList} domain={domain}/>
      </div>
    );
  }
}

export default RecommendedProducts;