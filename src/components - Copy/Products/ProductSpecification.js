import React, { Component } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import TabContent from 'react-bootstrap/TabContent';

class ProductSpecification extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
          key: 'details',
        };
      }
  render() {
    return (
        <Tabs
        id="controlled-tab-example"
        activeKey={this.state.key}
        onSelect={key => this.setState({ key })}
      >
        <Tab eventKey="details" title="Details">
            {this.props.product.PRODUCT_DETAILS_MOBILE}
        </Tab>
        <Tab eventKey="usage" title="Usage">
         <p>{this.props.product.ATTRIBUTE_DESC_3}</p>
        </Tab>
        <Tab eventKey="ingredients" title="Ingredients">
        <p>{this.props.product.ATTRIBUTE_DESC_4}</p>
        </Tab>
      </Tabs>
    );
  }
}

export default ProductSpecification;
