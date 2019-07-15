import './App.css'
import React , {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './Header';
import Initialize from './Initialize';
import RetailerDashboard from './RetailerDashboard';
import CustomerDashboard from './CustomerDashboard';
import ServiceDashboard from './ServiceDashboard';
import Main from './Main';
import Flash from './Flash';

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
                <Route exact path='/' component={()=><li>Landing Page</li>} />
                <Route  path='/products' component={Main} />
                <Route  path="/retailer" component={RetailerDashboard}/>
                <Route  path='/customer' component={CustomerDashboard} />
                <Route path='/service' component={ServiceDashboard} />
                <Route path='/user/initialize' component={Initialize} />
            </Router>
        )
    }
}

const mapStateToProps = (store) => ({
    flash : store.flash
})

export default connect(mapStateToProps,actions)(App);