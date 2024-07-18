import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Assuming you're using React Router for navigation
import { TextField, Button, Link, Typography, Container, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue, grey } from '@mui/material/colors';
import axios from 'axios';




// Create a custom theme
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

const LoginPage = () => {
   
  const initialFormState = {
    username: '',
    password: '',
  };

  const initialErrorState = {
    username: '',
    password: '',
  };

  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState(initialErrorState);
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation
    let valid = true;
    const newErrors = {
      username: '',
      password: '',
    };

    if (!form.username.trim()) {
      newErrors.username = 'Username is required';
      valid = false;
    }

    if (!form.password.trim()) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    try {
      // Send login data to the backend
      const response = await axios.post("https://mychatmor.azurewebsites.net/api/Auth/login",{
        username:form.username,
        password:form.password
      });

      // Assuming the backend returns a JWT token upon successful login
    

      // Store the token in localStorage
      localStorage.setItem("myChatToken", response.data);
      //console.log("token",response.data);

      const mtoken = localStorage.getItem('myChatToken');
     console.log('mToken:', mtoken);

    //   // Redirect to dashboard or any other protected route after successful login
  
    //   history.push('/dashboard');
    window.location.href = '/mychatapp';
    } catch (error) {
      console.error('Login failed:', error);
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
              Login
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
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2, mb: 2, bgcolor: blue[500], color: '#FFFFFF' }}
            >
              Login
            </Button>
            <Link href="/signup" variant="body2" sx={{ color: blue[500] }}>
              Don't have an account? Sign up
            </Link>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default LoginPage;
