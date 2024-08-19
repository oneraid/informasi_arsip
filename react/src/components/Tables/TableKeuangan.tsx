import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getKeuangan, deleteKeuangan } from '../../services/api';
import { Keuangan } from '../../types/arsip';

const TableKeuangan: React.FC = () => {
  const [keuangan, setKeuangan] = useState<Keuangan[]>([]);
  const [filteredKeuangan, setFilteredKeuangan] = useState<Keuangan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [yearFilter, setYearFilter] = useState<string>('');
  const [monthFilter, setMonthFilter] = useState<string>('');
  const [noRakFilter, setNoRakFilter] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const history = useNavigate();

  useEffect(() => {
    const fetchKeuangan = async () => {
      try {
        const response = await getKeuangan();
        setKeuangan(response.data);
        setFilteredKeuangan(response.data); // Initialize filteredKeuangan
      } catch (error) {
        setError('Error fetching keuangan');
        console.error('Error fetching keuangan', error);
      } finally {
        setLoading(false);
      }
    };

    fetchKeuangan();
  }, []);

  useEffect(() => {
    let filteredData = keuangan;

    if (yearFilter) {
      filteredData = filteredData.filter((item) =>
        item.tahun.includes(yearFilter),
      );
    }

    if (monthFilter) {
      filteredData = filteredData.filter((item) =>
        item.bulan.toLowerCase().includes(monthFilter.toLowerCase()),
      );
    }

    if (noRakFilter) {
      filteredData = filteredData.filter((item) =>
        item.no_rak.toLowerCase().includes(noRakFilter.toLowerCase()),
      );
    }

    if (searchTerm) {
      filteredData = filteredData.filter(
        (item) =>
          item.no_rak.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.no_box.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.jenis_arsip.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.no_arsip.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    setFilteredKeuangan(filteredData);
  }, [yearFilter, monthFilter, noRakFilter, searchTerm, keuangan]);

  const handleDelete = async (id: number | undefined) => {
    if (id !== undefined) {
      try {
        await deleteKeuangan(id);
        setKeuangan(keuangan.filter((item) => item.id !== id));
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    } else {
      console.error('ID is undefined');
    }
  };

  const handleEditClick = (id: number | undefined) => {
    if (id !== undefined) {
      history(`/update-keuangan/${id}`);
    } else {
      console.error('ID is undefined');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="mb-4 flex space-x-4">
        <input
          type="text"
          placeholder="Filter by No Rak"
          value={noRakFilter}
          onChange={(e) => setNoRakFilter(e.target.value)}
          className="rounded-md border border-gray-300 p-2"
        />
        <input
          type="text"
          placeholder="Filter by Month"
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}
          className="rounded-md border border-gray-300 p-2"
        />
        <input
          type="text"
          placeholder="Filter by Year"
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          className="rounded-md border border-gray-300 p-2"
        />
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-md border border-gray-300 p-2"
        />
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              {/* Table headers */}
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
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
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredKeuangan.map((item) => (
              <tr key={item.id}>
                {/* Table data */}
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {item.no_rak}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item.no_box}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.jenis_arsip}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item.no_arsip}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item.bulan}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item.tahun}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.jumlah_folder}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item.warna}</p>
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
    </div>
  );
};

export default TableKeuangan;
