import React, { useState, useEffect } from 'react';
import { createPeminjaman, fetchArsip } from '../../services/api';

interface Arsip {
  id: number;
  no_arsip: string;
  jenis_arsip: string;
}

const PeminjamanForm: React.FC = () => {
  const [namaPeminjam, setNamaPeminjam] = useState('');
  const [arsipId, setArsipId] = useState<number | null>(null);
  const [tanggalPinjam, setTanggalPinjam] = useState('');
  const [arsipList, setArsipList] = useState<Arsip[]>([]);

  useEffect(() => {
    const getArsip = async () => {
      try {
        const response = await fetchArsip();
        setArsipList(response.data);
      } catch (error) {
        console.error('Error fetching arsip:', error);
      }
    };

    getArsip();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (arsipId === null) {
      alert('Please select an arsip');
      return;
    }
    try {
      await createPeminjaman({
        arsip_id: arsipId,
        nama_peminjam: namaPeminjam,
        tanggal_pinjam: tanggalPinjam,
      });
      alert('Peminjaman berhasil ditambahkan!');
      // Reset form atau arahkan pengguna
    } catch (error) {
      console.error('Error creating peminjaman:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nama Peminjam</label>
        <input
          type="text"
          value={namaPeminjam}
          onChange={(e) => setNamaPeminjam(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Arsip</label>
        <select
          value={arsipId || ''}
          onChange={(e) => setArsipId(Number(e.target.value))}
          required
        >
          <option value="" disabled>
            Pilih Arsip
          </option>
          {arsipList.map((arsip) => (
            <option key={arsip.id} value={arsip.id}>
              {arsip.jenis_arsip} - {arsip.no_arsip}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Tanggal Pinjam</label>
        <input
          type="date"
          value={tanggalPinjam}
          onChange={(e) => setTanggalPinjam(e.target.value)}
          required
        />
      </div>
      <button type="submit">Tambah Peminjaman</button>
    </form>
  );
};

export default PeminjamanForm;
