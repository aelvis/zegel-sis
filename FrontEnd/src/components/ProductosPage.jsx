import React, { useState, useEffect, useContext } from 'react';
import {
  Container, Box, Typography, Button, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, IconButton, CircularProgress,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { AuthContext } from '../context/AuthContext.jsx';
import { api } from '../services/api.js';

const ProductosPage = () => {
  const { token, showSnackbar } = useContext(AuthContext);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ id: null, nombre: '', descripcion: '', cantidad: 0 });
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

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

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCreateOrUpdate = async () => {
    try {
      if (isEditMode) {
        await api.updateProducto(form.id, form, token);
        showSnackbar('Producto actualizado.', "success");
      } else {
        await api.createProducto(form, token);
        showSnackbar('Producto creado.', "success");
      }
      
      await fetchProductos();
      setOpenDialog(false);
      resetForm();
    } catch (error) {
      showSnackbar(`Error: ${error.message}`, "error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este producto?")) return;
    
    try {
      await api.deleteProducto(id, token);
      showSnackbar("Producto eliminado.", "success");
      await fetchProductos();
    } catch (error) {
      showSnackbar(`Error: ${error.message}`, "error");
    }
  };

  const resetForm = () => {
    setForm({ id: null, nombre: '', descripcion: '', cantidad: 0 });
    setIsEditMode(false);
  };

  const handleEdit = (producto) => {
    setForm(producto);
    setIsEditMode(true);
    setOpenDialog(true);
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">Lista de Productos</Typography>
        <Button variant="contained" onClick={() => setOpenDialog(true)}>Agregar Producto</Button>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Cantidad</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productos.map((producto) => (
                <TableRow key={producto.id}>
                  <TableCell>{producto.id}</TableCell>
                  <TableCell>{producto.nombre}</TableCell>
                  <TableCell>{producto.descripcion}</TableCell>
                  <TableCell>{producto.cantidad}</TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleEdit(producto)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(producto.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={openDialog} onClose={() => { setOpenDialog(false); resetForm(); }}>
        <DialogTitle>{isEditMode ? 'Editar Producto' : 'Agregar Producto'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="nombre"
            label="Nombre"
            fullWidth
            value={form.nombre}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            name="descripcion"
            label="Descripción"
            fullWidth
            multiline
            rows={4}
            value={form.descripcion}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            name="cantidad"
            label="Cantidad"
            type="number"
            fullWidth
            value={form.cantidad}
            onChange={handleFormChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setOpenDialog(false); resetForm(); }}>Cancelar</Button>
          <Button onClick={handleCreateOrUpdate}>{isEditMode ? 'Guardar Cambios' : 'Crear Producto'}</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProductosPage;