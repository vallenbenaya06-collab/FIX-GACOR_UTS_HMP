# SIMOBILE - Sistem Kasir Mobile Toko Makmur Jaya

Aplikasi kasir mobile offline untuk toko kelontong **Toko Makmur Jaya** (Bu Marni), dibuat dengan **Ionic + Angular** sebagai project UTS mata kuliah Hybrid Mobile Programming (HMP), Universitas Surabaya, Gasal 2026/2027.

## Anggota Kelompok

| Nama | NRP |
| :--- | :--- |
| Vallen Benaya Nangoi | 160424168 |
| Michael Jonathan Candra | 160424169 |
| Robert Valdino Tjahyono | 160424177 |
| Steven Hans Fielo | 160424171 |

## Latar Belakang

Bu Marni masih mencatat penjualan secara manual, sering kesulitan memantau stok, dan tidak tahu produk mana yang paling laris. Karena sinyal internet di toko kurang stabil dan belum memiliki server/database khusus, SIMOBILE dirancang untuk mencatat seluruh transaksi kasir secara instan di dalam memori aplikasi (in-memory state) tanpa ketergantungan koneksi internet.

## Fitur Aplikasi (Sesuai Ketentuan UTS Poin 1 - 8)

- **Navigasi Utama (Poin 1):** 4 tab utama (Dashboard, Produk, Transaksi, Profil) yang dibungkus oleh Drawer/Side Menu (Pengaturan, Tentang Aplikasi).
- **Dashboard Toko (Poin 2):** Ringkasan jumlah produk, total transaksi & omzet hari ini, serta produk terlaris menggunakan data binding interpolation.
- **Pencarian Produk Real-Time (Poin 3):** Cari produk otomatis memfilter katalog saat mengetik (two-way binding `[(ngModel)]`) tanpa tombol submit, dilengkapi filter segment kategori.
- **Detail Produk (Poin 4 & 5):** Navigasi via route parameter (`:id`), informasi stok, harga beli, harga jual, margin keuntungan, fallback gambar default jika foto kosong, dan tombol otomatis ter-disable jika stok habis.
- **Manajemen Produk (Poin 6):** Form Tambah & Edit Produk berbasis Reactive Forms (`FormGroup`), validasi input, serta deteksi peringatan harga rugi (jika harga jual <= harga beli).
- **Keranjang & Checkout Kasir (Poin 7):** Manajemen kuantitas barang, swipe-to-delete, pilihan metode pembayaran, konfirmasi transaksi, dan pemotongan stok otomatis di katalog.
- **Riwayat Transaksi (Poin 7):** Daftar nota transaksi penjualan beserta rincian lengkap barang yang terjual.
- **Tema & Mode Gelap (Poin 8):** Skema warna toko (Merah Marun & Kuning Emas), dukungan Dark Mode toggle di halaman Pengaturan, serta animasi custom dengan `AnimationController`.

## Teknologi & Arsitektur

- **Framework:** Ionic 8 & Angular (NgModule)
- **State & Data Management:** Pure In-Memory Service (`ProductService`, `CartService`, `TransactionService`)
- **Forms:** Reactive Forms (`FormGroup`, `FormBuilder`)
- **UI Components:** Ionic UI Components (`ion-tabs`, `ion-menu`, `ion-alert`, `ion-card`, `ion-segment`, `ion-item-sliding`)
- **Animation:** `AnimationController`

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

## Struktur Folder

```
src/app/
├── pages/
│   ├── tabs/              # Container 4 tab utama
│   ├── dashboard/
│   ├── produk/
│   ├── transaksi/
│   ├── profil/
│   ├── detail-produk/
│   ├── tambah-produk/
│   ├── edit-produk/
│   ├── keranjang/
│   ├── detail-transaksi/
│   ├── pengaturan/
│   └── tentang/
├── services/
│   ├── product.service.ts
│   ├── cart.service.ts
│   └── transaction.service.ts
├── app-routing.module.ts
└── app.component.*        # Side menu & root outlet
src/theme/variables.scss   # Palet warna dan Dark Mode
```
