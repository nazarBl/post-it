import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {Grid} from '@mui/material';

import { Post } from '../components/';
import { TagsBlock } from '../components';
import { CommentsBlock } from '../components/';
import { fetchPopularPosts, fetchPosts, fetchPostsByTagFilter, fetchTags } from '../redux/slices/homeSlice.js';
import TabsMenu from '../components/TabsMenu';
import { useParams } from 'react-router-dom';

export const Home = () => {
  const dispatch = useDispatch();
  const {posts, tags} =useSelector(state=>state.home)
  const {userData} = useSelector(state=>state.auth)
  let {tagName} = useParams();
  if (tagName){
    tagName = tagName.replace(' ','%20')
  }
  
    
  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';
  const pathname = window.location.pathname;
  
  React.useEffect(()=>{
    switch (pathname) {
      case '/popular':
        dispatch(fetchPopularPosts())
        break;
      case '/':
        dispatch(fetchPosts()) 
        break;
      case `/tags/${tagName}`:
        dispatch(fetchPostsByTagFilter(tagName)) 
        break;
    
      default:
        break;
    }
      dispatch(fetchTags())
  },[dispatch, pathname, tagName])

      return (
      <>
      <TabsMenu/>
      <Grid container spacing={4}>
        <Grid xs={8} item>
            {(isPostsLoading? [...Array(5)]: posts.items).map((post, index)=>
            isPostsLoading ? (<Post isLoading={true} key={index}/>) : ( 
            <Post 
            _id={post._id} 
            key={index} 
            isEditable={userData?._id===post.author._id} 
            isLoading = {false} 
            imageUrl={post.imageUrl ? `http://localhost:7000${post.imageUrl}`:''} 
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
          items={[ // HARDCODED DATA!!!
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