import React, { useState, useEffect } from 'react';
import {
  getPeminjaman,
  updatePeminjaman,
  getPeminjamanById,
} from '../../services/arsipApi';
import { Peminjaman } from '../../types/arsip';

const PeminjamanApproval: React.FC = () => {
  const [peminjamanList, setPeminjamanList] = useState<Peminjaman[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPendingPeminjaman = async () => {
      try {
        const response = await getPeminjaman();
        const pendingRequests = response.filter(
          (peminjaman) => peminjaman.status === 'Pending',
        );
        setPeminjamanList(pendingRequests);
      } catch (error) {
        console.error('Error fetching Peminjaman:', error);
        setError('Failed to fetch Peminjaman requests.');
      } finally {
        setLoading(false);
      }
    };

    fetchPendingPeminjaman();
  }, []);

  const handleApprove = async (id: number) => {
    try {
      // Fetch the full Peminjaman object to get all required fields
      const peminjaman = await getPeminjamanById(id);

      // Extract arsip_ids from the arsip array
      const arsip_ids = peminjaman.arsip
        .map((arsip) => arsip.id)
        .filter((id) => id !== undefined) as number[];

      // Create the update data object with all required fields
      const updateData = {
        nama: peminjaman.nama,
        no_telp: peminjaman.no_telp,
        email: peminjaman.email,
        tanggal_pinjam: peminjaman.tanggal_pinjam,
        tanggal_kembali: peminjaman.tanggal_kembali, // Include if needed
        status: 'Dipinjam',
        arsip_ids, // Include arsip_ids
      };

      await updatePeminjaman(id, updateData);

      alert('Peminjaman has been approved.');
      setPeminjamanList((prev) =>
        prev.filter((peminjaman) => peminjaman.id !== id),
      );
    } catch (error: any) {
      if (error.response) {
        console.error('Error approving Peminjaman:', error.response.data);
        alert(
          `Failed to approve Peminjaman: ${JSON.stringify(
            error.response.data,
          )}`,
        );
      } else {
        console.error('Error approving Peminjaman:', error.message);
        alert('Failed to approve Peminjaman.');
      }
    }
  };

  const handleReject = async (id: number) => {
    try {
      // Fetch the full Peminjaman object to get all required fields
      const peminjaman = await getPeminjamanById(id);

      // Extract arsip_ids from the arsip array
      const arsip_ids = peminjaman.arsip
        .map((arsip) => arsip.id)
        .filter((id) => id !== undefined) as number[];

      // Create the update data object with all required fields
      const updateData = {
        nama: peminjaman.nama,
        no_telp: peminjaman.no_telp,
        email: peminjaman.email,
        tanggal_pinjam: peminjaman.tanggal_pinjam,
        tanggal_kembali: peminjaman.tanggal_kembali, // Include if needed
        status: 'Ditolak',
        arsip_ids, // Include arsip_ids
      };

      await updatePeminjaman(id, updateData);

      alert('Peminjaman has been rejected.');
      setPeminjamanList((prev) =>
        prev.filter((peminjaman) => peminjaman.id !== id),
      );
    } catch (error: any) {
      if (error.response) {
        console.error('Error rejecting Peminjaman:', error.response.data);
        alert(
          `Failed to reject Peminjaman: ${JSON.stringify(error.response.data)}`,
        );
      } else {
        console.error('Error rejecting Peminjaman:', error.message);
        alert('Failed to reject Peminjaman.');
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Approve or Reject Peminjaman</h2>
      {peminjamanList.length === 0 ? (
        <p>No pending requests found.</p>
      ) : (
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nama
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tanggal Pinjam
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tanggal Kembali
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {peminjamanList.map((peminjaman) => (
              <tr key={peminjaman.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {peminjaman.nama}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {peminjaman.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {peminjaman.tanggal_pinjam}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {peminjaman.tanggal_kembali}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {peminjaman.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 space-x-2">
                  <button
                    onClick={() => handleApprove(peminjaman.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(peminjaman.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PeminjamanApproval;
