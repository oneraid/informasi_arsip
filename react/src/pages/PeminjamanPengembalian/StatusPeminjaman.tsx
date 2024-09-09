import React from 'react';
import ApprovePeminjaman from '../../components/Peminjaman/ApprovePeminjaman';
import Pengembalian from '../../components/Peminjaman/Pengembalian';
import SelesaiPeminjaman from '../../components/Peminjaman/SelesaiPeminjaman';

const StatusPeminjaman: React.FC = () => {
  return (
    <div>
      <div>
        <h1>Manajemen Peminjaman</h1>
        <ApprovePeminjaman />
        <Pengembalian />
        <SelesaiPeminjaman />
      </div>
    </div>
  );
};

export default StatusPeminjaman;
