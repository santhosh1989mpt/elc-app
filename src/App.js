import React, { Component } from 'react';

import './styles/foundation.min.css';
import './styles/custom.css';
import Routes from './routes';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MobileHeader from './components/MobileHeader/MobileHeader';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart,faUserPlus,faUser, faSearch} from '@fortawesome/free-solid-svg-icons';
library.add(faShoppingCart,faUserPlus,faUser,faSearch)

const nopadding = {
  padding: '0px',
};
const increaseheight = {
  height: '100%'
}

class App extends Component {

  constructor(){
    super();
    this.state={
      appName: "Esteelauder Online",
      my_account: false
    }
  }

  render() {
    return (
	
	
	      <div className="container-fluid" style={increaseheight} style={nopadding}>
          <MobileHeader name={this.state.appName}/>
          <Header name={this.state.appName}/>
          <Routes name={this.state.appName}/>
      
         <Footer/>
    </div>

    );
  }
}

export default App;
