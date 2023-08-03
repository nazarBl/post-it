import React from 'react';

import {AddComment} from '../components/AddComment/';
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
    axios.get(`/posts/${id}`).then(res=>{
      setPost(res.data);
      dispatch(fetchCommentsByPostId(id))
      setIsLoading(false)
    }).catch((err)=>{
      console.warn(err);

      alert('Error while getting post') 
    })
  },[id, dispatch])

  const comments = useSelector(state=>state.comments.items)
  const userId = useSelector(state=>state.auth._id)

  console.log(comments.filter(com=>com.isEditable===true))
  let isEditingComment = false;
  if (comments.filter(comment=>comment.isEditable===true).length>0){
    isEditingComment = true
  }

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
          commentsCount={comments.length}
          tags={post.tags}
          >
          <ReactMarkdown children={post.text}/>
        </Post>
        
        <CommentsBlock 
          postId = {id}
          comments
          userId = {userId}
        >
        </CommentsBlock>
        {
          !isEditingComment &&<AddComment />
        }
        
    </>
  )
}
