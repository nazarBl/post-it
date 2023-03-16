import { Container } from '@mui/material';
import { Header } from './components/Header';
import { Home } from './Pages/Home';

function App() {
  return (
    <>
      <Header />
      <Container maxWidth='lg'>
        <Home />
      </Container>
    </>
  );
  
}

export default App;
