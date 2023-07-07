import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from '../../axios.js'


export const fetchPosts = createAsyncThunk('home/fetchPosts', async ()=>{
    const {data} = await axios.get('/posts')
    return data;
})

export const fetchTags = createAsyncThunk('home/fetchTags', async ()=>{
    const {data} = await axios.get('/tags')
    return data;
})

export const fetchPostsByTagFilter = createAsyncThunk('home/fetchPostsByTagFilter', async (tagName)=>{
    const {data} = await axios.get(`/posts/?tagName=${tagName}`)
    return data
})

export const fetchPopularPosts = createAsyncThunk('home/fetchPopularPosts', async()=>{
    const {data} = await axios.get('/posts/popular')
    return data
})

export const fetchMyPosts = createAsyncThunk('home/fetchMyPosts', async()=>{
    const {data} = await axios.get('/posts/myPosts')
    return data
})

export const fetchRemovePost = createAsyncThunk('home/fetchRemovePost', async(id)=> 
axios.delete(`/posts/${id}`))

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
    reducers:{

    },
    extraReducers:{
        //Getting posts
        [fetchPosts.pending]:(state)=>{
            state.posts.status='loading';
            state.posts.items=[];
        },
        [fetchPosts.fulfilled]:(state, action)=>{
            state.posts.status='loaded';
            state.posts.items =action.payload;
        },
        [fetchPosts.rejected]:(state)=>{
            state.posts.status='error';
            state.posts.items=[];
        },
        
        //Getting popular posts
        [fetchPopularPosts.pending]:(state)=>{
            state.posts.status='loading';
            state.posts.items=[];
        },
        [fetchPopularPosts.fulfilled]:(state, action)=>{
            state.posts.status='loaded';
            state.posts.items =action.payload;
        },
        [fetchPopularPosts.rejected]:(state)=>{
            state.posts.status='error';
            state.posts.items=[];
        },

        //Gettin posts by tag filter
        [fetchPostsByTagFilter.pending]:(state)=>{
            state.posts.status='loading';
            state.posts.items=[];
        },
        [fetchPostsByTagFilter.fulfilled]:(state,action)=>{
            state.posts.status='loaded';
            state.posts.items=action.payload;
        },
        [fetchPostsByTagFilter.reject]:(state)=>{
            state.posts.status='error';
            state.posts.items=[]
        },

        [fetchMyPosts.pending]:(state)=>{
            state.posts.status='loading';
            state.posts.items=[]
        },
        [fetchMyPosts.fulfilled]:(state,action)=>{
            state.posts.status='loaded';
            state.posts.items=action.payload
        },
        [fetchMyPosts.rejected]:(state)=>{
            state.posts.status='error'
        },
        //Getting tags
        [fetchTags.pending]:(state)=>{
            state.tags.status='loading';
            state.tags.items=[];
        },
        [fetchTags.fulfilled]:(state, action)=>{
            state.tags.status='loaded';
            
            state.tags.items =action.payload;
        },
        [fetchTags.rejected]:(state)=>{
            state.tags.status='error';
            state.tags.items=[];
        },

        //Delete post
        [fetchRemovePost.pending]:(state, action)=>{
            state.posts.items = state.posts.items.filter(post=>post._id!==action.meta.arg)
        }
    }
})

export const homeReducer = homeSlice.reducer;