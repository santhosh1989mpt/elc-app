import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import './MyAccount.css';
import {PostData} from '../../services/PostData';
import ReactConfirmAlert, { confirmAlert } from 'react-confirm-alert'; 
import '../../styles/react-confirm-alert.css';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemPanel,
    AccordionItemButton,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import OrderList from './OrderList';
import { css } from '@emotion/core';
import { RingLoader } from 'react-spinners';

const override = css`
    display: block;
    margin-left: 45%;
    border-color: red;
`;

class MyAccount extends Component {
 

  constructor(props) {
    super(props);

    this.state = {
      data:[],
      redirectToReferrer: false,
      FirstName:'',
      LastName:'',
      MobileNumber:'',
      userEmail:'',
      orderList: '',
    };
    this.logout = this.logout.bind(this);
    
        if(sessionStorage.getItem('userData')){
      let userData = JSON.parse(sessionStorage.getItem("userData"));
	  this.state.user_id = userData.userData.user_id;
    }
    
        PostData('orderhistory',this.state).then((result) => {
            let responseJson = result;
            if(responseJson.orderhistory){  
				this.setState({orderList: responseJson.orderhistory});
            }
        });
  }

   logout(){
     sessionStorage.setItem("userData",'');
     sessionStorage.clear();
     this.setState({redirectToReferrer: true});
   }
   
  componentWillMount() {
    if(sessionStorage.getItem('userData')){
      let data = JSON.parse(sessionStorage.getItem("userData"));
      this.setState({FirstName: data.userData.firstname,LastName: data.userData.lastname,MobileNumber: data.userData.mobile,userEmail: data.userData.email});
    }
  }
  
  render() {
    if (this.state.redirectToReferrer) {
      return (<Redirect to={'/login'}/>)
    }
if (!this.state.orderList) return <div className='sweet-loading'>
        <RingLoader
          css={override}
          sizeUnit={"px"}
          size={150}
          color={'#5A1894'}
        />
      </div>;
      
    var orders = this.state.orderList.map(function(order, i) {
      return (
        <OrderList
          orderNumber={order.orderNumber}
          orderDate={order.orderDate}
          orderStatus={order.orderStatus}
          
        />
      );
    });
    
    return (
      <div className="row" id="Body">
        <div className="medium-12 columns">
        
       <div>Welcome {this.state.FirstName} {this.state.LastName},</div>
       <div><b>Your Email:</b> {this.state.userEmail},</div>
       <div><b>Below is you order history details:</b></div>
       <Accordion allowZeroExpanded={true}>
       
       
      {orders}

            
            
        </Accordion>
        
        </div>      
      
      </div>
    );
  }
}

export default MyAccount;