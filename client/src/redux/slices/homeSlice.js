import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    posts:{
        items:[],
        status:'loading'
    },
    tags:{
        items:[],
        status:'loading'
    }
}

const homeSlice = createSlice({
    name: 'homeSlice',
    initialState,
    reducer:{

    }
})

export const homeReducer = homeSlice.reducer;