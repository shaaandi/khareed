import { FETCH_CUSTOMER_ORDER } from "../actions/constants";

// later it will be integrated with customer Reducer during refractoring  

export default function (state=null, action){
    switch(action.type) {
        case FETCH_CUSTOMER_ORDER:
            return action.payload;
        default :
            return  state
    }
}