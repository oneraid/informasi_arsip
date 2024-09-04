import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getArsip, deleteArsip } from '../../services/arsipApi';
import { Arsip } from '../../types/arsip';
import { useAuth } from '../../contexts/AuthContext';

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

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    console.log('Authentication Status:', isAuthenticated);
  }, [isAuthenticated]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);

  const navigate = useNavigate();

  useEffect(() => {
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
        setData(data.filter((item) => item.id !== id));
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
          className="mr-2 rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
        <input
          type="text"
          name="no_box"
          value={filters.no_box}
          onChange={handleFilterChange}
          placeholder="Filter No Box"
          className="mr-2 rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
        <input
          type="text"
          name="no_arsip"
          value={filters.no_arsip}
          onChange={handleFilterChange}
          placeholder="Filter No Arsip"
          className="mr-2 rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
        <input
          type="text"
          name="bulan"
          value={filters.bulan}
          onChange={handleFilterChange}
          placeholder="Filter Bulan"
          className="mr-2 rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
        <input
          type="text"
          name="tahun"
          value={filters.tahun}
          onChange={handleFilterChange}
          placeholder="Filter Tahun"
          className="mr-2 rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                No Rak
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
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
              {isAuthenticated && (
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
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
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
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
                {isAuthenticated && (
                  <td className="border-b border-[#eee] py-5 px-4 text-right dark:border-strokedark">
                    <button
                      onClick={() => handleEditClick(item.id)}
                      className="mr-2 text-primary hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-danger hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-end">
        <nav>
          <ul className="inline-flex -space-x-px">
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index}>
                <button
                  onClick={() => handlePageChange(index + 1)}
                  className={`py-2 px-3 leading-tight ${
                    currentPage === index + 1
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-blue-500'
                  } border border-gray-300 hover:bg-blue-100 hover:text-blue-700`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default TableKeuangan;
