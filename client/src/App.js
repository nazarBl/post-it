import React from 'react';

import { Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { Header }  from './components';
import { useDispatch } from 'react-redux';

import { Home, FullPost, Registration, AddPost, Login } from "./Pages";
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
          <Route path="/posts/:id" element = {<FullPost/>}/>
          <Route path="/posts/:id/edit" element = {<AddPost/>}/>
          <Route path="/posts/create" element={<AddPost/>} />
          <Route path="/auth/login" element={<Login/>} />
          <Route path="/auth/registration" element={<Registration/>} />
        </Routes>
        
      </Container>
    </>
  );
  
}

export default App;
