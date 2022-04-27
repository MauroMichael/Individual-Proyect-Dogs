// import { createStore, compose, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
import rootReducer from '../reducer/index.js';

// const store = createStore(
//     rootReducer,
//     window.__REDUX_DEVTOOLS_EXTENSION_CONPOSE__ || compose(applyMiddleware(thunk)),
// );

// export default store;

import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk";
// import reducer from "../reducer/reducer";

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)