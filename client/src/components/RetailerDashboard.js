import React , {Component} from 'react';
import  {connect} from 'react-redux';
import * as actions from '../actions';
import NewProductForm from './newProductForm';
import Products from './Products';
import { Route, Link, withRouter} from 'react-router-dom';
import RetailerProfile from './retailerProfile';
import Product from './Product';
import RetailerOrders from './RetailerOrders';
import RetailerOrder from './RetailerOrder';
class RetailerDashboard extends Component{


    componentWillMount(){
         this.props.fetchRetailer()
    }


    render () {
        if(this.props.retailer === null) {
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
                        <RetailerProfile 
                        retailer={this.props.retailer}
                        updateRetailer={this.props.updateRetailer}

                        />
                    )
                }} />
                <Route exact path="/retailer/products"  render = {() => {
                    return (
                        <Products products={this.props.retailer.inventory} retailer={true} />
                    )
                }}/>
                <Route exact path="/retailer/newProduct"  render={() => {
                    return (<NewProductForm submitText={'Submit'} history={this.props.history} URL={'/api/retailer/inventory'} METHOD={'POST'}/>)
                }} />
                <Route  path="/retailer/products/:id"  render={({match}) => {
                    return (<Product user={'retailer'} id={match.params.id} history={this.props.history}/>)
                }} />
                <Route exact path="/retailer/orders"  render={({match}) => {
                    return (<RetailerOrders orders={this.props.retailer.retailerOrders} history={this.props.history}/>)
                }} />
                <Route path="/retailer/orders/:id"
                render= { ({match}) => {
                    let order = this.props.retailer.retailerOrders.filter(order => {
                        if(order._id === match.params.id) return order;
                        else return ;
                    })
                    return (
                        <RetailerOrder id={match.params.id} order={order[0]} history={this.props.history}/>
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
        retailer : store.retailer
    })
}

export default connect(mapStateToProps,actions)(withRouter(RetailerDashboard))



