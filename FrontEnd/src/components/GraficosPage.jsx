import React, { useState, useEffect, useContext } from 'react';
import {
  Container, Box, Typography, CircularProgress, Paper, Grid
} from '@mui/material';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { AuthContext } from '../context/AuthContext.jsx';
import { api } from '../services/api.js';

const GraficosPage = () => {
  const { token, showSnackbar } = useContext(AuthContext);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProductos = async () => {
    setLoading(true);
    try {
      const data = await api.getProductos(token);
      setProductos(data);
    } catch (error) {
      showSnackbar(`Error al cargar productos: ${error.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, [token]);

  const chartData = productos.map(p => ({
    name: p.nombre,
    cantidad: p.cantidad
  }));

  const maxCantidadProducto = productos.reduce((max, p) => (p.cantidad > max.cantidad ? p : max), { cantidad: 0 });

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Gráficos de Productos</Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ padding: 2 }}>
              <Typography variant="h6" gutterBottom>Cantidad de Productos por Categoría</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="cantidad" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ padding: 2, textAlign: 'center' }}>
              <Typography variant="h6">Producto con Mayor Cantidad</Typography>
              <Typography variant="h5" color="primary" sx={{ mt: 2 }}>
                {maxCantidadProducto.nombre} ({maxCantidadProducto.cantidad} unidades)
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default GraficosPage;