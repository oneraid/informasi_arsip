import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { getKeuangan, getTataUsaha } from '../services/api';

// Ensure this is set for accessibility purposes
Modal.setAppElement('#root');

interface PeminjamanModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const PeminjamanModal: React.FC<PeminjamanModalProps> = ({
  isOpen,
  onRequestClose,
}) => {
  const [selectedTable, setSelectedTable] = useState<'keuangan' | 'tatausaha'>(
    'keuangan',
  );
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedTable]);

  const renderTable = () => {
    if (data.length === 0) return <p>No data available</p>;

    // Determine table headers based on the selected table
    const headers =
      selectedTable === 'keuangan'
        ? ['ID', 'No Arsip', 'Jenis Arsip']
        : ['ID', 'No Arsip', 'Jenis Arsip'];

    // Render table rows
    return (
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.no_arsip}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.jenis_arsip}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
      <div className="bg-white p-6 rounded-lg shadow-lg z-50 max-w-4xl w-full">
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
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          renderTable()
        )}
        <button
          onClick={onRequestClose}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4"
        >
          Close Modal
        </button>
      </div>
    </Modal>
  );
};

export default PeminjamanModal;
