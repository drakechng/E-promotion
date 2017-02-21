import {AsyncStorage} from "react-native";
import {composeWithDevTools} from "redux-devtools-extension";
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {persistStore} from "redux-persist";
import reducer from "./reducers";
import promise from "./promise";

const composeEnhancers = composeWithDevTools({
    // Specify here name, actionsBlacklist, actionsCreators and other options
});

export default function configureStore(onCompletion: ()=>void): any {
    const enhancer = composeEnhancers(
        applyMiddleware(thunk, promise),
    );

    const store = createStore(reducer, enhancer);
    persistStore(store, {storage: AsyncStorage}, onCompletion);

    return store;
}

