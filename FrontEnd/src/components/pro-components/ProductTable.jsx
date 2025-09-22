import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Box, Typography, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductTable = ({ productos, loading, onEdit, onDelete }) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} elevation={3}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: 'primary.main' }}>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Nombre</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Descripción</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Cantidad</TableCell>
            <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productos.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                <Typography variant="body1" color="textSecondary">
                  No hay productos registrados
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            productos.map((producto) => (
              <TableRow key={producto.id} hover>
                <TableCell>{producto.id}</TableCell>
                <TableCell sx={{ fontWeight: 'medium' }}>{producto.nombre}</TableCell>
                <TableCell>
                  {producto.descripcion || (
                    <Typography variant="body2" color="textSecondary">
                      Sin descripción
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  <Box 
                    sx={{ 
                      display: 'inline-block', 
                      px: 1, 
                      py: 0.5, 
                      borderRadius: 1,
                      backgroundColor: producto.cantidad === 0 ? 'error.light' : 
                                      producto.cantidad < 10 ? 'warning.light' : 'success.light',
                      color: producto.cantidad === 0 ? 'error.contrastText' : 
                            producto.cantidad < 10 ? 'warning.contrastText' : 'success.contrastText',
                      fontWeight: 'bold'
                    }}
                  >
                    {producto.cantidad}
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <IconButton 
                    color="primary" 
                    onClick={() => onEdit(producto)}
                    aria-label="Editar producto"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    color="error" 
                    onClick={() => onDelete(producto.id)}
                    aria-label="Eliminar producto"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;