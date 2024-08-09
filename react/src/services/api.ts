import axios from 'axios';
import { Keuangan } from '../types/arsip';

const API_URL = 'http://localhost:8000/api/keuangan'; // Sesuaikan URL sesuai dengan konfigurasi backend Anda

// Mendapatkan daftar keuangan
export const getKeuangan = () => axios.get<Keuangan[]>(API_URL);

// Menambahkan keuangan baru
export const createKeuangan = (data: Omit<Keuangan, 'id'>) =>
  axios.post(API_URL, data);

// Mendapatkan keuangan berdasarkan ID
export const getKeuanganById = (id: number) =>
  axios.get<Keuangan>(`${API_URL}/${id}`);

// Memperbarui keuangan berdasarkan ID
export const updateKeuangan = (
  id: number,
  data: Partial<Omit<Keuangan, 'id'>>,
) => axios.put(`${API_URL}/${id}`, data);

// Menghapus keuangan berdasarkan ID
export const deleteKeuangan = (id: number) => axios.delete(`${API_URL}/${id}`);
