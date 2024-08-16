import React, { useEffect, useState } from 'react';
import { fetchPeminjaman } from '../../services/api';

interface Peminjaman {
  id: number;
  nama_peminjam: string;
  tanggal_pinjam: string;
  status: string;
}

const PeminjamanList: React.FC = () => {
  const [peminjaman, setPeminjaman] = useState<Peminjaman[]>([]);

  useEffect(() => {
    const getPeminjaman = async () => {
      try {
        const response = await fetchPeminjaman();
        setPeminjaman(response.data);
      } catch (error) {
        console.error('Error fetching peminjaman:', error);
      }
    };

    getPeminjaman();
  }, []);

  return (
    <div>
      <h1>Daftar Peminjaman</h1>
      <ul>
        {peminjaman.map((item) => (
          <li key={item.id}>
            {item.nama_peminjam} - {item.tanggal_pinjam} - {item.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PeminjamanList;
