import React, { useState } from 'react';
import PeminjamanModal from '../Peminjaman/ArsipModal'; // Adjust the path according to your project structure
import {
  createPeminjaman,
  storeAndExportPeminjaman,
} from '../../services/arsipApi';

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
        status: 'Pending',
        arsip_ids: selectedItems.map((item) => item.id),
      };

      // Make the API call to store the data and export to DOCX
      const response = await storeAndExportPeminjaman(peminjamanData);

      // Trigger the file download
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `peminjaman_${nama}.docx`);
      document.body.appendChild(link);
      link.click();

      alert('Peminjaman berhasil dibuat dan file diunduh.');
      onSubmitSuccess();
    } catch (error) {
      console.error('Error submitting peminjaman:', error);
    }
  };

  const handleSelectItems = (items: any[]) => {
    setSelectedItems(items);
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
            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto border border-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      No. Rak
                    </th>
                    <th className="px-4 py-2 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      No. Box
                    </th>
                    <th className="px-4 py-2 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Jenis Arsip
                    </th>
                    <th className="px-4 py-2 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bulan
                    </th>
                    <th className="px-4 py-2 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tahun
                    </th>
                    <th className="px-4 py-2 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nomer Arsip
                    </th>
                    <th className="px-4 py-2 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {selectedItems.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 border-b text-sm text-gray-700">
                        {item.no_rak}
                      </td>
                      <td className="px-4 py-2 border-b text-sm text-gray-700">
                        {item.no_box}
                      </td>
                      <td className="px-4 py-2 border-b text-sm text-gray-700">
                        {item.jenis_arsip}
                      </td>
                      <td className="px-4 py-2 border-b text-sm text-gray-700">
                        {item.bulan}
                      </td>
                      <td className="px-4 py-2 border-b text-sm text-gray-700">
                        {item.tahun}
                      </td>
                      <td className="px-4 py-2 border-b text-sm text-gray-700">
                        {item.no_arsip}
                      </td>
                      <td className="px-4 py-2 border-b text-sm text-gray-700">
                        {item.deskripsi}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
