import React, { useEffect, useState } from 'react';
import {
  getPeminjaman,
  updatePeminjaman,
  getPeminjamanById,
  updateArsip,
  sendReminderEmail,
  updateArsipStatus,
} from '../../services/arsipApi';
import { Peminjaman } from '../../types/arsip';
import ConfirmationModal from '../Modal/ConfirmationModal'; // Import modal

const Pengembalian: React.FC = () => {
  const [peminjaman, setPengembalian] = useState<Peminjaman[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedPeminjamanId, setSelectedPeminjamanId] = useState<
    number | null
  >(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPeminjaman();
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
      const peminjaman = await getPeminjamanById(id);
      const arsip_ids = peminjaman.arsip
        .map((arsip) => arsip.id)
        .filter((id): id is number => id !== undefined);

      const updateData = {
        nama: peminjaman.nama,
        no_telp: peminjaman.no_telp,
        email: peminjaman.email,
        keperluan: peminjaman.keperluan,
        tanggal_pinjam: peminjaman.tanggal_pinjam,
        tanggal_kembali: peminjaman.tanggal_kembali,
        status: 'Selesai',
        arsip_ids,
      };

      // Update peminjaman status to "Selesai"
      await updatePeminjaman(id, updateData);

      // Update each Arsip status to "Tersedia"
      for (const arsipId of arsip_ids) {
        await updateArsipStatus(arsipId, 'Tersedia');
      }

      alert('Peminjaman telah berhasil dikembalikan.');
      setPengembalian((prev) => prev.filter((p) => p.id !== id));
    } catch (error: any) {
      if (error.response) {
        console.error(
          'Error marking Peminjaman as returned:',
          error.response.data,
        );
        alert(
          `Gagal mengembalikan peminjaman: ${JSON.stringify(
            error.response.data,
          )}`,
        );
      } else {
        console.error('Error marking Peminjaman as returned:', error.message);
        alert('Gagal mengembalikan peminjaman.');
      }
    }
  };

  const handleShowModal = (id: number) => {
    setSelectedPeminjamanId(id);
    setShowModal(true);
  };

  const handleConfirm = () => {
    if (selectedPeminjamanId !== null) {
      handleReturned(selectedPeminjamanId);
    }
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleSendReminder = async (id: number) => {
    try {
      await sendReminderEmail(id);
      alert('Email pengingat telah berhasil dikirim.');
    } catch (error) {
      console.error('Failed to send reminder:', error);
      alert('Gagal mengirim email pengingat.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Daftar Peminjaman yang Dipinjam
      </h1>
      {peminjaman.length === 0 ? (
        <p>Tidak ada peminjaman yang sedang dipinjam.</p>
      ) : (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Nama</th>
              <th className="px-4 py-2">No Telp</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Tanggal Pinjam</th>
              <th className="px-4 py-2">Tanggal Kembali</th>
              <th className="px-4 py-2">Arsip Dipinjam</th>
              <th className="px-4 py-2">Aksi</th>
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
                  <div className="flex flex-col space-y-2">
                    <button
                      className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      onClick={() => handleShowModal(p.id)}
                    >
                      Mark as Returned
                    </button>
                    <button
                      className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      onClick={() => handleSendReminder(p.id)}
                    >
                      Send Reminder
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showModal && (
        <ConfirmationModal
          message="Apakah Anda yakin ingin mengembalikan peminjaman ini?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default Pengembalian;
