import React , {Component} from 'react';
import  {connect} from 'react-redux';
import * as actions from '../actions';
import {Route, Link, withRouter} from 'react-router-dom';
import CustomerProfile from './customerProfile';
import Products from './Products';
import CustomerOrders from './CustomerOrders';
import CustomerOrder from './CustomerOrder';

class RetailerDashboard extends Component{


    componentWillMount(){
         this.props.fetchCustomer()
    }


    render () {
        if(this.props.customer === null) {
            return (<li>Loading</li>)
        }
        return (
            <div className='retailerMain'>
                <div className='sideBar'> 
                    <img className='img' src="https://www.irreverentgent.com/wp-content/uploads/2018/03/Awesome-Profile-Pictures-for-Guys-look-away2.jpg" alt="Profile" />
                    <Link className='link' to="/customer/profile">Profile</Link>
                    <Link className='link' to="/customer/wishlist">Wishlist</Link>
                    <Link className='link' to='/customer/cart'>Cart</Link>
                    <Link className="link" to='/customer/orders'>Orders</Link>
                </div>
                <div className='retailerContent'>
                <Route exact path="/customer/profile" render = {() => {
                    return (
                        <CustomerProfile updateCustomer= {this.props.updateCustomer} customer={this.props.customer}/>
                    )
                }} />
                <Route exact path="/customer/wishlist" render = {() => {
                    return (
                        <Products products={this.props.customer.wishList} remover={this.props.removeProductFromWishlist}/>
                    )
                }} />
                <Route exact path="/customer/cart" render = {() => {
                    return (
                        <Products products={this.props.customer.cart} remover={this.props.removeProductFromCart} 
                        cartQuantity={this.props.customer.cartQuantity} 
                        cartQuantitySetter={this.props.cartQuantitySetter}/>
                    )
                }} />
                <Route exact path="/customer/orders" render = {() => {
                    return (
                        <CustomerOrders orders={this.props.customer.customerOrders} history={this.props.history}/>
                    )
                }} />
                <Route path="/customer/orders/:id"
                render= { ({match}) => {
                    let order = this.props.customer.customerOrders.filter(order => {
                        if(order._id === match.params.id) return order;
                        else return ;
                    })
                    return (
                        <CustomerOrder id={match.params.id} order={order[0]} history={this.props.history}/>
                    )
                }}
                />

                </div>            
            </div>
        )
    }
}

function mapStateToProps (store) {
    return ({
        customer : store.customer
    })
}

export default connect(mapStateToProps,actions)(withRouter(RetailerDashboard))



