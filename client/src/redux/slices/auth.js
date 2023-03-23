import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../axios.js'

export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (params)=>{
 const {data} = await axios.post('/auth/login', params)
 console.log(data);
 return data
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
            state.status = 'loading';
            state.userData = null;
        },
        [fetchUserData.fulfilled]:(state, action)=>{
            state.status = 'loaded';
            console.log(action);
            state.userData = action.payload;
        },
        [fetchUserData.rejected]:(state)=>{
            state.status = 'error';
            state.userData = null;
        }
    }
})

export const checkIfAuth = (state)=> Boolean(state.userData)

export const authReducer = authSlice.reducer;