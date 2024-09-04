import axios from 'axios';
import { Arsip, Peminjaman } from '../types/arsip';

const API_URL_ARSIP = 'http://127.0.0.1:8000/api/arsip';
const API_URL_PEMINJAMAN = 'http://127.0.0.1:8000/api/peminjaman';

export const getArsip = () => axios.get<Arsip[]>(API_URL_ARSIP);

export const createArsip = async (arsip: Omit<Arsip, 'id'>): Promise<Arsip> => {
  const response = await axios.post(API_URL_ARSIP, arsip);
  return response.data;
};

export const getArsipById = async (id: number): Promise<Arsip> => {
  const response = await axios.get(`${API_URL_ARSIP}/${id}`);
  return response.data;
};

export const updateArsip = async (
  id: number,
  arsip: Partial<Arsip>,
): Promise<Arsip> => {
  try {
    const response = await axios.put(`${API_URL_ARSIP}/${id}`, arsip);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update arsip');
  }
};
export const deleteArsip = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL_ARSIP}/${id}`);
};

//--------------------Peminjaman---------------------

export const getPeminjaman = async () => {
  const response = await axios.get<Peminjaman[]>(API_URL_PEMINJAMAN);
  return response.data;
};

export const getPeminjamanById = async (id: number) => {
  const response = await axios.get<Peminjaman>(`${API_URL_PEMINJAMAN}/${id}`);
  return response.data;
};

export const createPeminjaman = async (data: Partial<Peminjaman>) => {
  const response = await axios.post<Peminjaman>(API_URL_PEMINJAMAN, data);
  return response.data;
};

export const updatePeminjaman = async (
  id: number,
  data: Partial<Peminjaman>,
) => {
  const response = await axios.put<Peminjaman>(
    `${API_URL_PEMINJAMAN}/${id}`,
    data,
  );
  return response.data;
};

export const deletePeminjaman = async (id: number) => {
  const response = await axios.delete(`${API_URL_PEMINJAMAN}/${id}`);
  return response.data;
};

export const storeAndExportPeminjaman = async (data: any) => {
  try {
    const response = await axios.post(`${API_URL_PEMINJAMAN}/export`, data, {
      responseType: 'blob', // Untuk menghandle file Blob seperti .docx
    });
    return response.data;
  } catch (error) {
    console.error('Error in API request:', error);
    throw error;
  }
};
