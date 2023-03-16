import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { Post } from '../components/Header/Post';

export const Home = () => {

    const testUrl ='https://c4.wallpaperflare.com/wallpaper/875/738/429/chicago-cityscape-high-rise-buildings-wallpaper-preview.jpg'
  return (
    <>
        <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
            <Tab label="New" />
            <Tab label="Popular" />
        </Tabs>
        <Grid container spacing={4}>
            <Grid xs={8} item>
                {[...Array(5)].map(()=>( // means show posts by 5
                    <Post imageUrl={testUrl} title='Test Title' tags={['why', 'we', 'title', 'test']} viewsCount={771} commentsCount={23}/>
                ))}
            </Grid>
            <Grid xs={4} item>
                TAGS HERE
            </Grid>
            <Grid xs={4} item>
                COMMENTS HERE
            </Grid>
        </Grid>
    </>  
  ) 
}