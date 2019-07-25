import './App.css'
import React , {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import {BrowserRouter as Router, Route, withRouter} from 'react-router-dom';
import Header from './Header';
import Initialize from './Initialize';
import RetailerDashboard from './retailerComponents/RetailerDashboard';
import CustomerDashboard from './customerComponents/CustomerDashboard';
import ServiceDashboard from './serviceComponents/ServiceDashboard';
import SearchProducts from './SearchProducts';
import Flash from './Flash';
import shoppingDashboard from './shoppingComponents/shoppingDashboard';
import queryString from 'query-string';
import RefreshRoute from './RefreshRoute';

class App extends Component {

    componentDidMount() {
        this.props.fetchUser()

    }

    flash = () => {
        if(this.props.flash.loading) return <Flash/>
    }

    


    render() {
         return(
            <Router>   
                <Header/>
                {this.flash()}
                <Route 
                path='/empty'
                render={() => (
                    <RefreshRoute />
                )}
                />
                <Route exact path='/' component={()=><li>Landing Page</li>} />
                {/* <Route  path='/products' component={Main} /> */}
                <Route  path="/retailer" component={RetailerDashboard}/>
                <Route  path='/customer' component={CustomerDashboard} />
                <Route path='/service' component={ServiceDashboard} />
                <Route path='/user/initialize' component={Initialize} />
                <Route path='/shop' component={shoppingDashboard} />
                <Route path='/search/titleSearch/:query' 
                render={({match,location}) => {
                    let {query} = match.params;
                    let options     = queryString.parse(location.search);
                    let urlQuery = location.search;
                    return(
                        <SearchProducts query={query}
                        options={options}
                        urlQuery={urlQuery}
                        />
                    )
                }}
                />
            </Router>
            
        )
    }
}

const mapStateToProps = (store) => ({
    flash : store.flash
})

export default connect(mapStateToProps,actions)(App)