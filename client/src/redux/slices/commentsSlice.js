import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios.js";



export const fetchCommentsByPostId = createAsyncThunk('comments/fetchCommentsByPostId', async (postId)=>{
    const {data} = await axios.get(`/comments/${postId}`)
    return data
})

export const fetchUpdateComment = createAsyncThunk('comments/fetchUpdateComment', async(params)=>{
    const {data} = await axios.patch('/post/comments/edit')
    return data
})

const initialState = {
        items:[],
        status:'loading',
}

const commentsSlice = createSlice({
    name:'commentsSlice',
    initialState,
    reducers:{

    },

    extraReducers:{
        [fetchCommentsByPostId.pending]:(state)=>{
            state.status = 'loading'
            state.items = []
        },
        [fetchCommentsByPostId.fulfilled]:(state, action)=>{
            state.status = 'loaded'
            state.items = action.payload
        },
        [fetchCommentsByPostId.rejected]:(state)=>{
            state.status = 'error'
            state.items = []
        }
    }
})

export const commentsReducer = commentsSlice.reducer;