import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import session from './session';
import workplace from './workplace'
import message from './messages';
import channel from './channel'
import workplaceSubscriber from './workplaceSubscriber';
import currentWorkplace from './currentWorkplace'
import user from './user';



const rootReducer = combineReducers({
    session,
    workplace,
    message,
    channel,
    workplaceSubscriber,
    currentWorkplace,
    user


})

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;