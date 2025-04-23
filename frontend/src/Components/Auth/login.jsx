import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../Services/authService';
import './LoginSignup.css';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { user } = await login({
        username: formData.username,
        password: formData.password,
      });

      console.log('Navigating with user role:', user.role);

      switch (user.role) {
        case 'ROLE_ADMIN':
          navigate('/Admin/Dashboard');
          break;
        case 'ROLE_EMPLOYEE':
        case 'ROLE_USER':
          navigate('/UserDashboard');
          break;
        default:
          console.error('Unexpected role:', user.role);
          throw new Error('Invalid user role');
      }
    } catch (err) {
      console.error('Login error caught:', err);
      setError(
        err === 'Invalid username or password' ||
        err === 'Username and password are required for login'
          ? 'Invalid username or password'
          : err === 'Invalid user role'
          ? 'Unauthorized role'
          : err || 'An error occurred. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-form">
        <h2>Sign in</h2>
        <form onSubmit={handleSubmit}>
          <label className="auth-input-label">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            className="auth-input"
            value={formData.username}
            onChange={handleChange}
            required
            disabled={loading}
          />

          <label className="auth-input-label">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            className="auth-input"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
          />

          {error && <p className="auth-error">{error}</p>}

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="auth-toggle-container">
          <p>
            Don't have an account?{' '}
            <span className="auth-link" onClick={() => navigate('/signup')}>
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;