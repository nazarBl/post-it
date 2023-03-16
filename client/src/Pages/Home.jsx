import React from 'react';
import {Tabs, Tab, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import TagIcon from "@mui/icons-material/Tag";

import { Post } from '../components/Post';
import { SideBlock } from '../components/SideBlock';
import { SideComments } from '../components/SideComments';

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
                <SideBlock title = "Tags">
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <TagIcon />
                                </ListItemIcon>
                                <ListItemText primary="react" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </SideBlock>
                <SideBlock title="Comments">
                    <SideComments  items={[
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
              ]}/>
                </SideBlock>
            </Grid> 
        </Grid>
    </>  
  ) 
}