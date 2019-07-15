import {LOAD_RETAILER, ADD_PRODUCT, EDIT_PRODUCT, DELETE_PRODUCT, UPDATE_RETAILER} from '../actions/constants';


export default  function (state = null, action) {
    switch(action.type){
        case UPDATE_RETAILER:
            return action.payload
        case LOAD_RETAILER:
            return action.payload
        case ADD_PRODUCT:
            let inventory = state.inventory;
            inventory.push(action.payload)
            return {...state, inventory}
        case EDIT_PRODUCT:
            let updatedInventory = state.inventory.map((p) => {
                
                if (p._id === action.payload._id) {
                    
                    return {...action.payload}
                }
                else {
                    return p
                }
            })
            
            return {...state, inventory: updatedInventory}
        case DELETE_PRODUCT:
            let deletedInventory = state.inventory.filter(p => {
                if (p._id === action.payload.id) {
                    return 
                } else {
                    return p
                }
                
            })
            return {...state , inventory : deletedInventory}
        default :
         return state
    }
}