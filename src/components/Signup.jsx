// components/Signup.jsx
import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Container,
  Divider,
  Alert,
  InputAdornment,
  IconButton,
  CircularProgress
} from '@mui/material';
import { Visibility, VisibilityOff, PersonAdd } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, error } = useAuth();
  const navigate = useNavigate();

  const validatePassword = () => {
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword()) return;
    
    setLoading(true);
    const success = await signup(username, email, password);
    setLoading(false);
    
    if (success) {
      navigate('/login');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Card sx={{ width: '100%', maxWidth: 450, my: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
              Create Account
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Sign up to get started
            </Typography>
          </Box>
          
          {(error || passwordError) && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error || passwordError}
            </Alert>
          )}
          
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  backdropFilter: 'blur(10px)',
                  backgroundColor: 'rgba(45, 45, 45, 0.4)'
                }
              }}
            />
            
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  backdropFilter: 'blur(10px)',
                  backgroundColor: 'rgba(45, 45, 45, 0.4)'
                }
              }}
            />
            
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              margin="normal"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  backdropFilter: 'blur(10px)',
                  backgroundColor: 'rgba(45, 45, 45, 0.4)'
                }
              }}
            />
            
            <TextField
              fullWidth
              label="Confirm Password"
              variant="outlined"
              margin="normal"
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              onBlur={validatePassword}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  backdropFilter: 'blur(10px)',
                  backgroundColor: 'rgba(45, 45, 45, 0.4)'
                }
              }}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ 
                mt: 3, 
                mb: 2,
                borderRadius: '8px',
                py: 1.5,
                background: 'linear-gradient(90deg, #8a85ff 0%, #a755f7 100%)',
                '&:hover': {
                  background: 'linear-gradient(90deg, #a755f7 0%, #8a85ff 100%)',
                }
              }}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <PersonAdd />}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Button>
            
            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="text.secondary">
                OR
              </Typography>
            </Divider>
            
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2">
                Already have an account?{' '}
                <Link to="/login" style={{ color: '#8a85ff', textDecoration: 'none' }}>
                  Log in
                </Link>
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Signup;