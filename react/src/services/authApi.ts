// react\src\services\authApi.ts

import axios from 'axios';

const API_URL_AUTH = 'http://127.0.0.1:8000/api';

export interface SignupData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export const signup = async (data: SignupData) => {
  const response = await axios.post(`${API_URL_AUTH}/register`, data);
  return response.data;
};

export interface LoginData {
  email: string;
  password: string;
}

export const login = async (data: LoginData) => {
  try {
    const response = await axios.post(`${API_URL_AUTH}/login`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { token, name } = response.data;
    localStorage.setItem('userToken', token);
    localStorage.setItem('userName', name);
    return response.data;
  } catch (error) {
    throw (error as any).response
      ? (error as any).response.data
      : new Error('Login failed');
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(
      `${API_URL_AUTH}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          'Content-Type': 'application/json',
        },
      },
    );
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
    return response.data;
  } catch (error) {
    throw (error as any).response
      ? (error as any).response.data
      : new Error('Logout failed');
  }
};
