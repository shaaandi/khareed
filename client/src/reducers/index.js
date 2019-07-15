import {combineReducers} from 'redux';
import authReducer from './authReducer';
import retailerReducer from './retailerReducer';
import customerReducer from './customerReducer';
import productReducer from './productReducer';
import flashReducer from './flashReducer';
import customerOrderReducer from './customerOrderReducer';
import serviceReducer from './serviceReducer';
import retailerOrderReducer from './retailerOrderReducer';
export default combineReducers({
    auth : authReducer,
    retailer : retailerReducer,
    customer : customerReducer,
    products : productReducer,
    flash : flashReducer,
    customerOrder : customerOrderReducer,
    service : serviceReducer,
    retailerOrder : retailerOrderReducer
});