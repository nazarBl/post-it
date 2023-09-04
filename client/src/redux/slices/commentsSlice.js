import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios.js";

export const fetchCommentsByPostId = createAsyncThunk('comments/fetchCommentsByPostId', async (postId)=>{
    const {data} = await axios.get(`/comments/${postId}`)
    return data
})  

export const fetchLastComments = createAsyncThunk('comments/fetchLastComments', async()=>{
    const {data} = await axios.get('/comments/actual')
    return data
})

export const fetchUpdateComment = createAsyncThunk('comments/fetchUpdateComment', async(params)=>{
    const {data} = await axios.patch(`/comments`, params)
    return data
})

export const fetchDeleteComment = createAsyncThunk('comments/fetchDeleteComment', async(id)=>{
    await axios.delete(`/comments/${id}`)
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
        // GET COMMENTS BY POST'S ID
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
        },

        // GET LAST COMMENTS
        [fetchLastComments.pending]:(state)=>{
            state.status = 'loading'
            state.items = []
        },
        [fetchLastComments.fulfilled]:(state, action)=>{
            state.status = 'loaded'
            state.items = action.payload
        },
        [fetchLastComments.rejected]:(state)=>{
            state.status = 'error'
            state.items = []
        },

        // DELETE COMMENT
        [fetchDeleteComment.pending]:(state)=>{
            state.status = 'deleting'
        },
        [fetchDeleteComment.fulfilled]:(state)=>{
            state.status = 'deleted'
        },
        [fetchDeleteComment.rejected]:(state)=>{
            state.status = 'error'
        },
    }
})

export const commentsReducer = commentsSlice.reducer;