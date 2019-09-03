import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/customerActions";
import { withRouter, Link } from "react-router-dom";

class CustomerWishList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: null
    };
  }

  async componentDidMount() {
    let products = await this.props.fetchCustomerSection("wishList");
    await this.setState({
      products: products
    });
    return;
  }

  handleRemove = async productId => {
    await this.props.removeProductFromWishlist(productId);
    let products = await this.state.products.filter(p => {
      if (p._id === productId) return false;
      else return true;
    });
    this.setState({
      products
    });
  };

  render() {
    if (!this.state.products) return <h3>Loading</h3>;
    let products = this.state.products.map(p => {
      return (
        <div key={p._id} className="customerWishListProducts-product">
          <img src={p.imgSrc} alt="Image of Product" />
          <div className="productInformation">
            <h3>{p.title}</h3>
            <h4>Rs: {p.price}</h4>
            <Link to={`/products/${p._id}`}>View</Link>
            <button onClick={() => this.handleRemove(p._id)}>Remove</button>
          </div>
        </div>
      );
    });
    return (
      <div className="customerWishListProducts">
        <h3 id="customerWishListProducts-header">Wish List</h3>
        {products}
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(withRouter(CustomerWishList));
