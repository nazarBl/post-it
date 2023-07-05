import { Tab, Tabs } from '@mui/material';
import React from 'react'
import { Link, useSearchParams } from 'react-router-dom';

const TabsMenu = () => {
    const pathname = window.location.pathname;
    let [searchParams] = useSearchParams();
    const tagName = searchParams.get('tagName')
    
    if(!tagName){
        return (
            <>
            <Tabs style={{ marginBottom: 15 }} value={pathname} aria-label="basic tabs example" >
                  <Tab
                    label="New"
                    component = {Link}
                    value = {'/'}
                    to={'/'}
                    
                  />
                  <Tab 
                    label="Popular"
                    component = {Link}
                    value = {'/posts/popular'}
                    to={'/posts/popular'}
                  />
              </Tabs>
              </>
          )
    } else {
        return <h2>Posts with <span style={{color:'#4a78ed'}}>#{tagName}</span> tag:</h2>
    }
}

export default TabsMenu