import { LOAD_CUSTOMER, UPDATE_CUSTOMER, REMOVE_PRODUCT_FROM_WISHLIST, REMOVE_PRODUCT_FROM_CART, CART_QUANTITY_SETTER } from "../actions/constants";

// state{
//     user : {

//     }
// }

export default function (state=null, action) {
    switch(action.type) {
        case LOAD_CUSTOMER:
            return action.payload || null
        case UPDATE_CUSTOMER:
            return action.payload;
        case REMOVE_PRODUCT_FROM_WISHLIST:
            let wishList = state.wishList.filter(p => {
                if (p._id === action.payload) return;
                else return p
            })
            return {...state, wishList}
        case REMOVE_PRODUCT_FROM_CART:
            let cart = state.cart.filter(p => {
                if (p._id === action.payload) return;
                else return p
            })
            delete state.cartQuantity[action.payload]
            return {...state, cart}
        case CART_QUANTITY_SETTER:
            if(action.payload.mode === 'inc') state.cartQuantity[action.payload.id]++
            if(action.payload.mode === 'dec') {
                if(state.cartQuantity[action.payload.id] > 1) state.cartQuantity[action.payload.id]--
            }
            return {...state}
        default :
            return state;
    }
}