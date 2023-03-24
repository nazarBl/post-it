import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../axios.js'

export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (params)=>{
    const {data} = await axios.post('/auth/login', params)
    return data
})
const initialState ={
    userData: null,
    status:'loading'
}

const authSlice =createSlice({
    name:'auth',
    initialState,
    reducers:{
        logOut:(state)=>{
            state.userData=null;
        }
    },
    extraReducers:{
        [fetchUserData.pending]:(state)=>{
            state.status = 'loading';
            state.userData = null;
        },
        [fetchUserData.fulfilled]:(state, action)=>{
            state.status = 'loaded';
            state.userData = action.payload;
        },
        [fetchUserData.rejected]:(state)=>{
            state.status = 'error';
            state.userData = null;
        }
    }
})

export const checkIfAuth = (state)=> Boolean(state?.auth.userData)

export const authReducer = authSlice.reducer;

export const { logOut} =authSlice.actions;