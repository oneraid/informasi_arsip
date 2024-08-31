import React from 'react';
import PeminjamanForm from '../../components/Peminjaman/PeminjamanForm';
import Pengembalian from '../../components/Peminjaman/Pengembalian';

const Peminjaman: React.FC = () => {
  return (
    <div>
      <div>
        <h1>Manajemen Pengembalian</h1>
        <Pengembalian />
      </div>
    </div>
  );
};

export default Peminjaman;
