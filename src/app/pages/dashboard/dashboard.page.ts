import { Component, OnInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { Product, ProductService } from '../../services/product.service';
import { TransactionService } from '../../services/transaction.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage implements OnInit {
  currentDate: Date = new Date();

  // Data ringkasan untuk interpolation binding
  totalProduk: number = 0;
  totalTransaksiHariIni = { count: 0, totalRupiah: 0, totalUntung: 0 };
  produkTerlaris: { nama: string; totalTerjual: number } | null = null;
  criticalStockProducts: Product[] = [];
  totalCartItems: number = 0;

  constructor(
    public productService: ProductService,
    private transactionService: TransactionService,
    private cartService: CartService,
    private animationCtrl: AnimationController
  ) {}

  ngOnInit() {
    this.refreshDashboardData();
  }

  // Lifecycle Ionic: dipanggil setiap kali tab dashboard aktif/dibuka kembali
  ionViewWillEnter() {
    this.refreshDashboardData();
  }

  // Lifecycle Ionic: menjalankan animasi custom saat halaman selesai ditampilkan
  ionViewDidEnter() {
    this.playDashboardAnimation();
  }

  refreshDashboardData() {
    this.totalProduk = this.productService.getTotalProductCount();
    this.totalTransaksiHariIni = this.transactionService.getTotalTransaksiHariIni();
    this.produkTerlaris = this.transactionService.getProdukTerlaris();
    this.totalCartItems = this.cartService.getTotalItemCount();

    const prods = this.productService.getProducts();
    const critical: Product[] = [];
    for (let i = 0; i < prods.length; i++) {
      if (prods[i].stok <= 5) {
        critical.push(prods[i]);
      }
    }
    this.criticalStockProducts = critical;
  }

  // Format tanggal Indonesia tanpa if/switch menggunakan array
  today_ind(): string {
    const dH = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const dB = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    const d = dH[this.currentDate.getDay()];
    const m = dB[this.currentDate.getMonth()];
    return `${d}, ${this.currentDate.getDate()} ${m} ${this.currentDate.getFullYear()}`;
  }

  // Animasi custom menggunakan AnimationController
  playDashboardAnimation() {
    const cardEl = document.querySelector('#dashboardHeaderCard') as HTMLElement;
    if (cardEl) {
      const animation = this.animationCtrl
        .create()
        .addElement(cardEl)
        .duration(600)
        .easing('ease-out')
        .fromTo('opacity', '0', '1')
        .fromTo('transform', 'translateY(15px)', 'translateY(0px)');
      animation.play();
    }
  }

  formatRupiah(amount: number): string {
    return 'Rp ' + (amount || 0);
  }
}
