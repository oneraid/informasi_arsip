<!DOCTYPE html>
<html>
<head>
    <title>Pengingat Pengembalian Arsip</title>
</head>
<body>
    <p>Halo {{ $nama }},</p>
    <p>Ini adalah pengingat bahwa Anda memiliki peminjaman arsip yang harus dikembalikan pada {{ \Carbon\Carbon::parse($tanggal_kembali)->format('d-m-Y') }}.</p>

    <p>Berikut detail arsip yang Anda pinjam:</p>
    <ul>
        @foreach ($arsip as $item)
            <li>{{ $item->jenis_arsip }} ({{ $item->no_arsip }}) - {{ $item->bulan }} {{ $item->tahun }}</li>
        @endforeach
    </ul>

    <p>Harap segera mengembalikan arsip tepat waktu. Terima kasih!</p>
</body>
</html>
