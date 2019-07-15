import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class Header extends Component {
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

    render() {
        return  (
            <nav id="header"> 
                <div className='right'>
                <Link className='link' to="/products">Khareed</Link>
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

export default connect(mapStateToProps, null)(Header)