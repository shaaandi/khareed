import React from 'react';
import {Link} from 'react-router-dom';
import Payment from './Payment';


const Products = ({products, retailer, remover, cartQuantity, cartQuantitySetter}) => {
    let totalAmount = 0;
    const quant = (id) => {
        if(cartQuantity){
            let num = cartQuantity[id]
            return (
                [
                    <h5 className='cartText'>Quantity : {num}</h5>,
                    <button className='cartProductIncrement cartButton' onClick={() => cartQuantitySetter(id,'dec')}>-</button>,
                    <button className='cartProductDecrement cartButton' onClick={() => cartQuantitySetter(id,'inc')}>+</button>
                ]
            )
        }
    }

  
    
    let Products = products.map(p => {
        let options = <li>Loading</li>
        if(retailer){
             options = (
                <Link to={`/retailer/products/${p._id}`}>View Product</Link>
            )
        } else {  
            if(cartQuantity){
                let numberOfProducts = cartQuantity[p._id]
                totalAmount = totalAmount + (parseInt(p.price)*numberOfProducts)
            }
            
            options = ([
                 <Link to={`/products/${p._id}`} className='cartText'>View Product</Link>,
                 <button  className='cartProductRemove cartButton' onClick={() => remover(p._id)}>X</button>          
            ]                
            )
        } 
        return (cartQuantity) ? (
            <div key={p._id} className='cartProduct'>
            <img className='cartImage' src={p.imgSrc} alt="Image of Product"/>
            <div className='cartProductInformation'>
                <h3 className='cartText'>{p.title}</h3>
                <h4 className='cartText'>Rs: {p.price}</h4>
                {quant(p._id)}
                {options}
                
            </div>
            </div>
        ) : (
            <div key={p._id} className='product'>
            <img src={p.imgSrc} alt="Image of Product"/>
            <div className='productInformation'>
                <h3>{p.title}</h3>
                <h4>Rs: {p.price}</h4>
                
                {options}
                {quant(p._id)}
            </div>
            </div>
        )
    })


    return (cartQuantity) ? (
        <div className='cart'>
            <div className='cartHeader'>
                <h3>Cart</h3>
                <h4>Total Amount : Rs {totalAmount}/_</h4>
            </div>
            <div className='cartProducts'>
                {Products}
                <div className='cartBuyProduct'>
                    <Payment amount={totalAmount*100}/>
                </div>
            </div>
        </div>
    ) : (
        <div className='retailerProducts'>
            {Products}
        </div>
    )
}



export default Products;