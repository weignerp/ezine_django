import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import loggerMiddleware from './middleware/logger';
import logger from 'redux-logger';
import monitorReducersEnhancer from './enhancers/monitorReducer';
import rootReducer from './rootReducer';

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
const langItemFromStorage = localStorage.getItem('language') ? JSON.parse(localStorage.getItem('language')) : { locale: 'en', currency: 'USD', currencySymbol: '$' };
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {};
const cartItemFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ? localStorage.getItem('paymentMethod') : "";
const orderCreate = localStorage.getItem('orderCreate') ? localStorage.getItem('orderCreate') : {
    order: {},
    loading: false,
    success: false,
};
const preloadedState = {
    cart: {
        cartItems: cartItemFromStorage,
        shippingAddress: shippingAddressFromStorage,
        paymentMethod: paymentMethodFromStorage
    },
    language: langItemFromStorage,
    userLogin: { userInfo: userInfoFromStorage },
    userRegister: { userInfo: userInfoFromStorage },
    orderCreate: orderCreate
};

const middlewares = process.env.NODE_ENV === 'development' ? [logger, loggerMiddleware, thunkMiddleware] : [thunkMiddleware];

const configStore = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
    enhancers: [monitorReducersEnhancer],
    preloadedState,
    devTools: process.env.NODE_ENV !== 'production' && composeWithDevTools(),
});

export default configStore;
