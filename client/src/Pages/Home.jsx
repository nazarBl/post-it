import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {Grid} from '@mui/material';

import { Post } from '../components/';
import { TagsBlock } from '../components';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchMyPosts, fetchPopularPosts, fetchPosts, fetchPostsByTagFilter, fetchTags } from '../redux/slices/homeSlice.js';
import TabsMenu from '../components/TabsMenu';
import {useSearchParams} from 'react-router-dom';

export const Home = () => {
  const {userData} = useSelector(state=>state.auth)

  const dispatch = useDispatch();
  const pathname = window.location.pathname;
  const [searchParams] = useSearchParams()
  let tagName = searchParams.get('tagName')
  
  React.useEffect(()=>{
    switch (pathname) {
      case '/posts/popular':
        dispatch(fetchPopularPosts())
        break;
      case `/posts/:${tagName}`:
        dispatch(fetchPostsByTagFilter(tagName)) 
        break;
      case '/posts/myPosts':
        dispatch(fetchMyPosts(userData._id)) 
        break;
      case '/':
        dispatch(fetchPosts()) 
        break;
      
      default:
        break;
    }
      dispatch(fetchTags())
  },[dispatch, pathname, tagName, userData])

  const {posts, tags } =useSelector(state=>state.home)
  const comments = useSelector(state=>state.comments)
  
  if (tagName){
    tagName = tagName.replace(' ','%20')
  }
    
  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';
  const isCommentsLoading = comments.status === 'loading';
  
  return (
    <>
      <TabsMenu/>

      {/* POSTS COLUMN */}
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
            dateOfCreate = {post.dateOfCreate} 
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
          isLoading={isCommentsLoading}
          userId = {userData?userData._id:''}
          comments = {comments.items}
        />
        </Grid> 
      </Grid>
    </>
  )
  
}