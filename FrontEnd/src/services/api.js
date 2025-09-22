const API_URL = 'http://localhost:3000/api';

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(errorData || 'Ocurrió un error en la petición');
  }
  return response.json();
};

export const api = {
  login: async (email, password) => {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(response);
  },

  getProductos: async (token) => {
    const response = await fetch(`${API_URL}/productos`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return handleResponse(response);
  },

  createProducto: async (producto, token) => {
    const response = await fetch(`${API_URL}/productos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(producto),
    });
    return handleResponse(response);
  },

  updateProducto: async (id, producto, token) => {
    const response = await fetch(`${API_URL}/productos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(producto),
    });
    return handleResponse(response);
  },

  deleteProducto: async (id, token) => {
    const response = await fetch(`${API_URL}/productos/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || 'Ocurrió un error en la petición');
    }
    return response.json();
  }
};