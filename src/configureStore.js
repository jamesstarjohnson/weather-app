import reducers from "./reducers";
import { createStore, applyMiddleware, compose  } from "redux";
import thunk from 'redux-thunk';

const configureStore = () => {
    const middlewares = [thunk];
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
        reducers,
        composeEnhancers(applyMiddleware(...middlewares))
    );
    return store;
}

export default configureStore;