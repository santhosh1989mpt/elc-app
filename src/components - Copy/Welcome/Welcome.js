import React, {Component} from 'react';
import {PostData} from '../../services/PostData';
import ProductList from '../../components/ProductList/ProductList';
let domain = 'https://www.esteelauder.com';
class Welcome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      prodLists:[],
    };   
    PostData('productlist',this.state).then((result) => {
        let responseJson = result;
        if (responseJson.productData) {         
            this.setState({prodLists: responseJson.productData});
       }
    });
  }
  
  render() { 
      var products = this.state.prodLists.map(product => (
          <ProductList
            prodName={product.PROD_RGN_NAME.substr(0,15)}
            prodPrice={product.priceRange}
            prodDesc={product.ATTRIBUTE_DESC_1}
            prodImage={product.defaultSku[0].MEDIUM_IMAGE}
            domain={domain}
          />
      ));
    
    return (
        <div className="container">
          {products}
        </div>
    );
  }
}

export default Welcome;