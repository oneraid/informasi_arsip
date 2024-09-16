import React, { useState, useEffect } from 'react';
import PeminjamanModal from '../Modal/ArsipModal';
import SuccessModal from '../Modal/SuccessModal'; // Import the SuccessModal
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
  const [noTelp, setNoTelp] = useState<string>('');
  const [keperluan, setKeperluan] = useState<string>('');
  const [tanggalPinjam, setTanggalPinjam] = useState<string>('');
  const [tanggalKembali, setTanggalKembali] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false); // Status loading

  useEffect(() => {
    // Mengatur tanggal kembali otomatis dengan tanggal hari ini
    const today = new Date().toISOString().split('T')[0];
    setTanggalPinjam(today);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    console.log('Submitting form...');

    if (loading) {
      console.log('Form already in submission process');
      return;
    }

    setLoading(true);
    try {
      const peminjamanData = {
        nama,
        email,
        no_telp: noTelp,
        keperluan,
        tanggal_pinjam: tanggalPinjam,
        tanggal_kembali: tanggalKembali,
        status: 'Pending',
        arsip_ids: selectedItems.map((item) => item.id),
      };

      const response = await storeAndExportPeminjaman(peminjamanData);

      if (response instanceof Blob) {
        const url = window.URL.createObjectURL(response);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `peminjaman_${nama}.docx`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      } else {
        console.error('Unexpected response format:', response);
      }

      onSubmitSuccess();
      setIsSuccessModalOpen(true);
    } catch (error) {
      // Show success modal
      window.location.reload();
      console.error('Error submitting peminjaman:', error);
    } finally {
      console.log('Submit process complete');
      setLoading(false); // Set loading to false setelah proses selesai
    }
  };

  const handleSelectItems = (items: any[]) => {
    setSelectedItems(items);
  };

  const handleDeleteItem = (indexToDelete: number) => {
    setSelectedItems((prevItems) =>
      prevItems.filter((_, index) => index !== indexToDelete),
    );
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h2 className="text-xl font-bold mb-4 text-black dark:text-white">
        Formulir Peminjaman
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Form Inputs */}
        <div className="mb-4">
          <label htmlFor="nama" className="block text-sm font-medium mb-2">
            Nama
          </label>
          <input
            type="text"
            id="nama"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="w-full rounded border-[1.5px] border-stone-500 bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
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
            className="w-full rounded border-[1.5px] border-stone-500 bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
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
            className="w-full rounded border-[1.5px] order-stone-500 bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="keperluan" className="block text-sm font-medium mb-2">
            Keperluan
          </label>
          <input
            type="text"
            id="keperluan"
            value={keperluan}
            onChange={(e) => setKeperluan(e.target.value)}
            className="w-full rounded border-[1.5px] border-stone-500 bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
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
            className="w-full rounded border-[1.5px] border-stone-500 bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
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
            className="w-full rounded border-[1.5px] border-stone-500 bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="tanggal_kembali"
            className="block text-sm font-medium mb-2"
          >
            Pilih Arsip
          </label>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="rounded-lg relative w-36 h-10 cursor-pointer flex items-center border border-green-500 bg-green-500 group hover:bg-green-500 active:bg-green-500 active:border-green-500"
          >
            <span className="text-gray-200 font-semibold ml-8 transform group-hover:translate-x-20 transition-all duration-300 text-white">
              Add Item
            </span>
            <span className="text-black absolute right-0 h-full w-10 rounded-lg bg-green-500 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
              <svg
                className="svg w-8 text-white "
                fill="none"
                height="24"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="12" x2="12" y1="5" y2="19"></line>
                <line x1="5" x2="19" y1="12" y2="12"></line>
              </svg>
            </span>
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
                      Bidang
                    </th>
                    <th className="px-4 py-2 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Jenis Arsip
                    </th>
                    <th className="px-4 py-2 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nomer Arsip
                    </th>
                    <th className="px-4 py-2 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bulan
                    </th>
                    <th className="px-4 py-2 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tahun
                    </th>
                    <th className="px-4 py-2 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-black ">
                  {selectedItems.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 border-b text-sm text-gray-700">
                        {item.no_rak}
                      </td>
                      <td className="px-4 py-2 border-b text-sm text-gray-700">
                        {item.no_box}
                      </td>
                      <td className="px-4 py-2 border-b text-sm text-gray-700">
                        {item.bidang}
                      </td>
                      <td className="px-4 py-2 border-b text-sm text-gray-700">
                        {item.jenis_arsip}
                      </td>
                      <td className="px-4 py-2 border-b text-sm text-gray-700">
                        {item.no_arsip}
                      </td>
                      <td className="px-4 py-2 border-b text-sm text-gray-700">
                        {item.bulan}
                      </td>
                      <td className="px-4 py-2 border-b text-sm text-gray-700">
                        {item.tahun}
                      </td>
                      <td className="px-4 py-2 border-b text-sm text-gray-700">
                        <button
                          type="button"
                          className="text-red-500"
                          onClick={() => handleDeleteItem(index)}
                        >
                          &times;
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-4 mb-6 flex justify-end space-x-4">
          <button
            type="submit"
            className={`px-6 py-2 rounded-md ${
              loading || selectedItems.length === 0
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed' // Styles for disabled state
                : 'bg-green-500 text-white hover:bg-green-600 active:bg-green-700' // Styles for enabled state
            }`}
            disabled={loading || selectedItems.length === 0}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>

      <PeminjamanModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onSelectItems={handleSelectItems}
      />

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        message="Peminjaman berhasil diproess dan file telah diunduh."
      />
    </div>
  );
};

export default PeminjamanForm;
