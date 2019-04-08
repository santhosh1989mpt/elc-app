import React from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemPanel,
    AccordionItemButton,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

// Employee Component
class OrderList extends React.Component {
  render() {
    return (
   
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        <span> <b>Invoice Number:</b> {this.props.orderNumber}</span> 
                        <span className='order-status'><b>Order Status:</b> {this.props.orderStatus} </span> 
                        <span className='order-history'><b>Order Date:</b> {this.props.orderDate} </span>
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                        Listing ordered prodcuts - Under development
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
   
    );
  }
}

export default OrderList;
