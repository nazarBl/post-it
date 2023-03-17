import { Container } from '@mui/material';
import { Header } from './components/Header';
import { AddPost } from './Pages/AddPost/AddPost';
// import { FullPost } from './Pages/FullPost';
// import { Home } from './Pages/Home';

function App() {
  return (
    <>
      <Header />
      <Container maxWidth='lg'>
        {/* <Home /> */}
        {/* <FullPost /> */}
        <AddPost />
      </Container>
    </>
  );
  
}

export default App;
