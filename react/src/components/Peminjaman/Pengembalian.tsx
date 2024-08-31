import React, { useEffect, useState } from 'react';
import { Peminjaman } from '../../types/arsip';
import { getPeminjaman, deletePeminjaman } from '../../services/arsipApi';

const Pengembalian: React.FC = () => {
  const [peminjaman, setPeminjaman] = useState<Peminjaman[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPeminjaman();
      // Filter out only the 'Pending' status items
      const pendingPeminjaman = data.filter((p) => p.status === 'Dipinjam');
      setPeminjaman(pendingPeminjaman);
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    await deletePeminjaman(id);
    setPeminjaman(peminjaman.filter((p) => p.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pending Peminjaman List</h1>
      {peminjaman.length === 0 ? (
        <p>No pending Peminjaman requests.</p>
      ) : (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Nama</th>
              <th className="px-4 py-2">No Telp</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Tanggal Pinjam</th>
              <th className="px-4 py-2">Status</th>
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
                <td className="border px-4 py-2">{p.status}</td>
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
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </button>
                  {/* Add buttons for edit/view here */}
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
