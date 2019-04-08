import React from 'react';

// Employee Component
class ProductList extends React.Component {
  render() {
    return (
    <div class="col-sm-3">
      <h3>{this.props.prodName}</h3>
      <div><img src={this.props.domain + this.props.prodImage}/></div>
      <p>{this.props.prodDesc}</p>
      <p>Price: ${this.props.prodPrice}</p>     
    </div>
    );
  }
}

export default ProductList;
