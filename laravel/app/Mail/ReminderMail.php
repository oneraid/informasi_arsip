<?php
namespace App\Mail;

use App\Models\Peminjaman;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ReminderMail extends Mailable
{
    use Queueable, SerializesModels;

    public $peminjaman;

    public function __construct(Peminjaman $peminjaman)
    {
        $this->peminjaman = $peminjaman;
    }

    public function build()
    {
        return $this->view('emails.reminder')
                    ->subject('Pengingat Tenggat Pengembalian Arsip')
                    ->with([
                        'nama' => $this->peminjaman->nama,
                        'tanggal_kembali' => $this->peminjaman->tanggal_kembali,
                        'arsip' => $this->peminjaman->arsip,
                    ]);
    }
}

