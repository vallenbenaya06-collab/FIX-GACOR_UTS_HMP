# SIMOBILE - Sistem Kasir Mobile Toko Makmur Jaya

Aplikasi kasir mobile offline untuk toko kelontong **Toko Makmur Jaya** (Bu Marni), dibuat dengan **Ionic + Angular** 
Project UTS Hybrid Mobile Programming (HMP)

## Anggota Kelompok

| Nama | NRP |
| :--- | :--- |
| Vallen Benaya Nangoi | 160424168 |
| Michael Jonathan Candra | 160424183 |
| Robert Valdino Tjahyono | 160424177 |
| Steven Hans Fielo | 160424179 |

## Fitur Aplikasi

1. Halaman Dashboard (Ringkasan Harian)
Ringkasan Penjualan: Saat aplikasi dibuka, dashboard langsung menampilkan metrik utama hari ini: jumlah total jenis produk, total transaksi yang berhasil, omzet pendapatan kotor, serta produk yang paling laris terjual.
Peringatan Stok Menipis: Kartu peringatan otomatis muncul jika terdapat produk dengan sisa stok kurang dari atau sama dengan 5 unit, atau jika stok telah habis (0 unit), sebagai pengingat untuk segera melakukan pengadaan ulang barang.
2. Halaman Katalog Produk (Pencarian dan Belanja)
Pencarian Real-Time: Masukkan nama produk pada kolom searchbar. Daftar produk akan langsung terfilter secara otomatis saat pengetikan berlangsung tanpa perlu menekan tombol cari.
Filter Kategori: Gunakan tombol segmen di bagian atas untuk menyaring produk berdasarkan kategori (Sembako, Minuman, Makanan Ringan, Kebersihan, Bumbu Dapur, atau Lainnya).
Penambahan ke Keranjang Kasir:
Tekan tombol "+ Keranjang" pada item yang ingin ditambahkan ke transaksi pelanggan.
Jika stok barang bernilai 0, tombol secara otomatis dinonaktifkan (disabled) dengan label "Stok Habis" untuk mencegah penjualan barang yang tidak tersedia.
Navigasi Detail: Klik kartu produk untuk membuka rincian lengkap barang tersebut.
3. Halaman Detail Produk dan Analisis Laba
Informasi Produk: Menampilkan foto produk, nama, kategori, harga modal beli, harga jual, dan sisa stok. Jika produk belum memiliki foto, sistem menampilkan gambar default secara otomatis.
Kalkulasi Keuntungan: Sistem menghitung nominal keuntungan per unit serta persentase margin laba untuk memudahkan penentuan strategi harga jual.
Tindakan Produk: Tersedia tombol untuk menuju form Edit Produk, tombol Hapus Produk dengan dialog konfirmasi, dan tombol penambahan langsung ke keranjang.
4. Halaman Tambah dan Edit Produk (Reactive Forms)
Menambah Produk Baru: Klik tombol tambah (+) melayang di sudut kanan bawah halaman katalog produk.
Validasi Formulir:
Nama barang wajib diisi minimal 3 karakter.
Harga beli, harga jual, dan stok wajib berupa angka valid lebih dari 0.
Jika terjadi kesalahan input, pesan peringatan akan muncul tepat di bawah kolom terkait tanpa menghapus data isian yang sudah benar.
Peringatan Potensi Kerugian: Sistem otomatis memberikan peringatan jika nilai harga jual lebih rendah atau sama dengan harga beli/modal.
5. Halaman Keranjang Belanja dan Checkout Kasir
Akses Keranjang: Klik ikon keranjang pada header di sudut kanan atas halaman katalog.
Pengaturan Kuantitas: Gunakan tombol plus (+) dan minus (-) untuk mengubah jumlah barang belanjaan. Kuantitas dibatasi maksimal sesuai ketersediaan stok aktual.
Hapus Item (Swipe-to-Delete): Geser baris barang ke arah kiri untuk menampilkan opsi hapus cepat.
Pembayaran:
Pilih metode transaksi: Tunai (Cash), QRIS / E-Wallet, atau Transfer Bank.
Kolom catatan transaksi dapat diisi secara opsional (nama pelanggan atau keterangan khusus).
Konfirmasi Transaksi: Tekan tombol "Konfirmasi Transaksi". Sistem akan secara otomatis mengurangi stok produk di katalog, mengosongkan keranjang, dan mencatat transaksi ke riwayat toko.
6. Halaman Riwayat Transaksi dan Rincian Nota
Daftar Penjualan: Buka tab Transaksi pada bilah navigasi bawah untuk melihat riwayat seluruh nota penjualan lengkap dengan nomor nota, tanggal, metode pembayaran, dan nominal belanja.
Rincian Nota: Klik pada salah satu nota untuk menampilkan rincian barang yang terjual, kuantitas per item, subtotal, dan keuntungan dari transaksi tersebut.
7. Menu Samping (Drawer) dan Pengaturan Mode Gelap
Membuka Menu: Geser layar dari sisi kiri ke kanan atau klik ikon menu tiga garis pada sudut kiri atas layar.
Mode Gelap (Dark Mode): Buka menu Pengaturan, kemudian aktifkan tombol saklar Mode Gelap. Seluruh antarmuka aplikasi akan beralih ke palet warna gelap untuk kenyamanan penggunaan pada kondisi pencahayaan rendah.
8. Design dengan warna tidak standar ionic dengan palette warna kuning dan merah, serta menambahkan 2 animasi, yaitu pada bagian menu awal pada kartu ucapan Bu Marni, dan juga gambar pada detail product.
9. Navigasi bar yang sudah terdiri dari 4 tab, yaitu Dashboard, Produk, Transaksi, Profil dengan pemecahan service menjadi 3 file services, yaitu ProductService, CartService, TransactionService.

## Cara Menjalankan

Prasyarat: Node.js (LTS) dan Ionic CLI.

```bash
npm install -g @ionic/cli
git clone https://github.com/vallenbenaya06-collab/FIX-GACOR_UTS_HMP.git
cd FIX-GACOR_UTS_HMP
npm install
ionic serve
```

Aplikasi akan terbuka di browser pada `http://localhost:8100`.
