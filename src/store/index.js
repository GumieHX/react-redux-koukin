import { createStore, applyMiddleware, combineReducers } from '../redux-kk/index';
// import { createStore, applyMiddleware, combineReducers } from 'redux'
// import thunk from 'redux-thunk'
// import logger from 'redux-logger'
// import promise from 'redux-promise'
import isPromise from 'is-promise';

const countReducer = (state = 0, action) => {
    switch (action.type) {
        case 'ADD':
            return state + 1;
        case 'MINUS':
            return state - 1;
        default:
            return state;
    }
}

const logger = ({ getState, dispatch}) => {
    return next => action => {
        console.log('----------------------------------------------------------------');
        console.log(action.type + ' 执行了');
        const prevState = getState();
        console.log("prevState : ", prevState);
        const result = next(action)
        const currentState = getState();
        console.log("currentState : ", currentState);
        console.log('----------------------------------------------------------------');

        return result;
    }
}

const promise = ({ getState, dispatch }) => {
    return next => action => {
        isPromise(action) ? action.then(dispatch) : next(action)
    }
}

const thunk = ({ getState, dispatch }) => {
    return next => action => {
        if(typeof action === 'function') return action(dispatch, getState)

        return next(action)
    }
}


const store = createStore(combineReducers({
    count: countReducer
}), applyMiddleware(promise, thunk, logger));

export default store;