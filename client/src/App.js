import { Container } from '@mui/material';
import { Header } from './components/Header';

import { AddPost } from './Pages/AddPost';
import { FullPost } from './Pages/FullPost';
import { Home } from './Pages/Home';
import {Login} from './Pages/Login'

function App() {
  return (
    <>
      <Header />
      <Container maxWidth='lg'>
        {/* <Home /> */}
        {/* <FullPost /> */}
        {/* <AddPost /> */}
        <Login />
      </Container>
    </>
  );
  
}

export default App;
