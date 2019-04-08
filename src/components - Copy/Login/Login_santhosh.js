import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {PostData} from '../../services/PostData';
import { FormErrors } from '../../components/Form/FormErrors';

class Login extends Component {

  constructor(){
    super();
    this.state = {
        username: '',
        password: '',
        errorMsg: '',
        formErrors: {username: '', password: ''},
        usernameValid: false,
        passwordValid: false,
        formValid: false,
        redirectToReferrer: false
    };
    this.login = this.login.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  login() {                 
    if(this.state.username && this.state.password){
        PostData('login',this.state).then((result) => {
            let responseJson = result;
            if(responseJson.userData){         
                sessionStorage.setItem('userData',JSON.stringify(responseJson));
                this.setState({redirectToReferrer: true});
            }else{
                this.setState({errorMsg: responseJson.error["text"]});
            }
        });
    }   
  }
  
  onBlur(e){
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }
  
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let usernameValid = this.state.usernameValid;
    let passwordValid = this.state.passwordValid;

    switch(fieldName) {
      case 'username':
        usernameValid = value.length != 0;
        fieldValidationErrors.username = usernameValid ? '' : 'Please enter';
        break;
      case 'password':
        passwordValid = value.length != 0;
        fieldValidationErrors.password = passwordValid ? '': 'Please enter';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    usernameValid: usernameValid,
                    passwordValid: passwordValid
                  }, this.validateForm);
  }
  validateForm() {
    this.setState({formValid: this.state.usernameValid && this.state.passwordValid});
  }
  
  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  render() {

    if (this.state.redirectToReferrer) {
      window.location.href="/my_account";
    }
   
    if (sessionStorage.getItem('userData')) {
      return (<Redirect to={'/my_account'}/>)
    }

     return (
      <div className="row" id="Body">
        <div className="medium-5 columns left">
            <h4>Login</h4>
            <label><span className="error_msg"><b>{this.state.errorMsg}</b></span></label>
            <div className="panel panel-default">
                <FormErrors formErrors={this.state.formErrors} />
            </div>
            <div className={`form-group ${this.errorClass(this.state.formErrors.username)}`}>
                <label>Username</label>
                <input type="text" name="username" placeholder="Username" onBlur={this.onBlur}/>
            </div>
            <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
                <label>Password</label>
                <input type="password" name="password"  placeholder="Password" onBlur={this.onBlur}/>
            </div>
            <div>
                <a href="/forgot_password">Forgot your password?</a>
            </div>
            <input type="submit" className="button success" value="Login" disabled={!this.state.formValid} onClick={this.login}/>
            <a href="/signup">Registration</a>
        </div>
      </div>
    );
  }
  
}

export default Login;