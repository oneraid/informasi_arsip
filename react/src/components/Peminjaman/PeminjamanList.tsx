import React, { useEffect, useState } from 'react';
import { Peminjaman } from '../../types/arsip';
import { getPeminjaman, deletePeminjaman } from '../../services/arsipApi';

const PeminjamanList: React.FC = () => {
  const [peminjaman, setPeminjaman] = useState<Peminjaman[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPeminjaman();
      // Filter out only the 'Pending' status items
      const pendingPeminjaman = data.filter((p) => p.status === 'Pending');
      setPeminjaman(pendingPeminjaman);
    };

    fetchData();
  }, []);

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
              <th className="px-4 py-2">Tanggal Pinjam</th>
              <th className="px-4 py-2">Tanggal Kembali</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Items Borrowed</th>
            </tr>
          </thead>
          <tbody>
            {peminjaman.map((p) => (
              <tr key={p.id}>
                <td className="border px-4 py-2">{p.nama}</td>
                <td className="border px-4 py-2">{p.tanggal_pinjam}</td>
                <td className="border px-4 py-2">{p.tanggal_kembali}</td>
                <td className="border px-4 py-2 ">{p.status}</td>
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
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PeminjamanList;
