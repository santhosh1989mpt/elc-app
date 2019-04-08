import React, {Component} from 'react';
import {PostData} from '../../services/PostData';
import {Redirect} from 'react-router-dom';
import Input from '../Elements/Input';
import Button from '../Elements/Button';
import '../Elements/Checkout.css'

class Payment extends React.Component {
  state = {
    controls: {
      creditcard: {
        elementType: 'input',
        elementConfig: {
            type: 'number',
            name: 'creditcard',
            placeholder: '*Credit Card Number'
        },
        value: '',
        card: '',
        validation: {
            required: true,
            minLength: 16
        },
        valid: false,
        touched: false
      },
      month: {
        elementType: 'select',
        nameConfig: {
            name: 'month',
        },
        elementConfig: {
          options: [
            {value: '*Select Month', displayValue: '*Select Month'},
            {value: 'January', displayValue: 'January'},
            {value: 'February', displayValue: 'February'},
            {value: 'March', displayValue: 'March'},
            {value: 'April', displayValue: 'April'},
            {value: 'May', displayValue: 'May'},
            {value: 'June', displayValue: 'June'},
            {value: 'July', displayValue: 'July'},
            {value: 'August', displayValue: 'August'},
            {value: 'September', displayValue: 'September'},
            {value: 'October', displayValue: 'October'},
            {value: 'November', displayValue: 'November'},
            {value: 'December', displayValue: 'December'},
          ],
        },
        value: '*Select Month',
        validation: {
            required: true
        },
        valid: false,
        touched: false
      },
      year: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            name: 'year',
            placeholder: '*Expiration Year'
        },
        value: '',
        validation: {
            required: true,
            minLength: 1,
            maxLength: 4
        },
        valid: false,
        touched: false
      },
      cvv: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            name: 'cvv',
            placeholder: '*CVV'
        },
        value: '',
        validation: {
            required: true,
            minLength: 3,
            maxLength: 3
        },
        valid: false,
        touched: false
      },
    },
    formIsValid: false
  }
  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
        return true;
    }
    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }
    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    }
    return isValid;
  }
  getCreditCardName(ccNumber) {
      let card = '';
      let visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
      let mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
      let amexpRegEx = /^(?:3[47][0-9]{13})$/;
      let discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
      if (visaRegEx.test(ccNumber)) {
        return card = 'visa';
      } else if (mastercardRegEx.test(ccNumber)) {
        return card = 'mastercard';
      } else if (amexpRegEx.test(ccNumber)) {
        return card = 'amex';
      } else if (discovRegEx.test(ccNumber)) {
        return  card = 'discover';
      }
  }
  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
        ...this.state.controls,
        [controlName]: {
            ...this.state.controls[controlName],
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
            card: this.getCreditCardName(event.target.value),            
            touched: true
        }
    };
    let formIsValid = true;
    for (let controlName in updatedControls) {
        formIsValid = updatedControls[controlName].valid && formIsValid;
    }
    this.setState({
        controls: updatedControls,
        formIsValid: formIsValid
    });
    const name = event.target.name;
    const value = event.target.value;
    this.setState({[name]: value});
  }
  paymentHandler = (event) => {
    event.preventDefault();
    if(sessionStorage.getItem('userData')){
      let userData = JSON.parse(sessionStorage.getItem("userData"));
	  this.state.user_id = userData.userData.user_id;
    }
    if(sessionStorage.getItem('orderNumber')){
      let data = JSON.parse(sessionStorage.getItem("orderNumber"));
	  this.state.orderNumb = data.cartInsertData.orderNumber;
    } 
    PostData('paymentsubmit',this.state).then((result) => {
      let responseJson = result;
      if(responseJson.paymentsubmit){         
        //sessionStorage.setItem('paymentsubmit',JSON.stringify(responseJson));
        sessionStorage.setItem("orderNumber",'');
        window.location.href="/my_account";
        
      }else{
         //alert(responseJson.error["text"]);
         //this.setState({errorMsg: responseJson.error["text"]});
      }
      
     });
  }  
  render() {
    const formElementsArray = [];
    for ( let key in this.state.controls ) {
        formElementsArray.push( {
            id: key,
            config: this.state.controls[key]
        } );
    }

    let form = formElementsArray.map( formElement => (
        <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            nameConfig={formElement.config.nameConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            card={formElement.config.card}            
            changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
    ));    
    return(
      <div className="shipping-information form-container">
        <h2>Payment Details</h2>
        <p>All fields are mandatory</p>
        <form onSubmit={this.paymentHandler}>
          {form}
          <div className="billing-address-info">
            <div className="same-as-shipping">
                <input className='same-shipping' type="checkbox" checked value="" /> Same as Shipping
                <p></p>
            </div>
          </div>
          <Button disabled={!this.state.formIsValid} btnType="Success">Make Payment</Button>
        </form>        
      </div>
    );
  };
};

export default Payment;