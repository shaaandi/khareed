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
    }


    renderForm() {
        return(
            <form className='headerForm' onSubmit={this.handleSubmit}>
                <select id='search-dropDown' onChange={this.handleChange} 
                name='category'
                defaultValue=''
                value={this.state.form.category}
                >   
                    <option value={``}>All</option>
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
                <button >Search</button>
            </form>
        )
    }

    toCategoryPage = async (category) => {
        let parse = category.split('&').join('%26');
        let forwardRoute = {
            pathname : `/shop/category/${parse}`,
            search : ''
        }
        this.props.history.push({
            pathname : `/empty`,
            state : {
                forwardRoute
            }
        })
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

    toggleCategoryNav = (val) => {
        let nav = document.getElementById('categoriesNav');
        nav.style.display = val
        if(val === 'flex') document.getElementById('categoriesToggler').style.background = '#f6a934';
        if(val === 'none') document.getElementById('categoriesToggler').style.background = 'none';
    }

    renderCategorySearch = () => {
        return(
                <div  id="categoriesNavWrapper" 
                onMouseEnter={() => this.toggleCategoryNav('flex')}
                onMouseOut={() => this.toggleCategoryNav('none')}
                >
                    <button id='categoriesToggler' >
                       All Departments 
                    </button>
                    <div id='categoriesNav'   onMouseEnter={() => this.toggleCategoryNav('flex')}> 
                        <button onMouseEnter={() => this.toggleCategoryNav('flex')} onMouseLeave={() => this.toggleCategoryNav('flex')}  onClick={() => this.toCategoryPage('Automotive')}>Automotive</button>
                        <button onMouseEnter={() => this.toggleCategoryNav('flex')} onMouseLeave={() => this.toggleCategoryNav('flex')}  onClick={() => this.toCategoryPage('Baby')}>Baby</button>
                        <button onMouseEnter={() => this.toggleCategoryNav('flex')} onMouseLeave={() => this.toggleCategoryNav('flex')}  onClick={() => this.toCategoryPage('Home Improvement')}>Home Improvement</button>
                        <button onMouseEnter={() => this.toggleCategoryNav('flex')} onMouseLeave={() => this.toggleCategoryNav('flex')}  onClick={() => this.toCategoryPage('Industrial Scientific')}>Industrial Scientific</button>
                        <button onMouseEnter={() => this.toggleCategoryNav('flex')} onMouseLeave={() => this.toggleCategoryNav('flex')}  onClick={() => this.toCategoryPage('Lawn and Garden')}>Lawn and Garden</button>
                        <button onMouseEnter={() => this.toggleCategoryNav('flex')} onMouseLeave={() => this.toggleCategoryNav('flex')}  onClick={() => this.toCategoryPage('Outdoor')}>Outdoor</button>
                        <button onMouseEnter={() => this.toggleCategoryNav('flex')} onMouseLeave={() => this.toggleCategoryNav('flex')}  onClick={() => this.toCategoryPage('Pet Products')}>Pet Products</button>
                        <button onMouseEnter={() => this.toggleCategoryNav('flex')} onMouseLeave={() => this.toggleCategoryNav('flex')}  onClick={() => this.toCategoryPage('Sports')}>Sports</button>
                        <button onMouseEnter={() => this.toggleCategoryNav('flex')} onMouseLeave={() => this.toggleCategoryNav('flex')}  onClick={() => this.toCategoryPage('Toys')}>Toys</button>
                    </div>
                </div>
        )
    }


    render() {
        return  (
            <nav id="header"> 
                    <div className='right'>
                        <Link to='/' className='brandLogo'>
                            <img
                            id='brandImg'
                            src={require('../images/LogoNew.png')}
                            />
                        </Link>
                    </div>
                    <div className='center'>
                    {this.renderCategorySearch()}
                    {this.renderForm()}
                    </div>
                
                    <div className='left'>
                        {this.renderContent()}
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