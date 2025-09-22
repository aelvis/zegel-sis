import React, { useState, useEffect, useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, CircularProgress } from '@mui/material';
import { AuthContext } from './context/AuthContext.jsx';
import Login from './components/Login.jsx';
import ProductosPage from './components/ProductosPage.jsx';
import GraficosPage from './components/GraficosPage.jsx';

const App = () => {
  const { token, logoutUser, loading } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState('login');

  useEffect(() => {
    if (token) {
      setCurrentPage('productos');
    } else {
      setCurrentPage('login');
    }
  }, [token]);

  const renderContent = () => {
    if (loading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
          <CircularProgress />
        </Box>
      );
    }

    switch (currentPage) {
      case 'login':
        return <Login />;
      case 'productos':
        return <ProductosPage />;
      case 'graficos':
        return <GraficosPage />;
      default:
        return <Login />;
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sistema Zegel
          </Typography>
          {token && (
            <>
              <Button color="inherit" onClick={() => setCurrentPage('productos')}>Productos</Button>
              <Button color="inherit" onClick={() => setCurrentPage('graficos')}>Gráficos</Button>
              <Button color="inherit" onClick={logoutUser}>Salir</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        {renderContent()}
      </Container>
    </Box>
  );
};

export default App;