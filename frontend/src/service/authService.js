// services/authService.js
import axios from 'axios';

const API_URL = 'https://mern-yap-backend.onrender.com/api/users'; // adjust to your backend URL

export const login = async (email, password) => {
  try {
    const res = await axios.post('https://mern-yap-backend.onrender.com/api/users/login', { email, password });

    // Save to localStorage
    localStorage.setItem('user', JSON.stringify(res.data));
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Login failed');
  }
};

export const signup = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/signup`, { email, password });
    localStorage.setItem('user', JSON.stringify(res.data));
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Signup failed');
  }
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};
