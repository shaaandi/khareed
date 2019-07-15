import React , {Component} from 'react';
import {connect} from 'react-redux';
import {addProduct} from '../actions';



class NewProductForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title : '',
            price : '0',
            description : '',
            quantity : '',
            brand : '',
            imgSrc: ''
        }
    }

    

    handleSubmit = async (e) => {
        
        e.preventDefault();
        let data = {...this.state, id: this.props.ID}
        await this.props.addProduct(data, this.props.URL, this.props.METHOD)
        this.setState({ 
            title : '',
            price : '0',
            description : '',
            quantity : '',
            brand : '',
            imgSrc: ''
        })
        this.props.history.push('/retailer/products')

        
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render () {
        
        return(
            <form className='product' onSubmit={this.handleSubmit} >
                <h2>Add new Product</h2>
                <label >Title
                <input type="text" name='title'  onChange={this.handleChange}/>
                </label>
                <label >Price
                <input type="number" name='price'  onChange={this.handleChange}/>
                </label>
                <label >Image Source
                <input type="text" name='imgSrc'  onChange={this.handleChange}/>
                </label>
                <label >Product Description
                    <input type="text" name='description'  onChange={this.handleChange}/>
                </label>
                <label >Quantity
                    <input type="number" name='quantity'  onChange={this.handleChange}/>
                </label>
                <label >Brand
                    <input type="text" name='brand'  onChange={this.handleChange}/>
                </label>
                <button>{this.props.submitText}</button>
            </form>
        )
    }
}


export default connect(null, {addProduct})(NewProductForm);