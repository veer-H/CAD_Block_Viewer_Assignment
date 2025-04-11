import { Outlet } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container,
  CssBaseline,
  Box
} from '@mui/material';
import { Link } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <CssBaseline />
      <AppBar position="static" sx={{ width: '100%' }}>
        <Toolbar>
          <Typography 
            variant="h6" 
            component={Link} 
            to="/"
            sx={{ 
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            CAD Block Viewer
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth={false} sx={{ py: 4, width: '100%' }}>
  <Box sx={{ minHeight: '80vh', maxWidth: '100%' }}>
    <Outlet />
  </Box>
  <Box sx={{ py: 3, textAlign: 'center' }}>
    <Typography variant="body2" color="text.secondary">
      CAD Block Viewer {new Date().getFullYear()}
    </Typography>
  </Box>
</Container>
    </>
  );
}