import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getArsip, deleteArsip } from '../../services/arsipApi';
import { Arsip } from '../../types/arsip';

const TableKeuangan: React.FC = () => {
  const [data, setData] = useState<Arsip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await getArsip();
        const keuanganData = response.data.filter(
          (item: Arsip) => item.bidang === 'Keuangan',
        );
        setData(keuanganData);
      } catch (err) {
        setError('Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
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
            {data.map((item) => (
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
    </div>
  );
};

export default TableKeuangan;
