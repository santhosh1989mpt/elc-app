import React, {Component} from 'react';
import {PostData} from '../../services/PostData';
import {Redirect} from 'react-router-dom';
import Input from '../Elements/Input';
import Button from '../Elements/Button';
import '../Elements/Checkout.css'

class Shipping extends React.Component {
  state = {
    controls: {
      address1: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            name: 'address1',
            placeholder: '*Address 1'
        },
        value: '',
        validation: {
            required: true,
            minLength: 1
        },
        valid: false,
        touched: false
      },
      address2: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            name: 'address2',
            placeholder: '*Address 2'
        },
        value: '',
        validation: {
            required: true,
            minLength: 1
        },
        valid: false,
        touched: false
      },
      zipcode: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            name: 'zipcode',
            placeholder: '*Zip Code'
        },
        value: '',
        validation: {
            required: true,
            minLength: 5,
            maxLength: 10
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            name: 'country',
            placeholder: '*Country'
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false
      },
      state: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            name: 'state',
            placeholder: '*State'
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false
      },
      ordernotes: {
        elementType: 'textarea',
        elementConfig: {
            type: 'text',
            name: 'ordernotes',
            placeholder: 'Please enter your notes!!!'
        },
        value: '',
        validation: {
            required: false,
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
  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
        ...this.state.controls,
        [controlName]: {
            ...this.state.controls[controlName],
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
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
  shippingHandler = (event) => {
    event.preventDefault();
    if(sessionStorage.getItem('userData')){
      let userData = JSON.parse(sessionStorage.getItem("userData"));
	  this.state.user_id = userData.userData.user_id;
    }
    PostData('shippingaddress',this.state).then((result) => {
      let responseJson = result;
      if(responseJson.shippingaddress){         
        //sessionStorage.setItem('userData',JSON.stringify(responseJson));
        window.location.href="/payment";
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
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
    ));    
    return(
      <div className="shipping-information form-container">
        <h2>Shipping Details</h2>
        <p>All fields are mandatory</p>
        <form onSubmit={this.shippingHandler}>
          {form}
          <Button disabled={!this.state.formIsValid} btnType="Success">Proceed to Payment</Button>
        </form>        
      </div>
    );
  };
};

export default Shipping;