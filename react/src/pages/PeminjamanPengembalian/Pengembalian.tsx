import React from 'react';
import Selesaiform from '../../components/Peminjaman/SelesaiPeminjaman';
import Pengembalian from '../../components/Peminjaman/Pengembalian';

const Peminjaman: React.FC = () => {
  return (
    <div>
      <div>
        <h1>Manajemen Pengembalian</h1>
        <Pengembalian />
      </div>
      <div>
        <Selesaiform />
      </div>
    </div>
  );
};

export default Peminjaman;
