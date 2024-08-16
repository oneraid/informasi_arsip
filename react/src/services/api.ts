import axios from 'axios';
import { Keuangan, TataUsaha } from '../types/arsip';

// Base URLs for the API endpoints
const API_URL_KEUANGAN = 'http://127.0.0.1:8000/api/keuangan';
const API_URL_TU = 'http://localhost:8000/api/tatausaha';
const API_URL_PEMINJAMAN = 'http://localhost:8000/api/peminjaman';

// KEUANGAN---------------------------------------------------------------------
export const getKeuangan = () => axios.get<Keuangan[]>(API_URL_KEUANGAN);

export const createKeuangan = async (data: Omit<Keuangan, 'id'>) => {
  try {
    const response = await axios.post<Keuangan>(API_URL_KEUANGAN, data);
    return response.data;
  } catch (error) {
    console.error('Error creating Keuangan:', error);
    throw error;
  }
};

export const getKeuanganById = (id: number) =>
  axios.get<Keuangan>(`${API_URL_KEUANGAN}/${id}`);

export const updateKeuangan = (
  id: number,
  data: Partial<Omit<Keuangan, 'id'>>,
) => axios.put<Keuangan>(`${API_URL_KEUANGAN}/${id}`, data);

export const deleteKeuangan = (id: number) =>
  axios.delete(`${API_URL_KEUANGAN}/${id}`);
// END OF KEUANGAN--------------------------------------------------------------

// TATA USAHA-------------------------------------------------------------------
export const getTataUsaha = () => axios.get<TataUsaha[]>(API_URL_TU);
export const createTataUsaha = async (data: Omit<TataUsaha, 'id'>) => {
  try {
    const response = await axios.post<TataUsaha>(API_URL_TU, data);
    return response.data;
  } catch (error) {
    console.error('Error creating TataUsaha:', error);
    throw error;
  }
};

export const getTataUsahaById = (id: number) =>
  axios.get<TataUsaha>(`${API_URL_TU}/${id}`);

export const updateTataUsaha = (
  id: number,
  data: Partial<Omit<TataUsaha, 'id'>>,
) => axios.put<TataUsaha>(`${API_URL_TU}/${id}`, data);

export const deleteTataUsaha = (id: number) =>
  axios.delete(`${API_URL_TU}/${id}`);
// END OF TATA USAHA------------------------------------------------------------

// PEMINJAMAN-------------------------------------------------------------------
export const fetchPeminjaman = async () => {
  return await axios.get(`${API_URL_PEMINJAMAN}`);
};
export const fetchArsip = async () => {
  return await axios.get(`${API_URL_PEMINJAMAN}`);
};

export const createPeminjaman = async (peminjamanData: any) => {
  return await axios.post(`${API_URL_PEMINJAMAN}`, peminjamanData);
};

export const updatePeminjaman = async (id: number, peminjamanData: any) => {
  return await axios.put(`${API_URL_PEMINJAMAN}/${id}`, peminjamanData);
};

export const fetchPeminjamanDetail = async (id: number) => {
  return await axios.get(`${API_URL_PEMINJAMAN}/${id}`);
};
// END OF PEMINJAMAN------------------------------------------------------------
