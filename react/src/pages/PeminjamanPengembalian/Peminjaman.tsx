import React, { useState } from 'react';
import PeminjamanForm from '../../components/Peminjaman/PeminjamanForm';
import PeminjamanList from '../../components/Peminjaman/PeminjamanList';

const Peminjaman: React.FC = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleFormSubmitSuccess = () => {
    // Lakukan aksi tertentu setelah sukses submit
    setIsFormSubmitted(true);
    alert('Peminjaman berhasil dibuat');
  };

  return (
    <div>
      <div>
        <h1>Manajemen Peminjaman</h1>
        <PeminjamanForm onSubmitSuccess={handleFormSubmitSuccess} />
      </div>
      <div>
        <PeminjamanList />
      </div>
    </div>
  );
};

export default Peminjaman;
