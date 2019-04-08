import React, {Component} from 'react';
import ProductList from '../../components/ProductList/ProductList';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './BannerCarousel.css';



export default class BannerCarousel extends Component {
    render() {
        return (
            <div>

            
            <Carousel showArrows={false} showThumbs={false}   useKeyboardArrows  emulateTouch transitionTime={1000} showStatus={false}>
                <div>
                    <img src="https://www.esteelauder.com/media/export/cms_2.0/merch-windows/by-campaign/spring2019-anr-power-of-night/02_ANR_Repromote_Global_exAPAC_pc_mpp_1366x500.jpg" />
               
                </div>
                <div>
                    <img src="https://www.esteelauder.com/media/export/cms_2.0/merch-windows/mpp-headers/fall-2018/pure-color-envy-feat-karlie/01_PC_Envy_Extensions_pc_mpp_GlblExAsia_1366x500.jpg" />
              
                </div>
                <div>
                    <img src="https://www.esteelauder.com/media/export/cms_2.0/merch-windows/by-campaign/spring2018-perfectionist-pro/pc_mpp_header-perfectionist-pro_product-only.jpg" />
                 
                </div>
                <div>
                    <img src="https://www.esteelauder.com/media/export/cms_2.0/merch-windows/by-campaign/spring2019-anr-power-of-night/02_ANR_Repromote_Global_exAPAC_pc_mpp_1366x500.jpg" />
                   
                </div>
                <div>
                    <img src="https://www.bobbibrowncosmetics.com/media/export/cms/Homepage/SS19/BB_HP_Hero_PC_Ulla_IMG_Optimized_@2x.jpg" />
         
                </div>
                <div>
                    <img src="https://www.esteelauder.com/media/export/cms_2.0/merch-windows/by-campaign/spring2019-anr-power-of-night/02_ANR_Repromote_Global_exAPAC_pc_mpp_1366x500.jpg" />
                
                </div>
                <div>
                    <img src="https://www.esteelauder.com/media/export/cms_2.0/merch-windows/by-campaign/spring2019-anr-power-of-night/02_ANR_Repromote_Global_exAPAC_pc_mpp_1366x500.jpg" />
                
                </div>
                <div>
                    <img src="https://www.esteelauder.com/media/export/cms_2.0/merch-windows/by-campaign/spring2019-anr-power-of-night/02_ANR_Repromote_Global_exAPAC_pc_mpp_1366x500.jpg" />
                    
                </div>
            </Carousel>
            
            </div>
   
        );
    }
}

