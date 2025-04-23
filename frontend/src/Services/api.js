import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Adjust based on your backend URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add JWT token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor to handle 401 errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication APIs
export const register = (userData) => {
  return api.post('/auth/register', userData);
};

export const login = (credentials) => {
  return api.post('/auth/login', credentials);
};

// Admin APIs
export const addEmployee = (employeeData) => {
  return api.post('/admin/employees', employeeData);
};

export const getAllEmployees = () => {
  return api.get('/admin/employees');
};

export const updateEmployee = (id, employeeData) => {
  return api.put(`/admin/employees/${id}`, employeeData);
};

export const deleteEmployee = (id) => {
  return api.delete(`/admin/employees/${id}`);
};

// Employee APIs
export const getMyProfile = () => {
  return api.get('/employee/profile');
};

export const createProfile = (profileData) => {
  return api.post('/employee/profile', profileData);
};

export const updateMyProfile = (id, profileData) => {
  return api.put(`/employee/update/${id}`, profileData);
};

// Leave APIs
export const applyLeave = (leaveData) => {
  return api.post('/leaves/apply', leaveData);
};

export const getMyLeaves = () => {
  return api.get('/leaves/my');
};

export const getAllLeaves = () => {
  return api.get('/leaves');
};

export const updateLeave = (id, leaveData) => {
  return api.put(`/leaves/update/${id}`, leaveData);
};

export const deleteLeave = (id) => {
  return api.delete(`/leaves/${id}`);
};

export default api;