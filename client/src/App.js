import { Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { Header }  from './components';

import { Home, FullPost, Registration, AddPost, Login } from "./Pages";

function App() {
  return (
    <>
      <Header />
      <Container maxWidth='lg'>
        <Routes>
          <Route path="/" element = {<Home/>}/>
          <Route path="/posts/:id" element = {<FullPost/>}/>
          <Route path="/posts/create" element={<AddPost/>} />
          <Route path="/auth/login" element={<Login/>} />
          <Route path="/auth/registration" element={<Registration/>} />
        </Routes>
        
      </Container>
    </>
  );
  
}

export default App;
