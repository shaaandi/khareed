import React, {Component} from 'react';
import * as actions from '../actions';
import {connect} from 'react-redux';
class RetailerOrder extends Component{

    constructor(props){
        super(props)
        this.state = {
            editMode : true,
            service : ''
        }
    }

    async componentDidMount(){
       await this.props.fetchRetailerOrder(this.props.id)
       if(this.props.retailerOrder.order.serviceId) {
           this.setState({
               editMode : false
           })
       }
    }

    handleChange = (event) => {
        this.setState({service: event.target.value});
    }

    handleSubmit = async  (event) => {
        event.preventDefault();
        await this.props.selectRetailerOrderService(this.props.retailerOrder.order._id,this.state.service)
        this.setState({
            editMode : false
        })
    }

    renderForm = () => {
        if (this.state.editMode) {
            let options = this.props.retailerOrder.services.map(service => {
                return (
                    <option value={service._id}>{service.address}</option>
                )
            })
            return (
                <form id='serviceChooseForm' onSubmit={this.handleSubmit}>
                    <label>
                        <span>
                        Choose your preferred Service Center
                        </span>
                        <select value={this.state.service} onChange={this.handleChange}>
                            <option value={''}>Choose your preferred Service Center</option>
                            {options}
                        </select>
                    </label>
                <input type="submit" value="Submit" />
                </form>
            )
        } else {
            return <div></div>
        }
    }

    renderService =() => {
        if (this.props.retailerOrder.order.serviceId) {
            return (
                <h3><span>Service Center : </span>{this.props.retailerOrder.order.serviceId.address}</h3>
            )
        }
    }


    render() {
        if (this.props.retailerOrder === null) return <div></div>
        const products = this.props.retailerOrder.order.products.map(p => {
            return (
                <div key={p._id} className='cartProduct'>
                    <img className='cartImage' src={p.imgSrc} alt="Image of Product"/>
                    <div className='cartProductInformation'>
                        <h3 className='cartText'>{p.title}</h3>
                        <h3 className='cartText'>Price: ${p.price}</h3>
                        <h3 className='cartText'>Quantity : {this.props.retailerOrder.order.productsQuantity[p._id]}</h3>
                        <h3 className='cartText'>Total : ${p.price*this.props.retailerOrder.order.productsQuantity[p._id]}</h3>
                        <button className='cartButton' onClick={() => this.props.history.push(`/products/${p._id}`)}>View Product</button>
                    </div>
                </div>

            )
        })
        
        return (
            <div id='order'>
                <div className='header'>
                    <h3><span>Order id : </span>{this.props.retailerOrder.order._id}</h3>
                    <h3><span>Total Amount : </span>${this.props.retailerOrder.order.tAmount}</h3>
                    <h3><span>Status : </span>{this.props.retailerOrder.order.status}</h3>
                    <h3><span>Issued : </span>a week ago</h3>
                    {this.renderService()}
                </div>
                {this.renderForm()} 
                <div className='cartProducts'>
                     <span className='headings'>Products</span>
                    {products}
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => (
    {retailerOrder : state.retailerOrder}
)

export default connect(mapStateToProps,actions)(RetailerOrder)