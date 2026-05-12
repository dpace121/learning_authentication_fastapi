import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; //Import this

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
 

  useEffect(() => {
    // 1. Check if there's a token in the URL (Google Login Callback)
    const params = new URLSearchParams(location.search);
    const urlToken = params.get('token');

    if (urlToken) {
      // Save the token from Google login
      localStorage.setItem('token', urlToken);
      // Clean the URL so the token isn't visible in the address bar
      navigate('/dashboard', { replace: true });
    }

    // 2. Check if the token exists in localStorage (Normal or Google Login)
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate, location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <div style={{ background: '#f0f2f5', padding: '30px', borderRadius: '15px', maxWidth: '500px', margin: '0 auto' }}>
        <h1>Welcome to your dashboard</h1>
        <p>You have successfully logged in.</p>
        
        <button 
          onClick={handleLogout}
          style={{ 
            marginTop: '20px', 
            padding: '10px 20px', 
            backgroundColor: '#ff4d4f', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;