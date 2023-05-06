import React from 'react';

import { Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { Header }  from './components';
import { useDispatch } from 'react-redux';

import { Home, FullPost, Registration, AddPost, Login, Profile } from "./Pages";
import { fetchAuthMe } from './redux/slices/auth';

function App() {
  const dispatch = useDispatch();

  React.useEffect(()=>{
    dispatch(fetchAuthMe())
  },[dispatch])
  return (
    <>
      <Header />
      <Container maxWidth='lg'>
        <Routes>
          <Route path="/" element = {<Home/>}/>
          <Route path="/popular" element = {<Home/>}/>
          <Route path="/posts/:tagName" element = {<Home/>}/>
          <Route path="/post/:id" element = {<FullPost/>}/>
          <Route path="/post/:id/edit" element = {<AddPost/>}/>
          <Route path="/post/create" element={<AddPost/>} />
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
