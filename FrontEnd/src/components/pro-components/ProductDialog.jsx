import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, CircularProgress } from '@mui/material';

const ProductDialog = ({
  open,
  onClose,
  isEditMode,
  form,
  errors,
  submitting,
  isFormValid,
  handleFormChange,
  handleBlur,
  handleCreateOrUpdate
}) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        {isEditMode ? 'Editar Producto' : 'Agregar Nuevo Producto'}
      </DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            autoFocus
            margin="dense"
            name="nombre"
            label="Nombre del producto"
            fullWidth
            value={form.nombre}
            onChange={handleFormChange}
            onBlur={handleBlur}
            error={!!errors.nombre}
            helperText={errors.nombre || " "}
            disabled={submitting}
          />
          <TextField
            margin="dense"
            name="descripcion"
            label="Descripción"
            fullWidth
            multiline
            rows={3}
            value={form.descripcion}
            onChange={handleFormChange}
            onBlur={handleBlur}
            error={!!errors.descripcion}
            helperText={errors.descripcion || `${form.descripcion.length}/500 caracteres`}
            disabled={submitting}
          />
          <TextField
            margin="dense"
            name="cantidad"
            label="Cantidad en stock"
            type="number"
            fullWidth
            value={form.cantidad}
            onChange={handleFormChange}
            onBlur={handleBlur}
            error={!!errors.cantidad}
            helperText={errors.cantidad || " "}
            disabled={submitting}
            inputProps={{ 
              min: 0,
              max: 1000000,
              step: 1
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={onClose}
          disabled={submitting}
        >
          Cancelar
        </Button>
        <Button 
          onClick={handleCreateOrUpdate}
          variant="contained"
          disabled={submitting || !isFormValid}
        >
          {submitting ? (
            <CircularProgress size={24} />
          ) : isEditMode ? (
            'Guardar Cambios'
          ) : (
            'Crear Producto'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDialog;