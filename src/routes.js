import React from 'react';
import {BrowserRouter,  Route,  Switch} from 'react-router-dom';

import Welcome from '././components/Welcome/Welcome';
import MyAccount from '././components/MyAccount/MyAccount';
import AddressBook from '././components/MyAccount/AddressBook';
import Viewcart from '././components/Viewcart/Viewcart';
import Login from '././components/Login/Login';
import Change_password from '././components/Change_password/Change_password';
import Forgot_Password from '././components/Forgot_Password/Forgot_Password';
import Signup from '././components/Signup/Signup';
import NotFound from '././components/NotFound/NotFound';
import ProductList from '././components/Products/ProductList';
import Checkout from '././components/Checkout/Checkout';
import Payment from '././components/Payment/Payment';
import ProductView from '././components/Products/ProductView';

const Routes = () => (
  <BrowserRouter >
      <Switch>
          <Route exact path="/" component={Welcome}/>
          <Route path="/my_account" component={MyAccount}/>
          <Route path="/AddressBook" component={AddressBook}/>
		  <Route path="/viewcart" component={Viewcart}/>
          <Route path="/login" component={Login}/>
		  <Route path="/change_password" component={Change_password}/>
          <Route path="/forgot_password" component={Forgot_Password}/>
          <Route path="/Signup" component={Signup}/>
          <Route path="/products/:category" component={ProductList}/>
		  <Route path="/product_view/:id/:sku" component={ProductView}/>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/payment" component={Payment}/>
          <Route path="*" component={NotFound}/>
      </Switch>
  </BrowserRouter>
);

export default Routes;