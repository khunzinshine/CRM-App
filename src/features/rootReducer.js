import { combineReducers } from "redux";
import CustomerSlice from "./customer/CustomerSlice";
import SystemSlice from "./system/SystemSlice";

const rootReducer = combineReducers({
  customer: CustomerSlice,
  system: SystemSlice,
});

export default rootReducer;
