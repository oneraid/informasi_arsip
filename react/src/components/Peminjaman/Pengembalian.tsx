import React, { useEffect, useState } from 'react';
import {
  getPeminjaman,
  updatePeminjaman,
  getPeminjamanById,
} from '../../services/arsipApi';
import { Peminjaman } from '../../types/arsip';

const Pengembalian: React.FC = () => {
  const [peminjaman, setPengembalian] = useState<Peminjaman[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPeminjaman();
        // Filter out only the 'Dipinjam' status items
        const borrowedPengembalian = data.filter(
          (p) => p.status === 'Dipinjam',
        );
        setPengembalian(borrowedPengembalian);
      } catch (error) {
        console.error('Error fetching Peminjaman:', error);
        setError('Failed to fetch Peminjaman.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleReturned = async (id: number) => {
    try {
      // Fetch the current Peminjaman object to get all required fields
      const peminjaman = await getPeminjamanById(id);

      // Filter out any undefined values from arsip_ids
      const arsip_ids = peminjaman.arsip
        .map((arsip) => arsip.id)
        .filter((id): id is number => id !== undefined);

      // Create the update data object with the required fields
      const updateData = {
        nama: peminjaman.nama,
        no_telp: peminjaman.no_telp,
        email: peminjaman.email,
        tanggal_pinjam: peminjaman.tanggal_pinjam,
        tanggal_kembali: peminjaman.tanggal_kembali,
        status: 'Selesai',
        arsip_ids, // Include filtered arsip_ids
      };

      await updatePeminjaman(id, updateData);

      alert('Peminjaman has been marked as returned.');
      setPengembalian((prev) => prev.filter((p) => p.id !== id));
    } catch (error: any) {
      if (error.response) {
        console.error(
          'Error marking Peminjaman as returned:',
          error.response.data,
        );
        alert(
          `Failed to mark Peminjaman as returned: ${JSON.stringify(
            error.response.data,
          )}`,
        );
      } else {
        console.error('Error marking Peminjaman as returned:', error.message);
        alert('Failed to mark Peminjaman as returned.');
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Borrowed Peminjaman List</h1>
      {peminjaman.length === 0 ? (
        <p>No borrowed Peminjaman requests.</p>
      ) : (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Nama</th>
              <th className="px-4 py-2">No Telp</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Tanggal Pinjam</th>
              <th className="px-4 py-2">Tanggal Kembali</th>
              <th className="px-4 py-2">Items Borrowed</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {peminjaman.map((p) => (
              <tr key={p.id}>
                <td className="border px-4 py-2">{p.nama}</td>
                <td className="border px-4 py-2">{p.no_telp}</td>
                <td className="border px-4 py-2">{p.email}</td>
                <td className="border px-4 py-2">{p.tanggal_pinjam}</td>
                <td className="border px-4 py-2">{p.tanggal_kembali}</td>
                <td className="border px-4 py-2">
                  <ul>
                    {p.arsip.map((arsip) => (
                      <li key={arsip.id}>
                        {arsip.bidang}, {arsip.jenis_arsip} ({arsip.no_arsip}){' '}
                        {arsip.bulan} {arsip.tahun}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => handleReturned(p.id)}
                  >
                    Mark as Returned
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

export default Pengembalian;
