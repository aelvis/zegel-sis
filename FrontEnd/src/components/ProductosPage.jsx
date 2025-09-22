import React, { useState, useEffect, useContext } from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { AuthContext } from '../context/AuthContext.jsx';
import { api } from '../services/api.js';
import ProductTable from './pro-components/ProductTable';
import ProductDialog from './pro-components/ProductDialog';
import DeleteConfirmationDialog from './pro-components/DeleteConfirmationDialog';

const ProductosPage = () => {
  const { token, showSnackbar } = useContext(AuthContext);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    id: null,
    nombre: '',
    descripcion: '',
    cantidad: ''
  });
  const [errors, setErrors] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null });
  const [touched, setTouched] = useState({});

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

  // Validaciones
  const validateField = (name, value) => {
    switch (name) {
      case 'nombre':
        if (!value.trim()) return 'El nombre es requerido';
        if (value.length < 2) return 'El nombre debe tener al menos 2 caracteres';
        if (value.length > 100) return 'El nombre no puede exceder los 100 caracteres';
        return '';

      case 'descripcion':
        if (value.length > 500) return 'La descripción no puede exceder los 500 caracteres';
        return '';

      case 'cantidad':
        if (value === '') return 'La cantidad es requerida';
        if (isNaN(value)) return 'La cantidad debe ser un número';
        if (parseInt(value) < 0) return 'La cantidad no puede ser negativa';
        if (parseInt(value) > 1000000) return 'La cantidad no puede exceder 1,000,000';
        if (!Number.isInteger(Number(value))) return 'La cantidad debe ser un número entero';
        return '';

      default:
        return '';
    }
  };

  // Validar si el formulario es válido
  const isFormValid = () => {
    return !validateField('nombre', form.nombre) &&
      !validateField('descripcion', form.descripcion) &&
      !validateField('cantidad', form.cantidad);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    // Solo procesar números para cantidad
    const processedValue = name === 'cantidad' ? value.replace(/[^0-9]/g, '') : value;

    setForm(prev => ({ ...prev, [name]: processedValue }));

    // Validación en tiempo real si el campo ya ha sido tocado
    if (touched[name]) {
      const error = validateField(name, processedValue);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    // Marcar el campo como tocado
    setTouched(prev => ({ ...prev, [name]: true }));

    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleCreateOrUpdate = async () => {
    // Marcar todos los campos como tocados para mostrar errores
    const allTouched = {
      nombre: true,
      descripcion: true,
      cantidad: true
    };
    setTouched(allTouched);

    // Validar todos los campos
    const newErrors = {
      nombre: validateField('nombre', form.nombre),
      descripcion: validateField('descripcion', form.descripcion),
      cantidad: validateField('cantidad', form.cantidad)
    };

    setErrors(newErrors);

    // Si hay errores, no continuar
    if (newErrors.nombre || newErrors.descripcion || newErrors.cantidad) {
      showSnackbar('Por favor, corrige los errores en el formulario', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const productoData = {
        nombre: form.nombre.trim(),
        descripcion: form.descripcion.trim(),
        cantidad: parseInt(form.cantidad, 10)
      };

      if (isEditMode) {
        await api.updateProducto(form.id, productoData, token);
        showSnackbar('Producto actualizado correctamente', 'success');
      } else {
        await api.createProducto(productoData, token);
        showSnackbar('Producto creado correctamente', 'success');
      }

      await fetchProductos();
      setOpenDialog(false);
      resetForm();
    } catch (error) {
      // Manejo específico de errores
      if (error.response) {
        if (error.response.status === 400) {
          showSnackbar('Datos inválidos enviados al servidor', 'error');
        } else if (error.response.status === 409) {
          showSnackbar('Ya existe un producto con ese nombre', 'error');
        } else {
          showSnackbar(`Error: ${error.response.data.message || error.message}`, 'error');
        }
      } else if (error.request) {
        showSnackbar('Error de conexión. Verifica tu internet.', 'error');
      } else {
        showSnackbar(`Error: ${error.message}`, 'error');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteProducto(id, token);
      showSnackbar('Producto eliminado correctamente', 'success');
      await fetchProductos();
    } catch (error) {
      if (error.response && error.response.status === 404) {
        showSnackbar('El producto ya no existe', 'error');
      } else {
        showSnackbar(`Error al eliminar: ${error.message}`, 'error');
      }
    } finally {
      setDeleteConfirm({ open: false, id: null });
    }
  };

  const resetForm = () => {
    setForm({ id: null, nombre: '', descripcion: '', cantidad: '' });
    setErrors({});
    setTouched({});
    setIsEditMode(false);
  };

  const handleEdit = (producto) => {
    setForm({
      id: producto.id,
      nombre: producto.nombre,
      descripcion: producto.descripcion || '',
      cantidad: producto.cantidad.toString()
    });
    setErrors({});
    setTouched({});
    setIsEditMode(true);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setTimeout(resetForm, 300);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Gestión de Productos
        </Typography>
        <Button
          variant="contained"
          onClick={() => setOpenDialog(true)}
          sx={{ borderRadius: 2 }}
        >
          Agregar Producto
        </Button>
      </Box>

      <ProductTable
        productos={productos}
        loading={loading}
        onEdit={handleEdit}
        onDelete={(id) => setDeleteConfirm({ open: true, id })}
      />

      <DeleteConfirmationDialog
        open={deleteConfirm.open}
        onClose={() => setDeleteConfirm({ open: false, id: null })}
        onConfirm={() => handleDelete(deleteConfirm.id)}
      />

      <ProductDialog
        open={openDialog}
        onClose={handleDialogClose}
        isEditMode={isEditMode}
        form={form}
        errors={errors}
        submitting={submitting}
        isFormValid={isFormValid()}
        handleFormChange={handleFormChange}
        handleBlur={handleBlur}
        handleCreateOrUpdate={handleCreateOrUpdate}
      />
    </Container>
  );
};

export default ProductosPage;