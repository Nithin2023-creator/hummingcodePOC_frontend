// components/Dashboard.jsx
import React from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Avatar,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Logout,
  AccountCircle,
  Dashboard as DashboardIcon,
  Settings,
  Notifications
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <DashboardIcon sx={{ mr: 1 }} />
            FastAPI + React App
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Notifications">
              <IconButton color="inherit">
                <Notifications />
              </IconButton>
            </Tooltip>
            <Tooltip title="Settings">
              <IconButton color="inherit">
                <Settings />
              </IconButton>
            </Tooltip>
            <Tooltip title="Profile">
              <IconButton color="inherit">
                <AccountCircle />
              </IconButton>
            </Tooltip>
            <Button 
              color="inherit" 
              onClick={handleLogout} 
              startIcon={<Logout />}
              sx={{ ml: 1 }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      
      <Container sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Dashboard
          </Typography>
          <Typography color="text.secondary">
            Welcome to your dashboard. You are now authenticated!
          </Typography>
        </Box>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ backgroundColor: 'primary.main', mr: 2 }}>
                    <AccountCircle />
                  </Avatar>
                  <Typography variant="h6">Profile Overview</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Your profile information is shown here. You can update your profile details in the settings.
                </Typography>
                <Button 
                  variant="outlined" 
                  size="small"
                  sx={{ 
                    borderRadius: '8px',
                    backdropFilter: 'blur(10px)',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    '&:hover': {
                      borderColor: 'rgba(255, 255, 255, 0.4)',
                    }
                  }}
                >
                  View Profile
                </Button>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ backgroundColor: 'secondary.main', mr: 2 }}>
                    <Settings />
                  </Avatar>
                  <Typography variant="h6">Account Settings</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Manage your account settings, security preferences, and notification configurations.
                </Typography>
                <Button 
                  variant="outlined" 
                  size="small"
                  sx={{ 
                    borderRadius: '8px',
                    backdropFilter: 'blur(10px)',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    '&:hover': {
                      borderColor: 'rgba(255, 255, 255, 0.4)',
                    }
                  }}
                >
                  Settings
                </Button>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ background: 'linear-gradient(45deg, #8a85ff, #a755f7)', mr: 2 }}>
                    <Notifications />
                  </Avatar>
                  <Typography variant="h6">Notifications</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  You have no new notifications. All your activity updates will appear here.
                </Typography>
                <Button 
                  variant="outlined" 
                  size="small" 
                  sx={{ 
                    borderRadius: '8px',
                    backdropFilter: 'blur(10px)',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    '&:hover': {
                      borderColor: 'rgba(255, 255, 255, 0.4)',
                    }
                  }}
                >
                  View All
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;