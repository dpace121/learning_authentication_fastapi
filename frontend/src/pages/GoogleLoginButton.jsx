// GoogleLoginButton.js
import React from 'react';

const GoogleLoginButton = () => {
  const handleLogin = () => {
    // Redirect the browser to the FastAPI route
    window.location.href = "http://localhost:8000/auth/google/login";
  };

  return (
    <button onClick={handleLogin} className="google-btn">
      Sign in with Google
    </button>
  );
};

export default GoogleLoginButton;