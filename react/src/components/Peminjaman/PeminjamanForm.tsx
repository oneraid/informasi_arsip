import React, { useState } from 'react';
import PeminjamanModal from '../PeminjamanModal'; // Adjust path as needed

const Peminjaman: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div>
      <h1>Peminjaman Page</h1>
      <button onClick={() => setModalIsOpen(true)}>Open Modal</button>

      <PeminjamanModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      />
    </div>
  );
};

export default Peminjaman;
