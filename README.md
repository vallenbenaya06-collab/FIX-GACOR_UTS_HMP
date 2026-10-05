# SIMOBILE - Sistem Kasir Mobile Toko Makmur Jaya

Aplikasi kasir mobile offline untuk toko kelontong **Toko Makmur Jaya** (Bu Marni), dibuat dengan **Ionic + Angular** 
Project UTS Hybrid Mobile Programming (HMP)

## Anggota Kelompok

| Nama | NRP |
| :--- | :--- |
| Vallen Benaya Nangoi | 160424168 |
| Michael Jonathan Candra | 160424169 |
| Robert Valdino Tjahyono | 160424177 |
| Steven Hans Fielo | 160424171 |

## Fitur Aplikasi

- **Navigasi Utama (Poin 1):** 4 tab utama (Dashboard, Produk, Transaksi, Profil) yang dibungkus oleh Drawer/Side Menu (Pengaturan, Tentang Aplikasi).
- **Dashboard Toko (Poin 2):** Ringkasan jumlah produk, total transaksi & omzet hari ini, serta produk terlaris menggunakan data binding interpolation.
- **Pencarian Produk Real-Time (Poin 3):** Cari produk otomatis memfilter katalog saat mengetik (two-way binding [(ngModel)]) tanpa tombol submit, dilengkapi filter segment kategori.
- **Detail Produk (Poin 4 & 5):** Navigasi via route parameter (:id), informasi stok, harga beli, harga jual, margin keuntungan, fallback gambar default jika foto kosong, dan tombol otomatis ter-disable jika stok habis.
- **Manajemen Produk (Poin 6):** Form Tambah & Edit Produk berbasis Reactive Forms (FormGroup), validasi input, serta deteksi peringatan harga rugi (jika harga jual <= harga beli).
- **Keranjang & Checkout Kasir (Poin 7):** Manajemen kuantitas barang, swipe-to-delete, pilihan metode pembayaran, konfirmasi transaksi, dan pemotongan stok otomatis di katalog.
- **Riwayat Transaksi (Poin 7):** Daftar nota transaksi penjualan beserta rincian lengkap barang yang terjual.
- **Tema & Mode Gelap (Poin 8):** Skema warna toko (Merah Marun & Kuning Emas), dukungan Dark Mode toggle di halaman Pengaturan, serta animasi custom dengan AnimationController.

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
