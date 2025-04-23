import { login as loginAPI, register as registerAPI } from './api';

// Define valid roles to match backend
const VALID_ROLES = ['ROLE_ADMIN', 'ROLE_EMPLOYEE', 'ROLE_USER'];

export const register = async (userData) => {
  try {
    const response = await registerAPI({
      username: userData.username,
      password: userData.password,
      email: userData.email,
      role: userData.role || 'ROLE_EMPLOYEE', // Default to ROLE_EMPLOYEE
    });
    return response.data;
  } catch (error) {
    console.error('Registration error:', error.response || error.message);
    throw error.response?.data?.message || error.message || 'Registration failed';
  }
};

export const login = async (credentials) => {
  try {
    console.log('Sending login request to backend:', credentials);
    const response = await loginAPI(credentials);
    console.log('Login success response:', response.data);

    const { token, user } = response.data;

    if (!token || !user) {
      console.error('Missing token or user in response');
      throw new Error('Invalid login response');
    }

    console.log('Received user.role:', user.role);
    console.log('Valid roles:', VALID_ROLES);

    if (!user.role || !VALID_ROLES.includes(user.role)) {
      console.error('Invalid or missing role:', user.role);
      throw new Error('Invalid user role');
    }

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    }));

    return { token, user };
  } catch (error) {
    console.error('Login error:', error.response || error.message);
    throw error.response?.data?.message || error.message || 'Login failed';
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export const getCurrentUser = () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && VALID_ROLES.includes(user.role)) {
      return user;
    }
    console.warn('Invalid or missing user in localStorage:', user);
    return null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

export const isAdmin = () => {
  const user = getCurrentUser();
  return user?.role === 'ROLE_ADMIN';
};

const authService = {
  login,
  register,
  logout,
  getToken,
  isAuthenticated,
  getCurrentUser,
  isAdmin,
};

export default authService;