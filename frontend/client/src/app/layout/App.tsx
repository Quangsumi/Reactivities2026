import { CssBaseline, Container, Box } from '@mui/material';
import NavBar from './NavBar';
import { Outlet, ScrollRestoration, useLocation } from 'react-router';
import HomePage from '../../features/home/HomePage';

export default function App() {
  const location = useLocation();
  return (
    <Box sx={{ backgroundColor: '#eeee', minHeight: '100vh' }}>
      <ScrollRestoration />
      <CssBaseline />
      { location.pathname === '/' ? <HomePage /> : 
        <>
          <NavBar />
          <Container maxWidth="xl" sx={{ mt: 3 }}>
            <Outlet />
          </Container>
        </>
      }
    </Box>   
  )
}