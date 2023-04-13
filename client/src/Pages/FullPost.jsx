import React from 'react';

import { Index } from '../components/AddComment/';
import { Post } from "../components/Post";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import axios from '../axios.js';

export const FullPost = () => {
  const [post, setPost] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);

  const {id} = useParams();
  React.useEffect(()=>{
    axios.get(`/post/${id}`).then(res=>{
      setPost(res.data);
      setIsLoading(false)
    }).catch((err)=>{
      console.warn(err);
      alert('Error while getting post') 
    })
  },[id])
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
          items={[
            {
              user: {
                fullName: "Lynn Karter",
                avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
              },
              text: "WOOOOW!",
            },  
            {
              user: {
                fullName: "Roberto Pagani",
                avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
              },
              text: "I want join you ASAP",
            },
          ]}
        >
        <Index />
        </CommentsBlock>
        
    </>
  )
}
