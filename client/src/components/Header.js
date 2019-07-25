import React, {Component} from 'react'
import {connect} from 'react-redux';
import {searchProducts} from '../actions/searchActions';
import {Link, withRouter} from 'react-router-dom';

class Header extends Component {

    constructor(props){
        super(props)
        this.state = {
            form : {
                query : '',
                category : ''
            }
        }
    }

    // componentDidMount(){
    //     // /search/titleSearch/Shoes/
    //     let route = this.props.history.location.pathname.slice(0,20);
    //     if(route === '/search/titleSearch/') {
    //         let end = (route[(route.length)-1] === '/') ? this.props.history.location.pathname.length-1 : this.props.history.location.pathname.length;
    //         let title = this.props.history.location.pathname.slice(20,end)
    //         this.setState({
    //             form: {
    //                 query : title,
    //                 filter  : 'all',
    //                 category : ''
    //             }
    //         })
    //     }

    // }

    handleChange = (e) => {
        
        this.setState({
            ...this.state,
            form : {...this.state.form, [e.target.name]: e.target.value}
        })
    }


    handleSubmit = async (e) => {
        e.preventDefault();
        let {query, category} = this.state.form;
        let urlString = ``;
        if(category) {
            let parse = category.split('&').join('%26');
            urlString+= `&categories=${parse}`;
        }
        // debugger;
        let forwardRoute = {
            pathname : `/search/titleSearch/${query}`,
            search : `?${urlString}`
        }
        this.setState({
            form : {
                query : '',
                category : ''
            }
        })
        this.props.history.push({
            pathname : `/empty`,
            state : {
                forwardRoute
            }
        })
        // await this.props.searchProducts(query,`?${urlString}`)
        // this.props.history.replace({
        //     pathname: `/search/titleSearch/${query}`,
        //     search : `?${urlString}`
        // })
        // this.props.history.push(`/search/titleSearch/${query}?${urlString}`)
    }

    renderForm() {
        
        return(
            <form className='headerForm' onSubmit={this.handleSubmit}>
                <select onChange={this.handleChange} 
                name='category'
                defaultValue=''
                value={this.state.form.category}
                >   
                    <option value={``}>All Categories</option>
                    <option value={`Automotive`}>Automotive</option>
                    <option value={`Baby`}>Baby</option>
                    <option value={`Home Improvement`}>Home Improvement</option>
                    <option value={`Industrial Scientific`}>Industrial Scientific</option>
                    <option value={`Lawn and Garden`}>Lawn and Garden</option>
                    <option value={`Outdoor`}>Outdoor</option>
                    <option value={`Pet Products`}>Pet Products</option>
                    <option value={`Sports`}>Sports</option>
                    <option value={`Toys`}>Toys</option>
                </select>
                <input type='text' id='query' onChange={this.handleChange} 
                name='query' value={this.state.form.query}
                />
                <button>Search</button>
            </form>
        )
    }

    renderContent() {
        
        switch (this.props.auth){
            case null:
                return ;
            case false :
                return (
                    <a className='link' href="/auth/google">Login with Google</a>
                )
            default:
                const path = this.props.auth.badge
                return([ 
                        
                        <Link className='link' to={`/${path.toLowerCase()}`}>Dashboard</Link>,
                        <a className='link' href="/api/logout">Logout</a>
                ])
        }
    }

    // renderCustomerOptions = () => {
    //     if(!this.props.auth) return;
    //     if(this.props.auth.badge === 'CUSTOMER'){
    //         return (
    //             <Link className='link' to={'/customer/cart'}>
    //             Cart : {this.props.auth.cart.length}
    //             </Link>
    //         )
    //     }
    // }

    render() {
        
        return  (
            <nav id="header"> 
                <div id='upper'>
                    <div className='right'>
                        <Link className='link' to="/products">Khareed</Link>
                    </div>
                    {this.renderForm()}
                
                    <div className='left'>
                        {/* {this.renderCustomerOptions()} */}
                        {this.renderContent()}
                    </div>  
                </div>
                <div id='lower'>
                    <div className='right'>

                    </div>
                    <div className='right'>

                    </div>
                    <div className='right'>

                    </div>
                </div>

            </nav>
        )
    }
}

function mapStateToProps (state) {
    return ({
        auth : state.auth
    })
}

export default connect(mapStateToProps, {searchProducts})(withRouter(Header))