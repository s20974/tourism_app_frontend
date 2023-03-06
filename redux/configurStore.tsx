import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import authReducer from './authReducer';
import * as apiCallsProcessing from '../api/apiCallUserProcessing';

let store:any = null;

const configureStore = (addLogger:any = false) => {
    let localStorageData:any;

    if (typeof window !== "undefined") {
        localStorageData = localStorage.getItem('fwm-auth');
    }
    
    let persistedState = {
        id: '',
        name: '',
        surname: '',
        password: '',
        jwt: '',
        isLoggedIn: false,
        notification: true,
        messages: [],
        activeContact: [],
        userChats: []
    }

    if (localStorageData) {
        try {
            persistedState = JSON.parse(localStorageData);
            apiCallsProcessing.setAuthorizationHeader(persistedState);
        } catch (error) {
            console.error(error)
        }
    }

    // const middleware = addLogger
    //     ? applyMiddleware(thunk, logger)
    //     : applyMiddleware(thunk);

    const middleware = applyMiddleware(thunk)

    store = createStore(authReducer, persistedState, middleware);

    store.subscribe(() => {
        localStorage.setItem('fwm-auth', JSON.stringify(store.getState()));
        apiCallsProcessing.setAuthorizationHeader(store.getState());
    });
    
    return store;
}

export type AppStore = ReturnType<typeof configureStore>
export const wrapper = createWrapper<AppStore>(configureStore)
export { store }