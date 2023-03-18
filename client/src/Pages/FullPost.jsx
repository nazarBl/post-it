import React from 'react';

import { Index } from '../components/AddComment/';
import { Post } from "../components/Post";
import { CommentsBlock } from "../components/CommentsBlock";

export const FullPost = () => {
  return (
    <>  
        <Post
        _id={2}
        title="Vacation in Malaysia"
        imageUrl="https://www.oyorooms.com/blog/wp-content/uploads/2018/06/Featured-Image-Relaxing-places-of-Malaysia.jpg"
        author={{
            avatarUrl:"https://mui.com/static/images/avatar/7.jpg",
            fullName:"Murphy",}}
        createdAt={"12 June 2023"}
        viewsCount={150}
        commentsCount={3}
        tags={["react", "fun", "typescript"]}
        >
        <p>So I am finnally here in Malaysia! If someone would tell me before I will spend my vacation in place like this i would never believe them! Luckily for me I get opportunity to take tickets at extra low price so I think "Why not, Murphy?" This place is amazing, people are so kind, food is delicious, but what really made me excited is those jaw-dropping views including one from my apartment. I am so happy not to miss chance be in Malasyia this week!</p>
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
