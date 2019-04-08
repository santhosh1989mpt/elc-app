import React, {Component} from 'react';
import { Container, Row, Col, Form, Input, Button, Navbar, Nav,
  NavbarBrand, NavLink, NavItem, UncontrolledDropdown,
  DropdownToggle, DropdownMenu, DropdownItem, FormControl,InputGroup } from 'react-bootstrap';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
class Footer extends Component {
  render() {
    return (
      <Container fluid className="d-flex flex-row justify-content-center footer">
 <Container className="d-flex flex-row justify-content-center pt-5 pb-5">
 <Col>  
 <ul>
   <li>
      <h5>HOW CAN WE HELP?</h5>
   </li>
   <li>
      <a href="/">Chat with an Artist</a>
   </li>
   <li>
      <a href="/">Text An Artist</a>
   </li>
   <li>
      <a href="/">Email Us</a>
   </li>
   <li>
      <a href="/">Shipping & Returns</a>
   </li>
   </ul>
   </Col>
   <Col>  
 <ul>
   <li>
   <h5>MY BOBBI BROWN</h5>
   </li>
   <li>
      <a href="/">My Account</a>
   </li>
   <li>
      <a href="/">My Orders</a>
   </li>
   <li>
      <a href="/">Bobbi Brown Pro</a>
   </li>
   <li>
      <a href="/">Store Locator</a>
   </li>
   </ul>
   </Col>
   <Col>  
 <ul>
   <div>
   <InputGroup className="mb-3">
    <FormControl
      placeholder="Enter Your Email"
      aria-label="Recipient's username"
      aria-describedby="basic-addon2"
      className="mail_input"
    />
    <InputGroup.Append>
     <a> <InputGroup.Text id="basic-addon2">Submit</InputGroup.Text></a>
    </InputGroup.Append>
  </InputGroup>
   </div>
   </ul>
   </Col>
 </Container>
   
 
</Container>
    );
  }
}

export default Footer;