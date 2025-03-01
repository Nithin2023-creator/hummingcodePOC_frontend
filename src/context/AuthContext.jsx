// context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      // You would typically validate the token here
      // or fetch user data from the server
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      const response = await axios.post('https://hummingcode-backend-poc-yuzq.vercel.app/login', {
        email,
        password,
        username: email // Your API seems to require username even for login
      });
      
      const { access_token } = response.data;
      localStorage.setItem('token', access_token);
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed');
      return false;
    }
  };

  // In your signup function in AuthContext.jsx
const signup = async (username, email, password) => {
    try {
      setError(null);
      const response = await axios.post('https://hummingcode-backend-poc-yuzq.vercel.app/signup', {
        username,
        email,
        password
      });
      return true;
    } catch (err) {
      setError(err.response?.data?.detail || 'Signup failed');
      return false;
    }
  };
  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    signup,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};