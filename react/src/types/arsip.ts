// types/arsip.ts

export interface Arsip {
  id?: number;
  no_rak: string;
  no_box: string;
  bidang: string;
  jenis_arsip: string;
  no_arsip: string;
  bulan: string;
  tahun: string;
  warna: string;
  jumlah: string;
  status: string;
}

// Assuming the Peminjaman type looks something like this
export interface Peminjaman {
  id: number;
  nama: string;
  no_telp: string;
  email: string;
  keperluan: string;
  tanggal_pinjam: string;
  tanggal_kembali: string;
  status: string;
  arsip: Arsip[]; // Assuming this is the array of Arsip objects
  arsip_ids?: number[]; // Add this optional field to the type
  // Other fields...
}
