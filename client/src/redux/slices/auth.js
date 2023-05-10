import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../axios.js'

export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (params)=>{
    const {data} = await axios.post('/auth/login', params)
    return data
})

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (values)=>{
    const {data} = await axios.post('/auth/registration', values)
    return data
})

export const fetchAuthMe = createAsyncThunk('auth/getMe', async ()=>{
     const {data} = await axios.get('/auth/me'); //get params for axios described by middleware in axios.js
     return data;
}) 

export const fetchUpdateMe = createAsyncThunk('auth/fetchUpdateMe', async (values)=>{
    const {data} = await axios.patch('/auth/me', values);
    return data;
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
        },


        [fetchAuthMe.pending]:(state)=>{
            state.status = 'loading';
            state.userData = null;
        },
        [fetchAuthMe.fulfilled]:(state, action)=>{
            state.status = 'loaded';
            state.userData = action.payload;
        },
        [fetchAuthMe.rejected]:(state)=>{
            state.status = 'error';
            state.userData = null
        },


        [fetchRegister.pending]:(state)=>{
            state.status = 'loading';
        },
        [fetchRegister.fulfilled]:(state, action)=>{
            state.status = 'loaded';
            state.userData = action.payload;
        },
        [fetchRegister.rejected]:(state)=>{
            state.status = 'error'
        },
        

        [fetchUpdateMe.pending]:(state)=>{
            state.status ='loading';
        },
        [fetchUpdateMe.fulfilled]:(state,action)=>{
            state.status = 'loaded';
            state.userData.fullName = action.payload.fullName;
            state.userData.email = action.payload.email;
        },
        [fetchUpdateMe.rejected]:(state)=>{
            state.status = 'error';
        }
    }
})

export const checkIfAuth = (state)=> Boolean(state?.auth.userData); //checking if user is logged in

export const authReducer = authSlice.reducer;

export const { logOut} =authSlice.actions;