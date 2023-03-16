import { Container } from '@mui/material';
import { Header } from './components/Header';
import { FullPost } from './Pages/FullPost';
import { Home } from './Pages/Home';

function App() {
  return (
    <>
      <Header />
      <Container maxWidth='lg'>
        {/* <Home /> */}
        <FullPost />
      </Container>
    </>
  );
  
}

export default App;
