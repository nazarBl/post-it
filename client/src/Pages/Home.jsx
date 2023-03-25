import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {Tabs, Tab, Grid} from '@mui/material';

import { Post } from '../components/';
import { TagsBlock } from '../components';
import { CommentsBlock } from '../components/';
import { fetchPosts, fetchTags } from '../redux/slices/homeSlice.js';

export const Home = () => {
  const dispatch = useDispatch();
  const {posts, tags} =useSelector(state=>state.home)
  const {userData} = useSelector(state=>state.auth)

  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';

  React.useEffect(()=>{
   dispatch(fetchPosts())
   dispatch(fetchTags())
  },[dispatch])

  return (
    <>
        <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
            <Tab label="New" />
            <Tab label="Popular" />
        </Tabs>
        <Grid container spacing={4}>
            <Grid xs={8} item>
                {(isPostsLoading? [...Array(5)]: posts.items).map((post, index)=>
                isPostsLoading ? (<Post isLoading={true} key={index}/>) : ( 
                <Post 
                _id={post._id} 
                key={index} 
                isEditable={userData?._id===post.author._id} 
                isLoading = {false} 
                imageUrl={post.imageUrl} 
                title={post.title} 
                author = {post.author} 
                createdAt = {post.createdAt} 
                tags={post.tags} 
                viewsCount={post.viewsCount} 
                commentsCount={post.commentsCount}/>
            )
                )}
            </Grid>
            <Grid xs={4} item>
                <TagsBlock 
                  items = {
                    tags.items
                  }
                  isLoading ={isTagsLoading}
                />
                <CommentsBlock 
                  items={[
                    {
                      user: {
                        fullName: "John Torm",
                        avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                      },
                      text: "Nice place!",
                    },
                    {
                      user: {
                        fullName: "Bob Loren",
                        avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                      },
                      text: "What about pricing?",
                    },
                  ]}
                  isLoading={false}
                />
            </Grid> 
        </Grid>
    </>  
  ) 
}