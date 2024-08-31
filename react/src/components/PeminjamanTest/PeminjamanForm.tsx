import React, { useState } from 'react';
import PeminjamanModal from '../Peminjaman/ArsipModal'; // Adjust the path according to your project structure
import { createPeminjaman } from '../../services/arsipApi';

interface PeminjamanFormProps {
  onSubmitSuccess: () => void;
}

const PeminjamanForm: React.FC<PeminjamanFormProps> = ({ onSubmitSuccess }) => {
  const [nama, setNama] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [noTelp, setNoTelp] = useState<string>(''); // Input for no_telp
  const [tanggalPinjam, setTanggalPinjam] = useState<string>(''); // Input for tanggal_pinjam
  const [tanggalKembali, setTanggalKembali] = useState<string>(''); // Input for tanggal_kembali
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const peminjamanData = {
        nama,
        email,
        no_telp: noTelp,
        tanggal_pinjam: tanggalPinjam,
        tanggal_kembali: tanggalKembali,
        status: 'Pending', // Set status to "Pending"
        arsip_ids: selectedItems.map((item) => item.id),
      };

      await createPeminjaman(peminjamanData);
      alert('Peminjaman berhasil dibuat.');
      onSubmitSuccess();
    } catch (error) {
      console.error('Error submitting peminjaman:', error);
      alert('Gagal membuat peminjaman.');
    }
  };

  const handleSelectItems = (items: any[]) => {
    setSelectedItems(items);
    setIsModalOpen(false);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Formulir Peminjaman</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nama" className="block text-sm font-medium mb-2">
            Nama
          </label>
          <input
            type="text"
            id="nama"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="no_telp" className="block text-sm font-medium mb-2">
            No. Telp
          </label>
          <input
            type="text"
            id="no_telp"
            value={noTelp}
            onChange={(e) => setNoTelp(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="tanggal_pinjam"
            className="block text-sm font-medium mb-2"
          >
            Tanggal Pinjam
          </label>
          <input
            type="date"
            id="tanggal_pinjam"
            value={tanggalPinjam}
            onChange={(e) => setTanggalPinjam(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="tanggal_kembali"
            className="block text-sm font-medium mb-2"
          >
            Tanggal Kembali
          </label>
          <input
            type="date"
            id="tanggal_kembali"
            value={tanggalKembali}
            onChange={(e) => setTanggalKembali(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Pilih Arsip
          </button>
        </div>

        {/* Display selected archives */}
        {selectedItems.length > 0 && (
          <div className="mb-4">
            <h3 className="text-md font-medium mb-2">Arsip Terpilih:</h3>
            <ul className="list-disc list-inside bg-gray-100 p-4 rounded-md">
              {selectedItems.map((item, index) => (
                <li key={index} className="text-sm">
                  <strong>Nama Arsip:</strong> {item.nama_arsip || '-'}
                  <br />
                  <strong>Deskripsi:</strong> {item.deskripsi || '-'}
                  <br />
                  <strong>No Rak:</strong> {item.no_rak || '-'}
                  <br />
                  <strong>Bulan:</strong> {item.bulan || '-'}
                  <br />
                  <strong>Tahun:</strong> {item.tahun || '-'}
                  <br />
                  <strong>Jenis Arsip:</strong> {item.jenis_arsip || '-'}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-4 flex justify-end space-x-4">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Submit
          </button>
        </div>
      </form>

      <PeminjamanModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onSelectItems={handleSelectItems}
      />
    </div>
  );
};

export default PeminjamanForm;
