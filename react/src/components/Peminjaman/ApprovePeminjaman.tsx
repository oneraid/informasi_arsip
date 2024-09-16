import React, { useState, useEffect } from 'react';
import {
  getPeminjaman,
  updatePeminjaman,
  getPeminjamanById,
  exportPeminjamanToPdf,
  updateArsipStatus,
} from '../../services/arsipApi';
import { Peminjaman } from '../../types/arsip';

const PeminjamanApproval: React.FC = () => {
  const [peminjamanList, setPeminjamanList] = useState<Peminjaman[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5); // Number of items per page

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
      const peminjaman = await getPeminjamanById(id);

      // Get the arsip IDs and set them to "Tidak Tersedia"
      const arsip_ids = peminjaman.arsip
        .map((arsip) => arsip.id)
        .filter((id) => id !== undefined) as number[];

      const updateData = {
        nama: peminjaman.nama,
        no_telp: peminjaman.no_telp,
        email: peminjaman.email,
        keperluan: peminjaman.keperluan,
        tanggal_pinjam: peminjaman.tanggal_pinjam,
        tanggal_kembali: peminjaman.tanggal_kembali,
        status: 'Dipinjam',
        arsip_ids,
      };

      await updatePeminjaman(id, updateData);

      for (const arsipId of arsip_ids) {
        await updateArsipStatus(arsipId, 'Tidak Tersedia');
      }

      alert('Peminjaman has been approved and Arsip status updated.');

      // Remove the approved peminjaman from the list
      setPeminjamanList((prev) =>
        prev.filter((peminjaman) => peminjaman.id !== id),
      );
      console.log(peminjaman.arsip);
    } catch (error: any) {
      console.error(
        'Error approving Peminjaman or updating Arsip status:',
        error.response ? error.response.data : error.message,
      );
      alert('Failed to approve Peminjaman or update Arsip status.');
    }
  };

  const handleReject = async (id: number) => {
    try {
      const peminjaman = await getPeminjamanById(id);
      const arsip_ids = peminjaman.arsip
        .map((arsip) => arsip.id)
        .filter((id) => id !== undefined) as number[];

      const updateData = {
        nama: peminjaman.nama,
        no_telp: peminjaman.no_telp,
        email: peminjaman.email,
        keperluan: peminjaman.keperluan,
        tanggal_pinjam: peminjaman.tanggal_pinjam,
        tanggal_kembali: peminjaman.tanggal_kembali,
        status: 'Ditolak',
        arsip_ids,
      };

      await updatePeminjaman(id, updateData);
      alert('Peminjaman has been rejected.');
      setPeminjamanList((prev) =>
        prev.filter((peminjaman) => peminjaman.id !== id),
      );
    } catch (error: any) {
      console.error(
        'Error rejecting Peminjaman:',
        error.response ? error.response.data : error.message,
      );
      alert('Failed to reject Peminjaman.');
    }
  };

  const handleExportPdf = async (id: number) => {
    try {
      const blob = await exportPeminjamanToPdf(id);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `peminjaman_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting Peminjaman to PDF:', error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = peminjamanList.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(peminjamanList.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Approve or Reject Peminjaman</h2>
      {peminjamanList.length === 0 ? (
        <p>No pending requests found.</p>
      ) : (
        <>
          <table className="min-w-full bg-white border dark:bg-boxdark-2">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Info
                </th>
                <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                  Arsip
                </th>
                <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-boxdark">
              {currentItems.map((peminjaman) => (
                <tr key={peminjaman.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <p>
                        <strong>Nama:</strong> {peminjaman.nama}
                      </p>
                      <p>
                        <strong>Email:</strong> {peminjaman.email}
                      </p>
                      <p>
                        <strong>Tanggal Pinjam:</strong>{' '}
                        {peminjaman.tanggal_pinjam}
                      </p>
                      <p>
                        <strong>Tanggal Kembali:</strong>{' '}
                        {peminjaman.tanggal_kembali}
                      </p>
                      <p>
                        <strong>Keperluan:</strong> {peminjaman.keperluan}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <ul>
                      {peminjaman.arsip.map((arsip) => (
                        <li key={arsip.id}>
                          No rak {arsip.no_rak} - No box {arsip.no_box} - Bidang{' '}
                          {arsip.bidang}, {arsip.jenis_arsip} {arsip.no_arsip} (
                          {arsip.bulan} {arsip.tahun})
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => handleApprove(peminjaman.id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-md w-full"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(peminjaman.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md w-full"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleExportPdf(peminjaman.id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
                      >
                        PDF
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
            >
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PeminjamanApproval;
