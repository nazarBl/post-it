import React from 'react';

import { Index } from '../components/AddComment/';
import { Post } from "../components/Post";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import axios from '../axios.js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCommentsByPostId } from '../redux/slices/commentsSlice';

export const FullPost = () => {
  const [post, setPost] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);

  const dispatch = useDispatch()
  const {id} = useParams();
  React.useEffect(()=>{
    axios.get(`/post/${id}`).then(res=>{
      setPost(res.data);
      setIsLoading(false)
    }).catch((err)=>{
      console.warn(err);
      alert('Error while getting post') 
    })
    dispatch(fetchCommentsByPostId(id))
  },[id, dispatch])

  const comments = useSelector(state=>state.comments.items)

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost/>
  }

  return (
    <>  
        <Post
          _id={post.id}
          title={post.title}
          imageUrl={post.imageUrl ? `http://localhost:7000${post.imageUrl}`:''}
          author={post.author}
          dateOfCreate={post.dateOfCreate}
          createdAt={post.createdAt}
          viewsCount={post.viewsCount}
          commentsCount={post.commentsCount}
          tags={post.tags}
          >
          <ReactMarkdown children={post.text}/>
        </Post>
        
        <CommentsBlock 
          items={comments}
        >
        </CommentsBlock>
        <Index />
    </>
  )
}
