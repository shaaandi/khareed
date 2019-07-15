import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import EditProductForm from './EditProductForm';

class Product extends Component {
    constructor(props){
        super(props)
        this.state = {
            editMode : false
        }
    }

    
    handleClick = () => {
        this.setState({
            editMode : !this.state.editMode
        })
    }

    handleWish = () => {
        
        this.props.addProductToWishlist(this.props.id)
    }
    handleCart = () => {
        
        this.props.addProductToCart(this.props.id)
    }
    
    handleDelete = async () => {
        await this.props.deleteProduct(this.props.id, this.props.history)
        
    }
    
    renderContent = () => {
        return (this.props.user === 'retailer') ?  (
            <div>
                <button onClick={this.handleClick}>Edit Product</button>
                <button onClick={this.handleDelete}>Delete Product</button>
            </div>
        ) :
        (
            <div>
                <button onClick={this.handleWish}>Add to WishList</button>
                <button onClick={this.handleCart}>Add to Cart</button>
             </div>
        )
    }

    handleRefresh = () => {
        this.setState({
            editMode  : false
        })
    }


    render() {
        const {user, retailer, products} = this.props;
        let data = {}
        if (user === 'retailer') {
            
            data = retailer.inventory.filter((p) => {
                if(p._id === this.props.id) return p
            })
        } else if (user === 'customer') {
            data = products.filter(p => {
                if (p._id === this.props.id) return p
            })
        }
        let product = data[0]
        
        return (!this.state.editMode) ? (
        <div className='mainProduct'>
            <div className='productHeader'>
                <div>
                    <img src={product.imgSrc} alt='product picture'/>
                </div>
                <div className='productIntro'>
                    <li>Title : {product.title}</li>
                    <li>Price : {product.price}</li>
                    <li>Brand : {product.brand || 'Not Branded'}</li>
                    <li>Quantity : {product.quantity || 'Unknown'}</li>
                    {this.renderContent()}
                </div>

            </div>
            <div className='productDescription'>
                <h2>Description</h2>
                {product.description || 'There is no description'}
            </div>
        </div>
    ) : (

        <div>
        <EditProductForm user={this.props.user} id={this.props.id} 
        history={this.props.history} retailer={this.props.retailer}
        addProduct={this.props.addProduct} refresh={this.handleRefresh}
        />
        <button onClick={this.handleClick}>Back</button>
        </div>
    )
    }
    
    
}

function mapStateToProps(store) {
    return ({
        retailer : store.retailer,
        products : store.products
    })
}

export default connect(mapStateToProps, actions)(Product);