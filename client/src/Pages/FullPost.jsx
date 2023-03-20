import React from 'react';

import { Index } from '../components/AddComment/';
import { Post } from "../components/Post";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from 'react-router-dom';
import axios from '../axios.js';

export const FullPost = () => {
  const [post, setPost] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);

  const {id} = useParams();
  React.useEffect(()=>{
    axios.get(`/posts/${id}`).then(res=>{
      setPost(res.data);
      setIsLoading(false)
    }).catch((err)=>{
      console.warn(err);
      alert('Error while getting post') 
    })
  },[])

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost/>
  }

  return (
    <>  
        <Post
        _id={post.id}
        title={post.title}
        imageUrl={post.imageUrl}
        author={post.author}
        createdAt={post.createdAt}
        viewsCount={post.viewsCount}
        commentsCount={post.commentsCount}
        tags={post.tags}
        >
        <p>{post.text}</p>
        </Post>
        
            <CommentsBlock items={[
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
