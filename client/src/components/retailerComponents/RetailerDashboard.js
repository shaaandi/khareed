import React , {Component} from 'react';
import  {connect} from 'react-redux';
import {fetchRetailer} from '../../actions/retailerActions';
import NewProductForm from './NewProductForm';
import { Route, Link, withRouter} from 'react-router-dom';
import RetailerProfile from './RetailerProfile';
import RetailerProducts from './RetailerProducts';
import RetailerOrders from './RetailerOrders';

class RetailerDashboard extends Component{

    async componentWillMount(){
        await this.props.fetchRetailer()
        return ;
    }

    render () {
        if(this.props.profile === null) {
            return (<li>Loading</li>)
        }
        return (
            <div className='retailerMain'>
                <div className='sideBar'> 
                    <img className='img' src="https://www.irreverentgent.com/wp-content/uploads/2018/03/Awesome-Profile-Pictures-for-Guys-look-away2.jpg" alt="Profile" />
                    <Link className='link' to="/retailer/profile">Profile</Link>
                    <Link className='link' to="/retailer/products">Products</Link>
                    <Link className='link' to="/retailer/newProduct">Add New Product</Link> 
                    <Link className="link" to="/retailer/orders">Orders</Link>
                </div>
                <div className='retailerContent'>
                <Route exact path="/retailer/profile" render = {() => {
                    return (
                        <RetailerProfile />
                    )
                }} />
                <Route path="/retailer/products"  render = {() => {
                    return (
                        <RetailerProducts />
                    )
                }}/>
                <Route exact path="/retailer/newProduct"  render={() => {
                    return (<NewProductForm history={this.props.history}/>)
                }} />
                <Route  path="/retailer/orders"  render={({match}) => {
                    return (<RetailerOrders />)
                }} />                
                </div>            
            </div>
        )
    }
}

function mapStateToProps (store) {
    return ({
        profile : store.retailer.profile
    })
}

export default connect(mapStateToProps,{fetchRetailer})(withRouter(RetailerDashboard))



