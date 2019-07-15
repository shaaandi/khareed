import React, {Component} from 'react';

class CustomerProfile extends Component {
    constructor(props){
        super(props)
        this.state = {
            profileEditMode : false,
            name : '',
            address : ''
        }
    }

    componentDidMount(){
        this.setState({
            name : this.props.customer.name,
            address : this.props.customer.address,
            profileEditMode : false
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.updateCustomer(this.state)
        this.setState({
            name : '',
            address : '',
            profileEditMode : false
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleClick = () => {
        this.setState({
            profileEditMode : !this.state.profileEditMode
        })
    }

    renderContent = () => {
        return (this.state.profileEditMode) ? (
            <form onSubmit={this.handleSubmit}>
                <label>Name :
                <input type="text" name='name' value={this.state.name} onChange={this.handleChange}/>
                </label>
                <label >Address :
                <input type="text" name='address' value={this.state.address} onChange={this.handleChange}/>
                </label>
                <button>Update</button>
            </form>
        ) : (
            
            <div>
                <li>Name : {this.props.customer.name}</li>
                <li>Badge : {this.props.customer.badge}</li>
                <li>Address : {this.props.customer.address || ''}</li>
            </div>
        )
    }

    render () {
        return (
            <div className='retailerProfile'>
                <img src="https://static.thenounproject.com/png/9355-200.png" alt="Profile Image"/>
                    {this.renderContent()}
                <button onClick={this.handleClick}>Edit Profile</button>
            </div>    
        )
    }
    
} 
    

    
export default CustomerProfile;