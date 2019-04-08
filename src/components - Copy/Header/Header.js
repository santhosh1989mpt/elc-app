import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {PostData} from '../../services/PostData';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.css";
import { Carousel } from 'react-responsive-carousel';
import { Container, Row, Col, Form, Input, Button, Navbar, Nav,
  NavbarBrand, NavLink, NavItem, UncontrolledDropdown,
  DropdownToggle, DropdownMenu, DropdownItem, NavDropdown } from 'react-bootstrap';
import MenuList from '../../components/Header/MenuList';

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mainMenu:[],
	  redirectToReferrer: false,
    }; 
	this.logout = this.logout.bind(this);
	
    PostData('productCategory',this.state).then((result) => {
        let responseJson = result;
        if (responseJson.productCategory) {         
            this.setState({mainMenu: responseJson.productCategory});
        }
    });
  } 

   logout(){
     sessionStorage.setItem("userData",'');
     sessionStorage.setItem("orderNumber",'');
     sessionStorage.clear();
     this.setState({redirectToReferrer: true});
   }
   
  componentWillMount() {
    if(sessionStorage.getItem('userData')){
      let data = JSON.parse(sessionStorage.getItem("userData"));
      this.setState({userName: data.userData.name,userEmail: data.userData.email});
    }
  }

  render() {
    if (this.state.redirectToReferrer) {
        window.location.href="/login";
    }	
    
    var strUserName = sessionStorage.getItem('userData');
    const style     = strUserName ? {display: 'none'} : {};
    const style1    = !strUserName ? {display: 'none'} : {};
	
    var menu_list = this.state.mainMenu.map(menu => (
        <MenuList 
            menuId={menu.id} 
            menuName={menu.menuName} 
            menuUrl={menu.menuUrl} />
    ));
    return (
      <div className="callout primary" id="Header">
        <div className="row column">
            <h1>{this.props.name}</h1>          
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <Navbar.Brand href="/products">HOME</Navbar.Brand>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/products">PRODUCTS</Nav.Link> 
                        {menu_list}
						<Nav.Link href="/login" style={style}>LOGIN</Nav.Link> 
						<Nav.Link href="/signup" style={style}>SIGNUP</Nav.Link>
                        <Nav.Link href="/my_account" style={style1}>MY ACCOUNT</Nav.Link>
                        <Nav.Link href="#" onClick={this.logout} style={style1}>LOGOUT</Nav.Link>						
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className="bag"><a href="/viewcart"><img src="/bag.png" /></a></div>
        </div>    
        <Carousel showArrows={true} showThumbs={false}>
                <div>
                    <img src="https://www.esteelauder.com/media/export/cms_2.0/merch-windows/by-campaign/spring2019-anr-power-of-night/02_ANR_Repromote_Global_exAPAC_pc_mpp_1366x500.jpg" />
                    <p className="legend">Legend 3</p>
                </div>
                <div>
                    <img src="https://www.esteelauder.com/media/export/cms_2.0/merch-windows/mpp-headers/fall-2018/pure-color-envy-feat-karlie/01_PC_Envy_Extensions_pc_mpp_GlblExAsia_1366x500.jpg" />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src="https://www.esteelauder.com/media/export/cms_2.0/merch-windows/by-campaign/spring2018-perfectionist-pro/pc_mpp_header-perfectionist-pro_product-only.jpg" />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src="https://www.esteelauder.com/media/export/cms_2.0/merch-windows/by-campaign/spring2019-anr-power-of-night/02_ANR_Repromote_Global_exAPAC_pc_mpp_1366x500.jpg" />
                    <p className="legend">Legend 3</p>
                </div>
                <div>
                    <img src="https://www.esteelauder.com/media/export/cms_2.0/merch-windows/by-campaign/spring2019-anr-power-of-night/02_ANR_Repromote_Global_exAPAC_pc_mpp_1366x500.jpg" />
                    <p className="legend">Legend 3</p>
                </div>
                <div>
                    <img src="https://www.esteelauder.com/media/export/cms_2.0/merch-windows/by-campaign/spring2019-anr-power-of-night/02_ANR_Repromote_Global_exAPAC_pc_mpp_1366x500.jpg" />
                    <p className="legend">Legend 3</p>
                </div>
                <div>
                    <img src="https://www.esteelauder.com/media/export/cms_2.0/merch-windows/by-campaign/spring2019-anr-power-of-night/02_ANR_Repromote_Global_exAPAC_pc_mpp_1366x500.jpg" />
                    <p className="legend">Legend 3</p>
                </div>
                <div>
                    <img src="https://www.esteelauder.com/media/export/cms_2.0/merch-windows/by-campaign/spring2019-anr-power-of-night/02_ANR_Repromote_Global_exAPAC_pc_mpp_1366x500.jpg" />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
      </div>
    );
  }
}

export default Header;