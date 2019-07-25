import React, {Component} from 'react';
import {Link, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchRetailerProducts} from '../../actions/retailerActions';
import RetailerProduct from './RetailerProduct';

class RetailerProducts extends Component{

    constructor(props) {
        super(props)
        this.state = {
            products : null
        }
    }

    async componentDidMount(){
        let products = await this.props.fetchRetailerProducts()
        this.setState({
            products : products
        })
        return;
    }

    handleRefresh = async (editedProduct) => {
        let products = await this.state.products.map(product => {
            if(product._id === editedProduct._id){
                return editedProduct
            } else {
                return product
            }
        })
        await this.setState({
            products
        })
        return;
    }

    handleDelete = async (id) => {
        let products = await this.state.products.filter(product => {
            if(product._id === id) return false;
            return true
        })
        await this.setState({
            products
        })
        return;
    }

    render() {
        if (this.state.products === null) return <h1>Loading . . .</h1>
        else return ([
            <Route exact path='/retailer/products' render={() => {
                let Products = this.state.products.map(p => {
                    return (
                        <div key={p._id} className='product'>
                        <img src={p.imgSrc} alt="Image of Product"/>
                        <div className='productInformation'>
                            <h3>{p.title}</h3>
                            <h4>Rs: {p.price}</h4>
                            <Link to={`/retailer/products/${p._id}`}>View Product</Link>
                        </div>
                        </div>
                    )
                })
                return (
                    <div className='retailerProducts'>
                        {Products}
                    </div>
                )
            }}/>,
            <Route  path="/retailer/products/:id"  render={({match}) => {
                return (<RetailerProduct id={match.params.id}
                     refresh={this.handleRefresh}
                     delete={this.handleDelete}
                     />
                )
            }} />
        ]
        )
    }
}

const mapStoreToProps = (store) => ({
    products : store.retailer.products
})

export default connect(mapStoreToProps,{fetchRetailerProducts})(RetailerProducts)



