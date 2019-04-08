import React, { Component } from 'react';
import './ProductSlider.css';
import Slider from "react-slick";
import {PostData} from '../../services/PostData';
import ProductList from '../../components/ProductList/ProductList';


let domain = 'https://www.esteelauder.com';
export default class ProductSlider extends Component {
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
      
      const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        cssEase: 'linear',
        responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
              }
            }
          ]
      };
      var products = this.state.prodLists.map(product => (
        <ProductList
          prodName={product.PROD_RGN_NAME.substr(0,15)}
          prodPrice={product.priceRange}
          prodDesc={product.MPP_DESC_1}
          prodImage={product.defaultSku[0].MEDIUM_IMAGE}
          domain={domain}
          priceForDisplay={product.defaultSku[0].formattedPrice}
          prodId={product.PRODUCT_ID}
          productURL={product.url}
        />
    ));
    console.log(products)
    var prodlist = products.map((prodlist) =>
    <div>{prodlist}</div>
    );
    
      return (

        <div className="container">
          <hr></hr>
          <h2 className="text-center mt-3 mb-3 product_heading">Gotta Have It</h2>
          <hr></hr>
          <Slider {...settings}>
            {prodlist}
          </Slider>
          {/* {products} */}
        </div>

      );
    }
  }