import React, { useState, useContext, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  CircularProgress,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { AuthContext } from '../context/AuthContext.jsx';
import { api } from '../services/api.js';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });
  const { loginUser, showSnackbar } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  // Validar email
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'El email es requerido';
    if (!regex.test(email)) return 'Formato de email inválido';
    return '';
  };

  // Validar contraseña
  const validatePassword = (password) => {
    if (!password) return 'La contraseña es requerida';
    if (password.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
    return '';
  };

  // Validar formulario completo
  useEffect(() => {
    const isEmailValid = !validateEmail(email);
    const isPasswordValid = !validatePassword(password);
    setFormValid(isEmailValid && isPasswordValid);
  }, [email, password]);

  // Manejar cambios con validación
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (touched.email) {
      setEmailError(validateEmail(value));
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (touched.password) {
      setPasswordError(validatePassword(value));
    }
  };

  // Marcar campo como tocado al perder el foco
  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    
    if (field === 'email') {
      setEmailError(validateEmail(email));
    } else if (field === 'password') {
      setPasswordError(validatePassword(password));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Validar todos los campos antes de enviar
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);
    
    setEmailError(emailValidation);
    setPasswordError(passwordValidation);
    setTouched({ email: true, password: true });
    
    // Si hay errores, no continuar
    if (emailValidation || passwordValidation) {
      showSnackbar("Por favor, corrige los errores en el formulario", "error");
      return;
    }
    
    setLoading(true);
    try {
      const { token } = await api.login(email, password);
      loginUser({ email }, token);
      showSnackbar("Inicio de sesión exitoso.", "success");
    } catch (error) {
      // Manejo específico de errores de API
      if (error.response) {
        // El servidor respondió con un código de error
        if (error.response.status === 401) {
          showSnackbar("Credenciales inválidas. Por favor, verifica tu email y contraseña.", "error");
        } else if (error.response.status >= 500) {
          showSnackbar("Error del servidor. Por favor, intenta nuevamente más tarde.", "error");
        } else {
          showSnackbar(`Error: ${error.response.data.message || error.message}`, "error");
        }
      } else if (error.request) {
        // La petición fue hecha pero no se recibió respuesta
        showSnackbar("Error de conexión. Por favor, verifica tu conexión a internet.", "error");
      } else {
        // Otro tipo de error
        showSnackbar(`Error: ${error.message}`, "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleLogin}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleEmailChange}
            onBlur={() => handleBlur('email')}
            error={!!emailError}
            helperText={emailError}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
            onBlur={() => handleBlur('password')}
            error={!!passwordError}
            helperText={passwordError}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading || !formValid}
          >
            {loading ? <CircularProgress size={24} /> : 'Iniciar Sesión'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;