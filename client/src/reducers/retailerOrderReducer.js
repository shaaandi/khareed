import { FETCH_RETAILER_ORDER, UPDATE_RETAILER_ORDER } from "../actions/constants";

export default function (state=null, action) {
    switch (action.type) {
        case FETCH_RETAILER_ORDER:
            return action.payload
        case UPDATE_RETAILER_ORDER:
            return {...state, order : action.payload}
        default :
            return state
    }
}