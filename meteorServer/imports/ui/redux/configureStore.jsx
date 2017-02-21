import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import rootReducer from "./reducers/index";
import thunk from "redux-thunk";

const enhancer = composeWithDevTools(
    // Middleware you want to use in development:
    // Required! Enable Redux DevTools with the monitors you chose
    applyMiddleware(thunk),
);

const store = createStore(rootReducer, enhancer);

export default store;