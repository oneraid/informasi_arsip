import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { getArsip } from '../../services/arsipApi'; // Pastikan Anda sudah memiliki API untuk mendapatkan arsip

Modal.setAppElement('#root');

interface ArsipModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSelectItems: (items: any[]) => void;
}

const ArsipModal: React.FC<ArsipModalProps> = ({
  isOpen,
  onRequestClose,
  onSelectItems,
}) => {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [noRakFilter, setNoRakFilter] = useState<string>('');
  const [bulanFilter, setBulanFilter] = useState<string>('');
  const [tahunFilter, setTahunFilter] = useState<string>('');
  const [jenisArsipFilter, setJenisArsipFilter] = useState<string>('');
  const [bidangFilter, setBidangFilter] = useState<string>(''); // Tambahkan filter bidang
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  const bidangOptions = ['Keuangan', 'Tata Usaha', 'SDM', 'IT', 'Pemasaran']; // Opsi bidang

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getArsip();
        if (response && response.data) {
          setData(response.data);
          setFilteredData(response.data); // Initialize filtered data
        } else {
          throw new Error('No data found');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const lowerNoRak = noRakFilter.toLowerCase();
    const lowerBulan = bulanFilter.toLowerCase();
    const lowerTahun = tahunFilter.toLowerCase();
    const lowerJenisArsip = jenisArsipFilter.toLowerCase();
    const lowerBidang = bidangFilter.toLowerCase();

    const newFilteredData = data.filter((item) => {
      const matchesNoRak = item.no_rak
        ?.toString()
        .toLowerCase()
        .includes(lowerNoRak);
      const matchesBulan = item.bulan
        ?.toString()
        .toLowerCase()
        .includes(lowerBulan);
      const matchesTahun = item.tahun
        ?.toString()
        .toLowerCase()
        .includes(lowerTahun);
      const matchesJenisArsip = item.jenis_arsip
        ?.toString()
        .toLowerCase()
        .includes(lowerJenisArsip);
      const matchesBidang = item.bidang
        ?.toString()
        .toLowerCase()
        .includes(lowerBidang);

      return (
        matchesNoRak &&
        matchesBulan &&
        matchesTahun &&
        matchesJenisArsip &&
        matchesBidang
      );
    });

    setFilteredData(newFilteredData);
  }, [
    noRakFilter,
    bulanFilter,
    tahunFilter,
    jenisArsipFilter,
    bidangFilter,
    data,
  ]);

  const handleSelectItem = (item: any) => {
    setSelectedItems((prevItems) =>
      prevItems.some((i) => i.id === item.id)
        ? prevItems.filter((i) => i.id !== item.id)
        : [...prevItems, item],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItems.length === 0) {
      alert('Pilih arsip terlebih dahulu.');
      return;
    }

    if (onSelectItems) {
      onSelectItems(selectedItems);
    }
    onRequestClose();
  };

  const renderTable = () => {
    if (filteredData.length === 0) return <p>No data available</p>;

    const headers = Object.keys(filteredData[0]).filter(
      (key) => key !== 'id' && key !== 'created_at' && key !== 'updated_at',
    );

    return (
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Select
              </th>
              {headers.map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header.replace(/_/g, ' ')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <input
                    type="checkbox"
                    checked={selectedItems.some((i) => i.id === item.id)}
                    onChange={() => handleSelectItem(item)}
                    disabled={item.status === 'Tidak Tersedia'}
                  />
                </td>
                {headers.map((header) => (
                  <td
                    key={header}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {item[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Arsip Modal"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
    >
      <div
        className="bg-white p-4 md:p-8 rounded-lg shadow-lg z-50 w-full max-w-md md:max-w-3xl lg:max-w-5xl relative"
        style={{ right: '-6%' }}
      >
        <button
          onClick={onRequestClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <h2 className="text-lg md:text-2xl font-bold mb-4">Arsip Modal</h2>

        <div className="flex flex-wrap sm:flex-nowrap space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
          <input
            type="text"
            placeholder="No Rak"
            value={noRakFilter}
            onChange={(e) => setNoRakFilter(e.target.value)}
            className="border border-gray-300 rounded-md p-1 md:p-2 w-1/2 sm:w-auto flex-grow"
          />
          <input
            type="text"
            placeholder="Bulan"
            value={bulanFilter}
            onChange={(e) => setBulanFilter(e.target.value)}
            className="border border-gray-300 rounded-md p-1 md:p-2 w-1/2 sm:w-auto flex-grow"
          />
          <input
            type="text"
            placeholder="Tahun"
            value={tahunFilter}
            onChange={(e) => setTahunFilter(e.target.value)}
            className="border border-gray-300 rounded-md p-1 md:p-2 w-1/2 sm:w-auto flex-grow"
          />
          <input
            type="text"
            placeholder="Jenis Arsip"
            value={jenisArsipFilter}
            onChange={(e) => setJenisArsipFilter(e.target.value)}
            className="border border-gray-300 rounded-md p-1 md:p-2 w-1/2 sm:w-auto flex-grow"
          />
          <select
            value={bidangFilter}
            onChange={(e) => setBidangFilter(e.target.value)}
            className="border border-gray-300 rounded-md p-1 md:p-2 w-1/2 sm:w-auto flex-grow"
          >
            <option value="">Pilih Bidang</option>
            {bidangOptions.map((bidang) => (
              <option key={bidang} value={bidang}>
                {bidang}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="overflow-x-auto max-h-80">{renderTable()}</div>
        )}

        <div className="mt-4 flex justify-end space-x-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={onRequestClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ArsipModal;
