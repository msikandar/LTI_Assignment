import { applyMiddleware, combineReducers, createStore } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
// import { encryptTransform } from 'redux-persist-transform-encrypt';
import logger from 'redux-logger'

import storage from 'redux-persist/lib/storage'

import { authReducer } from './reducer/auth.reducer'
import { eventReducer } from './reducer/events.reducer'

const rootReducer = combineReducers({
  auth: authReducer,
  events: eventReducer,
})

const persistConfig = {
  key: 'lti',
  blacklist: [],
  storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer, applyMiddleware(logger))
const persistor = persistStore(store)
export default store
export { persistor }
