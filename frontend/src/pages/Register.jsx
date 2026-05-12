import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // 1. Added Link and useNavigate
import './Register.css'

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate(); // 2. Initialize the navigate hook

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/register', formData);
      alert("Registration successful!");
      navigate('/login'); // 3. Now this will work!
    } catch (err) {
      alert(err.response?.data?.detail || "Registration failed");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/auth/google/login";
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>
      <form onSubmit={handleRegister}>
        <input 
          type="text" 
          placeholder="Name" 
          onChange={e => setFormData({...formData, name: e.target.value})} 
          required 
        />
        <input 
          type="email" 
          placeholder="Email" 
          onChange={e => setFormData({...formData, email: e.target.value})} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          onChange={e => setFormData({...formData, password: e.target.value})} 
          required 
        />
        <button type="submit">Register</button>
      </form>

      <div className="divider">OR</div>

      <button onClick={handleGoogleLogin} className="google-btn">
        Sign up with Google
      </button>

      {/* 4. The "Go to Sign In" link you were looking for */}
      <div className="auth-footer" style={{ marginTop: '20px' }}>
        <p>Already have an account? <Link to="/login">Sign In</Link></p>
      </div>
    </div>
  );
};

export default Register;