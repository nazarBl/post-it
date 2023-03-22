import {configureStore} from '@reduxjs/toolkit'
import { homeReducer } from './slices/homeSlice';
import {authReducer} from './slices/auth'

 const store = configureStore({
    reducer: {
        home: homeReducer,
        auth: authReducer,
    }
})

export default store;