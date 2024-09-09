<!DOCTYPE html>
<html>
<head>
    <title>Detail Peminjaman</title>
    <style>
        body {
            font-family: sans-serif;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .content {
            margin-bottom: 20px;
        }
        .arsip {
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h2>Detail Peminjaman Arsip</h2>
    </div>

    <div class="content">
        <strong>Nama:</strong> {{ $nama }}<br>
        <strong>Email:</strong> {{ $email }}<br>
        <strong>No Telp:</strong> {{ $no_telp }}<br>
        <strong>Keperluan:</strong> {{ $keperluan }}<br>
        <strong>Tanggal Pinjam:</strong> {{ $tanggal_pinjam }}<br>
        <strong>Tanggal Kembali:</strong> {{ $tanggal_kembali }}<br>
    </div>

    <div class="arsip">
        <h3>Arsip yang Dipinjam</h3>
        {!! $arsip_data !!}
    </div>
</body>
</html>
