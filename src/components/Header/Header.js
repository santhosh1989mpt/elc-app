import React, { Component } from 'react';
import './Header.css'; 
import {Redirect} from 'react-router-dom';
import {PostData} from '../../services/PostData';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.css";
import { Container, Row, Col, Form, Input, Button, Navbar, Nav,
  NavbarBrand, NavLink, NavItem, UncontrolledDropdown,
  DropdownToggle, DropdownMenu, DropdownItem, NavDropdown,InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MenuList from '../../components/Header/MenuList';

let domain1 = 'http://10.50.24.21:3000/products';

const headstyle = {
    padding: '0px',
    background: "#000000",
  };

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mainMenu:[],
	  redirectToReferrer: false,
    }; 
	this.logout = this.logout.bind(this);
	
    PostData('menuCatSubcatLists',this.state).then((result) => {
        let responseJson = result;
        if (responseJson.catMenuLists) {         
            this.setState({mainMenu: responseJson.catMenuLists});
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
            menuUrl={menu.menuUrl} 
            domain1={domain1}
            key={Date.now()+Math.random()}
        />
    ));
    return (
      <div className="callout primary" id="Header">
        <div className="container-fluid justify-content-center" style={headstyle}>

            <Navbar collapseOnSelect fixed="top" className="header_nav d-flex flex-column justify-content-center" expand="lg"  >
            <div className='top_header pt-2 pb-2'>
                <img src="https://www.bobbibrowncosmetics.com/media/export/cms/logo.png"></img>
            </div>
            <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="responsive-navbar-nav">
                  <Nav>
                  <Form.Group as={Col} md="12" controlId="validationCustomUsername">
          
            <InputGroup>

              <Form.Control
                className='search_input'
                type="text"
                placeholder="Search"
                aria-describedby="inputGroupPrepend"
                required
              />
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend" className="search_icon"><FontAwesomeIcon icon="search" /></InputGroup.Text>
              </InputGroup.Prepend>
            </InputGroup>
          </Form.Group>
                  </Nav>
<Nav className="mx-auto">
                        <Nav.Link href="/">HOME</Nav.Link>
                        {/*<Nav.Link href="/products">PRODUCTS</Nav.Link> */} 
						 {menu_list}
                    </Nav>
                    <Nav>
                        <Nav.Link href="/login" style={style}><FontAwesomeIcon icon="user" /></Nav.Link> 
                        <Nav.Link href="/signup" style={style}><FontAwesomeIcon icon="user-plus" /></Nav.Link>
                        <Nav.Link href="/my_account" style={style1}>My Account</Nav.Link>
                        <Nav.Link href="#" onClick={this.logout} style={style1}>Log out</Nav.Link>	
                        {/* <Nav.Link href="/viewcart"><img src="/bag.png" /></Nav.Link> */}
                        <Nav.Link href="/viewcart"><FontAwesomeIcon icon="shopping-cart" /></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>



			
</div>
      </div>
    );
  }
}

export default Header;