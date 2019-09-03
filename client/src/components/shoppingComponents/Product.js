import "./product.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProduct } from "../../actions/shoppingActions";
import {
  addProductToCart,
  addProductToWishlist,
  fetchSimilarProducts
} from "../../actions/customerActions";
class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      cartProductQuantity: 1,
      similarProducts: {
        type: null,
        products: null
      }
    };
  }

  async componentDidMount() {
    let product = await this.props.fetchProduct(this.props.id);
    await this.setState({
      product
    });
    let products = await this.props.fetchSimilarProducts(this.props.id);
    await this.setState({
      similarProducts: products
    });
    return;
  }

  handleChange = e => {
    let num = parseInt(e.target.value);
    this.setState({
      [e.target.name]: num
    });
  };

  renderOptions = () => {
    if (this.state.product === null) return <div></div>;
    if (this.props.user) {
      if (this.props.user.badge === "CUSTOMER") {
        return [
          <button
            className="shopProductButton"
            onClick={() => this.props.addProductToWishlist(this.props.id)}
          >
            Add to Wishlist
          </button>,
          <form
            className="shopProductCartForm"
            onSubmit={e => {
              e.preventDefault();
              this.props.addProductToCart(
                this.props.id,
                this.state.cartProductQuantity
              );
            }}
          >
            <div className="setters">
              <input
                className="crements"
                type="button"
                value="-"
                onClick={() => {
                  let num;
                  if (this.state.cartProductQuantity > 1)
                    num = this.state.cartProductQuantity - 1;
                  else num = 1;
                  this.setState({
                    cartProductQuantity: num
                  });
                }}
              />
              <input
                type="range"
                onChange={this.handleChange}
                name="cartProductQuantity"
                value={this.state.cartProductQuantity}
                min={1}
                max={this.state.product.quantity}
                step={1}
              />
              <input
                className="crements"
                type="button"
                value="+"
                onClick={() => {
                  let num = this.state.cartProductQuantity + 1;
                  this.setState({
                    cartProductQuantity: num
                  });
                }}
              />
            </div>
            <input
              value={`Add ${this.state.cartProductQuantity} to Cart`}
              className="shopProductCartButton"
              type="submit"
            />
          </form>
        ];
      } else if (this.props.user.badge === "RETAILER") {
        return (
          <div>
            You are not allowed to make Purchase on Retailer Account. You need
            to make a new Customer Account for Buying Access.
          </div>
        );
      } else if (this.props.user.badge === "SERVICE") {
        return <div>Services are not allowed to make Purchases.</div>;
      } else if (this.props.user.badge === "NOT_INITIALIZED") {
        return (
          <Link to={`/user/initialize`}>Complete your login process first</Link>
        );
      }
    } else {
      return (
        <div>
          <a href="/auth/google">Login First to Buy</a>
        </div>
      );
    }
  };

  renderSimilarProducts = () => {
    if (this.state.similarProducts.products === null) return <h3>Loading</h3>;
    let similarProducts = this.state.similarProducts.products.map(p => {
      return (
        <div key={p._id} className="similarProduct">
          <img src={p.imgSrc} alt="Image of Product" />
          <div className="similarProductInformation">
            <h3>{p.title}</h3>
            <h4>Rs: {p.price}</h4>
            <Link to={`/shop/products/${p._id}`}>View Product</Link>
          </div>
        </div>
      );
    });
    return [
      <h3>More in {this.state.similarProducts.type} Products</h3>,
      <div className="products">{similarProducts}</div>
    ];
  };

  render() {
    const { product } = this.state;
    if (product === null) return <h2>Loading ...</h2>;
    return [
      <div className="shopProduct">
        <div className="shopProductImage">
          <img src={product.imgSrc}></img>
        </div>
        <div className="shopProductData">
          <div className="About">
            <h3 className="title">
              {product.title}
              <span className="from">from : {product.brand}</span>
              <span className="price">at : ${product.price}</span>
              <span className="stock">left in stock : {product.quantity}</span>
            </h3>
          </div>
          <div className="shopProductOptions">{this.renderOptions()}</div>
        </div>
      </div>,
      <div className="similarProducts">{this.renderSimilarProducts()}</div>
    ];
  }
}

const mapStoreToProps = store => ({
  user: store.auth
});
export default connect(
  mapStoreToProps,
  { fetchProduct, addProductToCart, addProductToWishlist, fetchSimilarProducts }
)(Product);
