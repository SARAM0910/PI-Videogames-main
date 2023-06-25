import {createStore,applyMiddleware,compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../redux/Reducer';
const composeEnhancher = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;

export const store=createStore(
    rootReducer,
    composeEnhancher(applyMiddleware(thunkMiddleware))
);