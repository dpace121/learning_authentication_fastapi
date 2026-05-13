import { Component } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
// 1. Import your custom button component
import GoogleLoginButton from './GoogleLoginButton'; 
import './Login.css'

class Login extends Component  {
  constructor(props){
    super(props);
    this.state = {
      formData: {email:'', password: ''},
      loading: false,
      error: '',
    };
  }

  handleLogin = async (e) => {
    e.preventDefault();
    this.setState({loading: true, error:''})
    try {
      // Note: Ensure  FastAPI endpoint is /login
      const response = await axios.post('http://localhost:8000/login', this.state.formData);
      localStorage.setItem('token', response.data.access_token);
      this.props.navigate('/dashboard');
    } catch (err) {
        this.setState({error: err.response?.data?.detail || 'Login failed. Please try again'});
    }finally{
      this.setState({loading: false});
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState(prev => ({
      formData: { ...prev.formData, [name]: value},
      error: '',
    }))
  };

  render(){
    const {loading, error, formData} = this.state;
    return(
    <div className="auth-container">
      <h2>Login</h2>
      {error && <div className='error-message'>{error}</div>}
      <form onSubmit={this.handleLogin}>
        <input 
          name="email" 
          type="email" 
          placeholder="Email" 
          value = {formData.email}
          onChange={this.handleChange}
          disabled={loading} 
          required 
        />
        <input 
          name="password" 
          type="password" 
          placeholder="Password" 
          value={formData.password}
          onChange={this.handleChange} 
          disabled = {loading}
          required 
        />
        <button type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
      </form>

      <div className="divider">OR</div>

      {/* 2. Use the component here instead of a raw <button> */}
      <GoogleLoginButton />
      <div className="auth-footer">
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
    </div>
  );
};
}

// Wrapper component for navigate hook
const LoginWithNavigate = (props) => {
  const navigate = useNavigate();

  return <Login {...props} navigate={navigate} />;
};

export default LoginWithNavigate;