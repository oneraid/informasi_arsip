import React from 'react';
import PeminjamanForm from '../../components/Peminjaman/PeminjamanForm';
import PeminjamanList from '../../components/Peminjaman/PeminjamanList';

const Peminjaman: React.FC = () => {
  return (
    <div>
      <div>
        <h1>Manajemen Peminjaman</h1>
        <PeminjamanForm />
      </div>
      <div>
        <PeminjamanList />
      </div>
    </div>
  );
};

export default Peminjaman;
