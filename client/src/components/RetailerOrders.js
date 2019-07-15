import React from 'react';


const RetailerOrders = (props) => {
    let Orders = props.orders.map(order => {
        return (
            <div className='order'>
                <h3><span>Order Id : </span>{order._id}</h3>
                <h3><span>Status : </span>{order.status}</h3>
                <h3><span>Issued Date : </span>a week ago</h3>
                <button onClick={() => props.history.push(`/retailer/orders/${order._id}`)}>View</button>
            </div>
        )
    })
    return (
        <div className='orders'>
            <h2>Orders</h2>
            {Orders}
        </div>
        
    )
}


export default RetailerOrders;