import React, {Component} from 'react';
import {PostData} from '../../services/PostData';
import ProductList from '../../components/ProductList/ProductList';
import BannerCarousel from '../../components/BannerCarousel/BannerCarousel';
import ProductSlider from '../../components/ProductSlider/ProductSlider'
import RecentCategory from '../../components/RecentCategory/RecentCategory'
import PromotionContent from '../../components/PromotionContent/PromotionContent'
import Image from 'react-bootstrap/Image'
const nopadding = {
  padding: '0px',
};
const increaseheight = {
  height: '100%'
}

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

        <div className='col-sm'><RecentCategory
        prodName={product.PROD_RGN_NAME.substr(0,15)}
        prodPrice={product.priceRange}
        prodDesc={product.ATTRIBUTE_DESC_1}
        prodImage={product.defaultSku[0].MEDIUM_IMAGE}
        domain={domain}
        productURL={product.url}
          />
           </div>  
      ));

      var homeproductlist = products.slice(0,3)
    
    return (
       <div className="container-fluid" style={nopadding}> 
          
          <BannerCarousel></BannerCarousel>
          {/*<ProductSlider></ProductSlider>*/}
          <PromotionContent></PromotionContent>
          <div class="container-fluid">
          <h2 class="text-center mt-3 mb-3 product_heading">Recent Products</h2>
          <hr></hr>
            <div  class="d-flex flex-row bd-highlight mb-3">
                {homeproductlist}
            </div>
          </div>
         
       </div>

       

        
    );
  }
}

export default Welcome;