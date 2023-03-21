import { applyMiddleware, combineReducers, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
// import { encryptTransform } from 'redux-persist-transform-encrypt';
import logger from 'redux-logger';

import storage from 'redux-persist/lib/storage';

import { authReducer } from './reducer/auth.reducer';

const rootReducer = combineReducers({
    auth: authReducer,
});

const persistConfig = {
    key: 'root',
    blacklist: [],
    storage,
    // transforms: [
    //     encryptTransform({
    //         secretKey: process.env.REACT_APP_SECRET_KEY,
    //         onError: function (error) {
    //             // Handle the error.
    //         },
    //     }),
    // ],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(logger));
const persistor = persistStore(store);
export default store;
export { persistor };
