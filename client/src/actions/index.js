import {FETCH_USER, LOAD_RETAILER, ADD_PRODUCT, EDIT_PRODUCT, 
    DELETE_PRODUCT, UPDATE_RETAILER, LOAD_CUSTOMER,
     UPDATE_CUSTOMER, FETCH_PRODUCTS,
     REMOVE_PRODUCT_FROM_WISHLIST,
     REMOVE_PRODUCT_FROM_CART,
     CART_QUANTITY_SETTER,
     FLASH,
     UNFLASH,
     FETCH_CUSTOMER_ORDER,
     LOAD_SERVICE,
     UPDATE_SERVICE,
     FETCH_RETAILER_ORDER,
     UPDATE_RETAILER_ORDER,
     FETCH_SERVICE_RETAILER_ORDERS,
     FETCH_SERVICE_CUSTOMER_ORDERS,
     FETCH_SERVICE_SERVICE_ORDERS
    } from './constants';
import axios from 'axios';

export const fetchUser = () => async (dispatch) => {
    await dispatch({
        type : FLASH,
        payload : null
    })
    let user = await axios.get('/api/currentUser');
    await dispatch({
        type : FETCH_USER,
        payload : user.data
    })
    dispatch({
        type : UNFLASH,
        payload : null
    })
}

export const updateRetailer = (data) => async(dispatch) => {
    await dispatch({
        type : FLASH,
        payload : null
    })
    let user = await axios.post('/api/retailer', {
        name : data.name,
        address : data.address
    })
    await dispatch({
        type : UPDATE_RETAILER,
        payload : user.data
    })
    dispatch({
        type : UNFLASH,
        payload : null
    })
}


export const setUserBadge = (badge, history) => async (dispatch) => {
    let response = await axios.post('/api/setUserBadge', {
        badge : badge
    })
    await dispatch({
        type : FETCH_USER,
        payload : false
    })
    history.push('/')
}

export const fetchRetailer = () => async (dispatch) => {
    await dispatch({
        type : FLASH,
        payload : null
    })
    let retailer = await axios.get('/api/retailer')
    await dispatch({
        type : LOAD_RETAILER,
        payload : retailer.data
    })
    await dispatch({
        type : UNFLASH,
        payload : null
    })
}

export const addProduct = (data, url, method) => async (dispatch) => {
    await dispatch({
        type : FLASH,
        payload : null
    })
    let product = await axios({
        method: method,
        url: url,
        data: data
      })
    if (method === 'POST'){
        await dispatch({
            type : ADD_PRODUCT,
            payload : product.data
        })
    } else if (method === 'PUT') {
        await dispatch({
            type: EDIT_PRODUCT,
            payload : product.data
        })
    }
    await dispatch({
        type : UNFLASH,
        payload : null
    })
    return ;
}

export const deleteProduct = (id, history) => async (dispatch) => {
    await axios({
        method: 'DELETE',
        url: '/api/retailer/inventory',
        data: {
            id : id
        }
      });
    history.push('/retailer/products')
    await dispatch({
        type : FLASH,
        payload : null
    })
    await dispatch({
          type : DELETE_PRODUCT,
          payload : {
              id : id
          }
      })
    dispatch({
        type : UNFLASH,
        payload : null
    })
    
}



export const fetchCustomer = () => async (dispatch) => {
    await dispatch({
        type : FLASH,
        payload : null
    })
    let customer = await axios.get('/api/customer')
    await dispatch({
        type : LOAD_CUSTOMER,
        payload : customer.data
    })
    await dispatch({
        type : UNFLASH,
        payload : null
    })
}

export const updateCustomer = (data) => async(dispatch) => {
    await dispatch({
        type : FLASH,
        payload : null
    })
    let updatedCustomer = await axios.post('/api/customer', ({
        name : data.name,
        address : data.address
    }))
    await dispatch({
        type : UPDATE_CUSTOMER,
        payload : updatedCustomer.data
    })
    await dispatch({
        type : UNFLASH,
        payload : null
    })
}


export const fetchProducts = () => async (dispatch) => {
    await dispatch({
        type : FLASH,
        payload : null
    })
    let products = await axios.get('/api/products');
    await dispatch({
        type : FETCH_PRODUCTS,
        payload : products.data
    })
    await dispatch({
        type : UNFLASH,
        payload : null
    })
}


export const addProductToWishlist = (id) => async (dispatch) => {
    await dispatch({
        type : FLASH,
        payload : null
    })
    await axios.post('/api/customer/wishlist', {
        id:  id
    })
    await dispatch({
        type : UNFLASH,
        payload : null
    })
    return ;
}

export const removeProductFromWishlist = (id) => async (dispatch) => {
    await dispatch({
        type : FLASH,
        payload : null
    })
    await axios({
        method: 'DELETE',
        url: '/api/customer/wishlist',
        data: {
            id : id
        }
      });
    await dispatch({
        type : REMOVE_PRODUCT_FROM_WISHLIST,
        payload : id
    })
    await dispatch({
        type : UNFLASH,
        payload : null
    })
}


export const addProductToCart = (id) => async (dispatch) => {
    await dispatch({
        type : FLASH,
        payload : null
    })
    await axios.post('/api/customer/cart', {
        id:  id
    })
    await dispatch({
        type : UNFLASH,
        payload : null
    })
    return ;
}

export const removeProductFromCart = (id) => async (dispatch) => {
    await dispatch({
        type : FLASH,
        payload : null
    })
    await axios({
        method: 'DELETE',
        url: '/api/customer/cart',
        data: {
            id : id
        }
      });
    await dispatch({
        type : REMOVE_PRODUCT_FROM_CART,
        payload : id
    });
    await dispatch({
        type : UNFLASH,
        payload : null
    })
}


