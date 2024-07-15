import React, { useState } from 'react';
import { TextField, Button, Link, Typography, Container, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue, grey } from '@mui/material/colors';
import axios from 'axios';




const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

const SignupPage = () => {


  const initialFormState = {
    username: '',
    password: '',
    confirmPassword: '',
    email: ''
  };

  const initialErrorState = {
    username: '',
    password: '',
    confirmPassword: '',
    email: ''
  };
  
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState(initialErrorState);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));

    // Clear confirmPassword error when passwords match
    if (name === 'password' || name === 'confirmPassword') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: form.password === value ? '' : prevErrors.confirmPassword
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    const newErrors = {
      username: '',
      password: '',
      confirmPassword: '',
      email: ''
    };

    if (!form.username.trim()) {
      newErrors.username = 'Username is required';
      valid = false;
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    if (!form.password.trim()) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    if (!form.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Confirm Password is required';
      valid = false;
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post('https://mychatmor.azurewebsites.net/api/Auth/register', {
        name: form.username,
        email: form.email,
        password: form.password,
      });

      // Assume successful registration leads to login page
      window.location.href = '/login';
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle error states or display error messages as needed
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        minHeight: '100vh',
        backgroundColor: grey[100],
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Container maxWidth="xs">
          <Box 
            component="form" 
            onSubmit={handleSubmit} 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              bgcolor: 'white',
              p: 4,
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <Typography 
              variant="h4" 
              component="h1" 
              gutterBottom 
              sx={{ fontWeight: 'bold', color: blue[500] }}
            >
              Signup
            </Typography>
            <TextField
              label="Username"
              name="username"
              variant="outlined"
              margin="normal"
              fullWidth
              value={form.username}
              onChange={handleChange}
              InputLabelProps={{ style: { color: grey[700] } }}
              InputProps={{
                style: { color: grey[800] },
              }}
              error={!!errors.username}
              helperText={errors.username}
            />
            <TextField
              label="Email"
              name="email"
              variant="outlined"
              margin="normal"
              fullWidth
              value={form.email}
              onChange={handleChange}
              InputLabelProps={{ style: { color: grey[700] } }}
              InputProps={{
                style: { color: grey[800] },
              }}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              margin="normal"
              fullWidth
              value={form.password}
              onChange={handleChange}
              InputLabelProps={{ style: { color: grey[700] } }}
              InputProps={{
                style: { color: grey[800] },
              }}
              error={!!errors.password}
              helperText={errors.password}
            />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              variant="outlined"
              margin="normal"
              fullWidth
              value={form.confirmPassword}
              onChange={handleChange}
              InputLabelProps={{ style: { color: grey[700] } }}
              InputProps={{
                style: { color: grey[800] },
              }}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2, mb: 2, bgcolor: blue[500], color: '#FFFFFF' }}
            >
              Sign Up
            </Button>
            <Link href="/" variant="body2" sx={{ color: blue[500] }}>
              Already have an account? Sign in
            </Link>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default SignupPage;
