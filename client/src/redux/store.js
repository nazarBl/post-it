import {configureStore} from '@reduxjs/toolkit'
import { homeReducer } from './slices/homeSlice';
import {authReducer} from './slices/authSlice'
import {commentsReducer} from './slices/commentsSlice'

 const store = configureStore({
    reducer: {
        home: homeReducer,
        auth: authReducer,
        comments: commentsReducer,
    }
})

export default store;