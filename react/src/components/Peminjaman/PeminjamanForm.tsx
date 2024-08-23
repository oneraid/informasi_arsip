import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PeminjamanModal from '../PeminjamanModal';

const Peminjaman: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [nama, setNama] = useState('');
  const [noTelp, setNoTelp] = useState('');
  const [email, setEmail] = useState('');
  const [tanggalPinjam, setTanggalPinjam] = useState('');
  const [tanggalKembali, setTanggalKembali] = useState('');

  const history = useNavigate();

  const handleSelectItems = (items: any[]) => {
    setSelectedItems(items);
    setModalIsOpen(false);
  };

  const handleRemoveItem = (itemId: number) => {
    setSelectedItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemId),
    );
  };

  const handleSubmit = () => {
    const peminjamanData = {
      nama,
      noTelp,
      email,
      tanggalPinjam,
      tanggalKembali,
      items: selectedItems,
    };

    // Save peminjaman data to localStorage
    localStorage.setItem(
      'selectedPeminjamanItems',
      JSON.stringify(peminjamanData),
    );

    // Navigate to the approval page
    history('/approve-peminjaman');
  };

  return (
    <div>
      <h1>Peminjaman Page</h1>
      <button
        onClick={() => setModalIsOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Open Modal
      </button>

      <PeminjamanModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        onSelectItems={handleSelectItems}
      />

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Informasi Peminjaman</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            placeholder="Nama"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
          <input
            type="text"
            placeholder="No Telp"
            value={noTelp}
            onChange={(e) => setNoTelp(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
          <input
            type="date"
            placeholder="Tanggal Pinjam"
            value={tanggalPinjam}
            onChange={(e) => setTanggalPinjam(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
          <input
            type="date"
            placeholder="Tanggal Kembali"
            value={tanggalKembali}
            onChange={(e) => setTanggalKembali(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>

        <h2 className="text-xl font-bold mb-4">Selected Items</h2>
        {selectedItems.length === 0 ? (
          <p>No items selected</p>
        ) : (
          <>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    No Rak
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {selectedItems.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.no_rak}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={handleSubmit}
              className="mt-4 bg-green-500 text-black px-4 py-2 rounded-md hover:bg-green-600"
              disabled={selectedItems.length === 0}
            >
              Submit for Approval
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Peminjaman;