export const cartQuantitySetter = (id, mode) => async(dispatch) => {
    await dispatch({
        type : FLASH,
        payload : null
    })
    await axios({
        method : 'PUT',
        url : '/api/customer/cart',
        data : {
            id : id,
            mode : mode
        }
    })
    await dispatch({
        type : CART_QUANTITY_SETTER,
        payload : {
            id, mode
        }
    })
    await dispatch({
        type : UNFLASH,
        payload : null
    })
}

export const handleToken = (token, amount) => async (dispatch) => {
    await dispatch({
        type : FLASH,
        payload : null
    })
    let response = await axios.post('/api/customer/order',{
        token : token,
        amount : amount,
    })
    await dispatch({
        type : LOAD_CUSTOMER,
        payload : response.data
    })  
    await dispatch({
        type : UNFLASH,
        payload : null
    })
    return ;

}

export const fetchCustomerOrder = (id) => (async (dispatch) => {
    await dispatch({
        type : FLASH,
        payload : null
    })
    let response = await axios.get(`/api/customer/order/${id}`)
    await dispatch({
        type : FETCH_CUSTOMER_ORDER,
        payload : response.data
    })
    dispatch({
        type :UNFLASH,
        payload : null
    })
    return ;
})

export const fetchRetailerOrder = (id) => (async (dispatch) => {
    await dispatch({
        type : FLASH,
        payload : null
    })
    let response = await axios.get(`/api/retailer/order/${id}`)
    await dispatch({
        type : FETCH_RETAILER_ORDER,
        payload : response.data
    })
    dispatch({
        type :UNFLASH,
        payload : null
    })
    return ;
})

export const fetchService = () => async (dispatch) => {
    await dispatch({
        type : FLASH,
        payload : null
    })
    let service = await axios.get('/api/service')
    await dispatch({
        type : LOAD_SERVICE,
        payload : service.data
    })
    await dispatch({
        type : UNFLASH,
        payload : null
    })
}


export const updateService = (data) => async(dispatch) => {
    await dispatch({
        type : FLASH,
        payload : null
    })
    let user = await axios.post('/api/service', {
        name : data.name,
        address : data.address
    })
    await dispatch({
        type : UPDATE_SERVICE,
        payload : user.data
    })
    dispatch({
        type : UNFLASH,
        payload : null
    })
}


export const fetchServiceOrders = (mode) => async (dispatch) => {
    await dispatch({
        type : FLASH,
        payload : null
    })
    let serviceOrders = await axios.get(`/api/service/${mode}`)
    let type ;
    if (mode === 'retailerOrders') type = FETCH_SERVICE_RETAILER_ORDERS
    else if (mode === 'customerOrders') type = FETCH_SERVICE_CUSTOMER_ORDERS
    else if (mode === 'serviceOrders') type = FETCH_SERVICE_SERVICE_ORDERS
    await dispatch({
        type : type,
        payload : serviceOrders.data
    })
    dispatch({
        type : UNFLASH,
        payload : null
    });
    return
}

export const fetchServiceOrder = (orderId, mode) => async (dispatch) => {
    await dispatch({
        type : FLASH,
        payload : null
    })
    let response = await axios.get(`/api/service/${mode}/${orderId}`)
    dispatch({
        type : UNFLASH,
        payload : null
    })
    return response.data
}

export const deliveringProduct = (customerOrderId, setStatus) => async (dispatch) => {
    await dispatch({
        type : FLASH,
        payload : null
    })
    let customerOrder = await axios.post(`/api/service/customerOrders/${customerOrderId}`,{
        forward : false,
        recieverId : '',
        setStatus
    })
    await dispatch({
        type : UNFLASH,
        payload : null
    })
    if (customerOrder) return;
}

export const serviceRetailerOrderConfirmation = (orderId, forward, body={}) => async (dispatch) => {
    
    await dispatch({
        type : FLASH,
        payload : null
    })
    let recieverId;
    if (body.recieverId) recieverId = body.recieverId;
    else recieverId = ''
    let  updatedService = await axios.post(`/api/service/retailerOrders/${orderId}`,{
        forward : forward,
        recieverId : recieverId
    })
    await dispatch({
        type : LOAD_SERVICE,
        payload : updatedService.data
    })
    dispatch({
        type : UNFLASH,
        payload : null
    })
    return 
}

export const serviceServiceOrderConfirmation = (orderId, forward, body={}) => async (dispatch) => {
    
    await dispatch({
        type : FLASH,
        payload : null
    })
    let recieverId;
    if (body.recieverId) recieverId = body.recieverId;
    else recieverId = ''
    let  updatedService = await axios.post(`/api/service/serviceOrders/${orderId}`,{
        forward : forward,
        recieverId : recieverId
    })
    await dispatch({
        type : LOAD_SERVICE,
        payload : updatedService.data
    })
    dispatch({
        type : UNFLASH,
        payload : null
    })
    return 
}

export const selectRetailerOrderService = (orderId,serviceId) => async (dispatch) => {
    await dispatch({
        type : FLASH,
        payload : null
    })
    let updatedOrder = await axios.put(`/api/retailer/order/${orderId}`,{
        serviceId : serviceId
    })
    await dispatch({
        type : UPDATE_RETAILER_ORDER,
        payload : updatedOrder.data
    })
    dispatch({
        type : UNFLASH,
        payload : null
    })
}