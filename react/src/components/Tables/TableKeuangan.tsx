import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getArsip, deleteArsip } from '../../services/arsipApi';
import { Arsip } from '../../types/arsip';

const TableKeuangan: React.FC = () => {
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

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10); // Adjust items per page as needed

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await getArsip();
        let filteredData = response.data.filter(
          (item: Arsip) => item.bidang === 'Keuangan',
        );

        // Apply filters
        if (filters.no_rak) {
          filteredData = filteredData.filter((item) =>
            item.no_rak.toLowerCase().includes(filters.no_rak.toLowerCase()),
          );
        }
        if (filters.no_box) {
          filteredData = filteredData.filter((item) =>
            item.no_box.toLowerCase().includes(filters.no_box.toLowerCase()),
          );
        }
        if (filters.no_arsip) {
          filteredData = filteredData.filter((item) =>
            item.no_arsip
              .toLowerCase()
              .includes(filters.no_arsip.toLowerCase()),
          );
        }
        if (filters.bulan) {
          filteredData = filteredData.filter((item) =>
            item.bulan.toLowerCase().includes(filters.bulan.toLowerCase()),
          );
        }
        if (filters.tahun) {
          filteredData = filteredData.filter((item) =>
            item.tahun.toLowerCase().includes(filters.tahun.toLowerCase()),
          );
        }

        setData(filteredData);
      } catch (err) {
        setError('Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleDelete = async (id: number | undefined) => {
    if (id !== undefined) {
      try {
        await deleteArsip(id);
        setData(data.filter((item) => item.id !== id)); // Filter out deleted item
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    } else {
      console.error('ID is undefined');
    }
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
      <div className="mb-4">
        <input
          type="text"
          name="no_rak"
          value={filters.no_rak}
          onChange={handleFilterChange}
          placeholder="Filter No Rak"
          className="mr-2 border p-2 rounded"
        />
        <input
          type="text"
          name="no_box"
          value={filters.no_box}
          onChange={handleFilterChange}
          placeholder="Filter No Box"
          className="mr-2 border p-2 rounded"
        />
        <input
          type="text"
          name="no_arsip"
          value={filters.no_arsip}
          onChange={handleFilterChange}
          placeholder="Filter No Arsip"
          className="mr-2 border p-2 rounded"
        />
        <input
          type="text"
          name="bulan"
          value={filters.bulan}
          onChange={handleFilterChange}
          placeholder="Filter Bulan"
          className="mr-2 border p-2 rounded"
        />
        <input
          type="text"
          name="tahun"
          value={filters.tahun}
          onChange={handleFilterChange}
          placeholder="Filter Tahun"
          className="border p-2 rounded"
        />
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                No Rak
              </th>
              <th className="min-w-[100px] py-4 px-0 font-medium text-black dark:text-white">
                No Box
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Jenis Arsip
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                No Arsip
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Bulan
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Tahun
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Jumlah Folder
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Warna
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td className="border-b border-[#eee] py-5 px-8 dark:border-strokedark">
                  {item.no_rak}
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  {item.no_box}
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  {item.jenis_arsip}
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  {item.no_arsip}
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  {item.bulan}
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  {item.tahun}
                </td>
                <td className="border-b border-[#eee] py-5 px-15 dark:border-strokedark">
                  {item.jumlah}
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  {item.warna}
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                      item.status === 'tersedia'
                        ? 'bg-success text-success'
                        : item.status === 'tidak tersedia'
                        ? 'bg-danger text-danger'
                        : 'bg-warning text-warning'
                    }`}
                  >
                    {item.status}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button
                      onClick={() => handleEditClick(item.id)}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TableKeuangan;
