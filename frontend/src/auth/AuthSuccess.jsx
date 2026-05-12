import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem('token', token);
      navigate('/dashboard'); // Redirect Google users straight to dashboard
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return <div>Loading your profile...</div>;
};

export default AuthSuccess