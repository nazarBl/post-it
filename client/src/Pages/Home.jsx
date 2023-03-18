import React from 'react';
import axios from '../axios.js'
import {useDispatch} from 'react-redux'
import {Tabs, Tab, Grid} from '@mui/material';

import { Post } from '../components/';
import { TagsBlock } from '../components';
import { CommentsBlock } from '../components/';
import { fetchPosts } from '../redux/slices/homeSlice.js';

export const Home = () => {
  const dispatch = useDispatch();

  React.useEffect(()=>{
   dispatch(fetchPosts())
  },[])

  const testUrl ='https://www.planetware.com/wpimages/2019/11/canada-in-pictures-beautiful-places-to-photograph-morraine-lake.jpg'
  return (
    <>
        <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
            <Tab label="New" />
            <Tab label="Popular" />
        </Tabs>
        <Grid container spacing={4}>
            <Grid xs={8} item>
                {[...Array(5)].map(()=>( // means show posts by 5
                    <Post _id={1} isEditable={true} isLoading = {false} imageUrl={testUrl} title='Test Title' author = {{fullName:"Kim", avatarUrl:"https://mui.com/static/images/avatar/3.jpg"}}tags={['why', 'we', 'title', 'test']} viewsCount={771} commentsCount={23}/>
                ))}
            </Grid>
            <Grid xs={4} item>
                <TagsBlock 
                  items = {[
                    "Vacation", "Summer2023", "freetime " 
                  ]}
                  isLoading ={false}
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