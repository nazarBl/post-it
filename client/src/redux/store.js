import {configureStore} from '@reduxjs/toolkit'
import { homeReducer } from './slices/homeSlice';

 const store = configureStore({
    reducer: {
        home:homeReducer,
    }
})

export default store;