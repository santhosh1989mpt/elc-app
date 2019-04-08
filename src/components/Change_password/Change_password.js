import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {PostData} from '../../services/PostData';
import Input from '../Elements/Input';
import Button from '../Elements/Button';
import '../Elements/Checkout.css'

class Change_password extends Component {
  state = {
    controls: {
      password: {
        elementType: 'input',
        elementConfig: {
            type: 'password',
            name: 'old_password',
            placeholder: '*Old Password'
        },
        value: '',
        validation: {
            required: true,
        },
        valid: false,
        touched: false
      },
      new_password: {
        elementType: 'input',
        elementConfig: {
            type: 'password',
            name: 'new_password',
            placeholder: '*New Password'
        },
        value: '',
        validation: {
            required: true,
            minLength: 6
        },
        valid: false,
        touched: false
      }, 
      cpassword: {
        elementType: 'input',
        elementConfig: {
            type: 'password',
            name: 'cpassword',
            placeholder: '*Confirm Password'
        },
        value: '',
        validation: {
            required: true,
            minLength: 6
        },
        valid: false,
        touched: false
      }	  
    },
    formIsValid: false,
    errorMsg: '',
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

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
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
        formIsValid: formIsValid, 
    });
    const name = event.target.name;
    const value = event.target.value;
    this.setState({[name]: value});
	if(sessionStorage.getItem('userData')){
      let data = JSON.parse(sessionStorage.getItem("userData"));
      this.setState({email: data.userData.email});
    }
  }  
  signinHandler = (event) => {
    event.preventDefault();
        PostData('changePassword',this.state).then((result) => {
            let responseJson = result;        
			if (responseJson.error["val"] != 1) {
				this.setState({errorMsg: responseJson.error["text"]});
			}else{
				alert("Your Password changed");
				window.location.href='/login';
            }
        });
        
    //window.location.href='/shipping';
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
      <div className="change-password-form form-container">
        <h2>Change password</h2>
        <p>All fields are mandatory</p>
        <p><span className="error_msg"><b>{this.state.errorMsg}</b></span></p>
        <form onSubmit={this.signinHandler}>
          {form}
          <Button disabled={!this.state.formIsValid} btnType="Success">Change password</Button>
        </form>
        <a href="/login">Click here to Login</a>
      </div>
    );
  };
};

export default Change_password;