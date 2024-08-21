// PeminjamanModal.tsx
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { getKeuangan, getTataUsaha } from '../services/api';

Modal.setAppElement('#root');

interface PeminjamanModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSelectItems: (items: any[]) => void;
}

const PeminjamanModal: React.FC<PeminjamanModalProps> = ({
  isOpen,
  onRequestClose,
  onSelectItems,
}) => {
  const [selectedTable, setSelectedTable] = useState<'keuangan' | 'tatausaha'>(
    'keuangan',
  );
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [noRakFilter, setNoRakFilter] = useState<string>('');
  const [bulanFilter, setBulanFilter] = useState<string>('');
  const [tahunFilter, setTahunFilter] = useState<string>('');
  const [jenisArsipFilter, setJenisArsipFilter] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response =
          selectedTable === 'keuangan'
            ? await getKeuangan()
            : await getTataUsaha();
        setData(response.data);
        setFilteredData(response.data); // Initialize filtered data
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedTable]);

  useEffect(() => {
    // Apply filters
    const lowerNoRak = noRakFilter.toLowerCase();
    const lowerBulan = bulanFilter.toLowerCase();
    const lowerTahun = tahunFilter.toLowerCase();
    const lowerJenisArsip = jenisArsipFilter.toLowerCase();

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

      return matchesNoRak && matchesBulan && matchesTahun && matchesJenisArsip;
    });

    setFilteredData(newFilteredData);
  }, [noRakFilter, bulanFilter, tahunFilter, jenisArsipFilter, data]);

  const handleSelectItem = (item: any) => {
    setSelectedItems((prevItems) =>
      prevItems.some((i) => i.id === item.id)
        ? prevItems.filter((i) => i.id !== item.id)
        : [...prevItems, item],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSelectItems) {
      onSelectItems(selectedItems); // Ensure onSelectItems is a function
    }
    onRequestClose(); // Close the modal after submission
  };

  const renderTable = () => {
    if (filteredData.length === 0) return <p>No data available</p>;

    // Filter out unwanted columns
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
      contentLabel="Peminjaman Modal"
      className="fixed inset-0 z-50 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg z-50 max-w-5xl w-full">
        <h2 className="text-2xl font-bold mb-4">Peminjaman Modal</h2>
        <label htmlFor="tableSelect" className="block text-sm font-medium mb-2">
          Select Table:
        </label>
        <select
          id="tableSelect"
          value={selectedTable}
          onChange={(e) =>
            setSelectedTable(e.target.value as 'keuangan' | 'tatausaha')
          }
          className="border border-gray-300 rounded-md p-2 w-full mb-4"
        >
          <option value="keuangan">Keuangan</option>
          <option value="tatausaha">Tata Usaha</option>
        </select>

        {/* Filters in a single row */}
        <div className="flex space-x-4 mb-4">
          <input
            type="text"
            placeholder="Filter by No Rak"
            value={noRakFilter}
            onChange={(e) => setNoRakFilter(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
          <input
            type="text"
            placeholder="Filter by Bulan"
            value={bulanFilter}
            onChange={(e) => setBulanFilter(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
          <input
            type="text"
            placeholder="Filter by Tahun"
            value={tahunFilter}
            onChange={(e) => setTahunFilter(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
          <input
            type="text"
            placeholder="Filter by Jenis Arsip"
            value={jenisArsipFilter}
            onChange={(e) => setJenisArsipFilter(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          renderTable()
        )}

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4"
        >
          Submit
        </button>
        <button
          onClick={onRequestClose}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 mt-4 ml-4"
        >
          Close Modal
        </button>
      </div>
    </Modal>
  );
};

export default PeminjamanModal;
