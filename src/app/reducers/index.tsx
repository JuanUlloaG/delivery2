import { combineReducers } from 'redux';
import authReducer from "./AuthReducer";
import homeReducer from "./HomeReducer";
import shopReducer from "./ShopsReducer";
import detailReducer from "./DetailReducer";
import homeBagReducer from "./HomeBagReducer";
import searchReducer from "./SearchReducer";
import deliveryReducer from "./DeliveryReducer";

export default combineReducers({
    auth: authReducer,
    home: homeReducer,
    shop: shopReducer,
    detail: detailReducer,
    bags: homeBagReducer,
    search: searchReducer,
    delivery: deliveryReducer,
});