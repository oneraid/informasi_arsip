import React from 'react';
import PeminjamanList from '../../components/Peminjaman/PeminjamanList';
import PeminjamanForm from '../../components/Peminjaman/PeminjamanForm';

const Peminjaman: React.FC = () => {
  return (
    <div>
      <h1>Manajemen Peminjaman</h1>
      <PeminjamanForm />
      <PeminjamanList />
    </div>
  );
};

export default Peminjaman;
