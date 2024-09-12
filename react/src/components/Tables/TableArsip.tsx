import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getArsip, deleteArsip } from '../../services/arsipApi';
import { Arsip } from '../../types/arsip';
import { useAuth } from '../../contexts/AuthContext';
import ConfirmationModal from '../Modal/ConfirmationModal'; // Import modal

interface TableKeuanganProps {
  filterByBidang?: string; // Optional prop for filtering by bidang
}

const TableArsip: React.FC<TableKeuanganProps> = ({ filterByBidang }) => {
  const [data, setData] = useState<Arsip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    no_rak: '',
    no_box: '',
    no_arsip: '',
    bulan: '',
    tahun: '',
  });

  const [showModal, setShowModal] = useState<boolean>(false);
  const [itemToDelete, setItemToDelete] = useState<number | undefined>(
    undefined,
  );

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Authentication Status:', isAuthenticated);
  }, [isAuthenticated]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getArsip();
        let fetchedData = response.data;

        // Apply bidang filter if provided
        if (filterByBidang) {
          fetchedData = fetchedData.filter(
            (item: Arsip) => item.bidang === filterByBidang,
          );
        }

        // Apply other filters (no_rak, no_box, etc.)
        if (filters.no_rak) {
          fetchedData = fetchedData.filter((item) =>
            item.no_rak.toLowerCase().includes(filters.no_rak.toLowerCase()),
          );
        }
        if (filters.no_box) {
          fetchedData = fetchedData.filter((item) =>
            item.no_box.toLowerCase().includes(filters.no_box.toLowerCase()),
          );
        }
        if (filters.no_arsip) {
          fetchedData = fetchedData.filter((item) =>
            item.no_arsip
              .toLowerCase()
              .includes(filters.no_arsip.toLowerCase()),
          );
        }
        if (filters.bulan) {
          fetchedData = fetchedData.filter((item) =>
            item.bulan.toLowerCase().includes(filters.bulan.toLowerCase()),
          );
        }
        if (filters.tahun) {
          fetchedData = fetchedData.filter((item) =>
            item.tahun.toLowerCase().includes(filters.tahun.toLowerCase()),
          );
        }

        setData(fetchedData);
      } catch (err) {
        setError('Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters, filterByBidang]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleDelete = (id: any) => {
    setItemToDelete(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (itemToDelete !== undefined) {
      try {
        await deleteArsip(itemToDelete);
        setData(data.filter((item) => item.id !== itemToDelete));
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
    setShowModal(false);
    setItemToDelete(undefined);
  };

  const cancelDelete = () => {
    setShowModal(false);
    setItemToDelete(undefined);
  };

  const handleEditClick = (id: number | undefined) => {
    if (id !== undefined) {
      navigate(`/update-arsip/${id}`);
    } else {
      console.error('ID is undefined');
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Keuangan Arsip
      </h4>

      <div className="mb-4 flex flex-wrap gap-3">
        <input
          type="text"
          name="no_rak"
          value={filters.no_rak}
          onChange={handleFilterChange}
          placeholder="Filter No Rak"
          className="flex-1 min-w-[100px] sm:min-w-0 rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
        <input
          type="text"
          name="no_box"
          value={filters.no_box}
          onChange={handleFilterChange}
          placeholder="Filter No Box"
          className="flex-1 min-w-[100px] sm:min-w-0 rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
        <input
          type="text"
          name="no_arsip"
          value={filters.no_arsip}
          onChange={handleFilterChange}
          placeholder="Filter No Arsip"
          className="flex-1 min-w-[100px] sm:min-w-0 rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
        <input
          type="text"
          name="bulan"
          value={filters.bulan}
          onChange={handleFilterChange}
          placeholder="Filter Bulan"
          className="flex-1 min-w-[100px] sm:min-w-0 rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
        <input
          type="text"
          name="tahun"
          value={filters.tahun}
          onChange={handleFilterChange}
          placeholder="Filter Tahun"
          className="flex-1 min-w-[100px] sm:min-w-0 rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </div>

      <div className="w-full overflow-x-auto">
        {/* Apply a minimum width to allow horizontal scrolling */}
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-2 dark:bg-meta-4">
              <th className="px-2 py-3 text-center text-base font-medium text-gray-900 dark:text-white">
                No Rak
              </th>
              <th className="px-2 py-3 text-center text-base font-medium text-gray-900 dark:text-white">
                No Box
              </th>
              <th className="px-2 py-3 text-center text-base font-medium text-gray-900 dark:text-white">
                Jenis Arsip
              </th>
              <th className="px-2 py-3 text-center text-base font-medium text-gray-900 dark:text-white">
                No Arsip
              </th>
              <th className="px-2 py-3 text-center text-base font-medium text-gray-900 dark:text-white">
                Bulan
              </th>
              <th className="px-2 py-3 text-center text-base font-medium text-gray-900 dark:text-white">
                Tahun
              </th>
              <th className="px-2 py-3 text-center text-base font-medium text-gray-900 dark:text-white">
                Jumlah Folder
              </th>
              <th className="px-2 py-3 text-center text-base font-medium text-gray-900 dark:text-white">
                Warna
              </th>
              <th className="px-2 py-3 text-center text-base font-medium text-gray-900 dark:text-white">
                Status
              </th>
              {isAuthenticated && (
                <th className="px-2 py-3 text-center text-base font-medium text-gray-900 dark:text-white">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {currentItems.map((item) => (
              <tr
                key={item.id}
                className="border-b border-stroke dark:border-strokedark"
              >
                <td className="text-center px-2 py-3 text-black dark:text-white">
                  {item.no_rak}
                </td>
                <td className="text-center px-2 py-3 text-black dark:text-white">
                  {item.no_box}
                </td>
                <td className="text-center px-2 py-3 text-black dark:text-white">
                  {item.jenis_arsip}
                </td>
                <td className="text-center px-2 py-3 text-black dark:text-white">
                  {item.no_arsip}
                </td>
                <td className="text-center px-2 py-3 text-black dark:text-white">
                  {item.bulan}
                </td>
                <td className="text-center px-2 py-3 text-black dark:text-white">
                  {item.tahun}
                </td>
                <td className="text-center px-2 py-3 text-black dark:text-white">
                  {item.jumlah}
                </td>
                <td className="text-center px-2 py-3 text-black dark:text-white">
                  {item.warna ? item.warna : 'N/A'}
                </td>
                <td className="text-center px-2 py-3 text-black dark:text-white">
                  {item.status}
                </td>
                {isAuthenticated && (
                  <td className="text-center px-2 py-3">
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleEditClick(item.id)}
                        className="inline-block rounded-full border border-indigo-300 px-2 py-1 text-sm font-medium text-indigo-600 hover:bg-indigo-300 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="inline-block rounded-full border border-red-300 px-2 py-1 text-sm font-medium text-red-600 hover:bg-red-300 hover:text-white focus:outline-none focus:ring active:bg-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center items-center gap-3">
        {/* Previous Page Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="inline-flex items-center justify-center rounded border border-gray-100 bg-white text-gray-900 disabled:opacity-50"
        >
          <span className="sr-only">Prev Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Page Number Display */}
        <p className="text-sm text-gray-900">
          {currentPage}
          <span className="mx-2">/</span>
          {totalPages}
        </p>

        {/* Next Page Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="inline-flex items-center justify-center rounded border border-gray-100 bg-white text-gray-900 disabled:opacity-50"
        >
          <span className="sr-only">Next Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <ConfirmationModal
          message="Apakah anda yakin untuk menghapus?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default TableArsip;
