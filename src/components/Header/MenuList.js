import React from 'react';
import { Container, Row, Col, Form, Input, Button, Navbar, Nav,
  NavbarBrand, NavLink, NavItem, UncontrolledDropdown,
  DropdownToggle, DropdownMenu, DropdownItem, NavDropdown } from 'react-bootstrap';

// Employee Component
class MenuList extends React.Component {
  render() {
    return (
        <Nav.Link href={this.props.domain1 + this.props.menuUrl}>{this.props.menuName}</Nav.Link>
    );
  }
}

export default MenuList;
