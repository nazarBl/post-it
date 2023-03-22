import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../axios.js'

export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (params)=>{
 const {userData} = await axios.post('/auth/login', params)
 return userData
})
const initialState ={
    userData: null,
    status:'loading'
}

const authSlice =createSlice({
    name:'auth',
    initialState,
    extraReducers:{
        [fetchUserData.pending]:(state)=>{
            state.satus = 'loading';
            state.userData = null;
        },
        [fetchUserData.fullfilled]:(state, action)=>{
            state.status = 'loaded';
            state.userData = action.payload;
        },
        [fetchUserData.rejected]:(state)=>{
            state.status = 'error';
            state.userData = null;
        }
    }
})

export const authReducer = authSlice.reducer;