import userToken from "./userToken";
import userInfo from "./userInfo";

import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";

// 用于支持异步action
import thunk from "redux-thunk";

// 汇总reducer
const allReducer = combineReducers({ userToken, userInfo });

export default createStore(allReducer, applyMiddleware(thunk));
