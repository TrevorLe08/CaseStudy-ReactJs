import {combineReducers, configureStore} from '@reduxjs/toolkit'
import usersReducer from './slices/usersSlice'
import productsReducer from './slices/productsSlice'
import categoriesReducer from './slices/categoriesSlice'
import cartsReducer from './slices/cartsSlice'
import persistStore from 'redux-persist/es/persistStore'
import storage from 'redux-persist/lib/storage'
import {persistReducer} from 'redux-persist'

const rootReducer = combineReducers({
    user: usersReducer,
    product: productsReducer,
    category: categoriesReducer,
    cart: cartsReducer,
})

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
})

export const persistor = persistStore(store)