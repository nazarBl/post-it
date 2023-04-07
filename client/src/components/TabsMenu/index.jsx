import { Tab, Tabs } from '@mui/material';
import React from 'react'
import { Link, useParams } from 'react-router-dom';

const TabsMenu = () => {
    const pathname = window.location.pathname;
    const params = useParams();
    
    let tagName;
    if(params.tagName){
        tagName = params.tagName.split('/').at(-1).split('%20').join('')
    } 
    
    if(!params.tagName){
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
                    value = {'/popular'}
                    to={'/popular'}
                  />
                
              </Tabs>
              </>
          )
    } else {
        return <h2>Posts with <span style={{color:'#4a78ed'}}>#{tagName}</span> tag:</h2>
    }
  
}

export default TabsMenu