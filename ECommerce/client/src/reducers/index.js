import { combineReducers } from "redux";
import userReducer from "./userReducer";
import taskReducer from "./taskReducer";
import searchReducer from "./searchReducer";
import cartReducer from "./cartReducer";
import drawerReducer from "./drawerReducer";
import couponReducer from "./couponReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  task: taskReducer,
  search: searchReducer,
  cart: cartReducer,
  drawer: drawerReducer,
  coupon: couponReducer,
});

export default rootReducer;
