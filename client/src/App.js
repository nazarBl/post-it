import React from 'react';

import { Container } from '@mui/material';
import { Route, Routes, useSearchParams } from 'react-router-dom';
import { Header }  from './components';
import { useDispatch } from 'react-redux';

import { Home, FullPost, Registration, AddPost, Login, Profile } from "./Pages";
import { fetchAuthMe } from './redux/slices/authSlice';
import { fetchPostsByTagFilter } from './redux/slices/homeSlice';

function App() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams()
  const tagName = searchParams.get('tagName')
  
  React.useEffect(()=>{
    dispatch(fetchAuthMe())
  },[dispatch])

  React.useEffect(()=>{
    if(tagName){
      dispatch(fetchPostsByTagFilter(tagName))
    }
  },[dispatch, tagName])
  return (
    <>
      <Header />
      <Container maxWidth='lg'>
        <Routes>
          <Route path="/" element = {<Home/>}/>
          <Route path="/posts/popular" element = {<Home/>}/>
          <Route path="/posts" element = {<Home/>}/>
          <Route path="/posts/:id" element = {<FullPost/>}/>
          <Route path="/posts/:id/edit" element = {<AddPost/>}/>
          <Route path="/posts/create" element={<AddPost/>} />
          <Route path="/auth/login" element={<Login/>} />
          <Route path="/auth/registration" element={<Registration/>} />
          <Route path="/auth/me" element={<Profile/>} />
          <Route path="/auth/me/edit" element={<Profile/>} />
        </Routes>
        
      </Container>
    </>
  );
  
}

export default App;
