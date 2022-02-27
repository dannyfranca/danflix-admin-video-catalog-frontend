import { Box } from '@mui/system';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import AppRouter from './routes/AppRouter';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <NavBar />
        <Box paddingTop={'70px'}>
          <AppRouter />
        </Box>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
