import React, {Component} from 'react';
import * as actions from '../actions';
import {connect} from 'react-redux';
import Flash from './Flash'
class CustomerOrder extends Component{

    async componentDidMount(){
       await this.props.fetchCustomerOrder(this.props.id)
       return;
    }



    render() {
        if (this.props.customerOrder === null) return <div></div>
        const products = this.props.customerOrder.products.map(p => {
            return (
                <div key={p._id} className='cartProduct'>
                    <img className='cartImage' src={p.imgSrc} alt="Image of Product"/>
                    <div className='cartProductInformation'>
                        <h3 className='cartText'>{p.title}</h3>
                        <h3 className='cartText'>Price: ${p.price}</h3>
                        <h3 className='cartText'>Quantity : {this.props.customerOrder.productsQuantity[p._id]}</h3>
                        <h3 className='cartText'>Total : ${p.price*this.props.customerOrder.productsQuantity[p._id]}</h3>
                        <button className='cartButton' onClick={() => this.props.history.push(`/products/${p._id}`)}>View Product</button>
                    </div>
                </div>

            )
        })
        return (
            <div id='order'>
                <div className='header'>
                    <h3><span>Order id : </span>{this.props.customerOrder._id}</h3>
                    <h3><span>Total Amount : </span>${this.props.customerOrder.tAmount}</h3>
                    <h3><span>Status : </span>{this.props.customerOrder.status}</h3>
                    <h3><span>Issued : </span>a week ago</h3>
                </div>
                <div className='cartProducts'>
                     <span className='headings'>Products</span>
                    {products}
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => (
    {customerOrder : state.customerOrder}
)

export default connect(mapStateToProps,actions)(CustomerOrder)