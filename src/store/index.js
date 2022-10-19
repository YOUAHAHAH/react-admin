import userToken from "./reducer/userToken";
import userInfo from "./reducer/userInfo";
import Message from "./reducer/Message";

import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";

// 用于支持异步action
import thunk from "redux-thunk";

// 汇总reducer
const allReducer = combineReducers({ userToken, userInfo, Message });

export default createStore(allReducer, applyMiddleware(thunk));
