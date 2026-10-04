import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem, CartService } from '../../services/cart.service';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-keranjang',
  templateUrl: './keranjang.page.html',
  styleUrls: ['./keranjang.page.scss'],
  standalone: false,
})
export class KeranjangPage implements OnInit {
  cartItems: CartItem[] = [];
  metodePembayaran: string = 'Tunai';
  catatanTransaksi: string = '';

  totalBelanja: number = 0;
  totalItemsCount: number = 0;

  isAlertOpen: boolean = false;
  alertHeader: string = '';
  alertMessage: string = '';
  public alertButtons: string[] = ['OK'];

  constructor(
    public cartService: CartService,
    private transactionService: TransactionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.refreshCart();
  }

  ionViewWillEnter() {
    this.refreshCart();
  }

  refreshCart() {
    this.cartItems = this.cartService.getCart();
    this.totalBelanja = this.cartService.getTotalBelanja();
    this.totalItemsCount = this.cartService.getTotalItemCount();
  }

  incrementQty(item: CartItem) {
    if (item.kuantitas >= item.product.stok) {
      this.alertHeader = 'Stok Terbatas';
      this.alertMessage = 'Maksimal stok tersedia hanya ' + item.product.stok + ' unit!';
      this.isAlertOpen = true;
      return;
    }
    this.cartService.updateQuantity(item.product.id, item.kuantitas + 1, item.product.stok);
    this.refreshCart();
  }

  decrementQty(item: CartItem) {
    if (item.kuantitas <= 1) {
      this.cartService.removeFromCart(item.product.id);
      this.refreshCart();
    } else {
      this.cartService.updateQuantity(item.product.id, item.kuantitas - 1, item.product.stok);
      this.refreshCart();
    }
  }

  removeItemSliding(productId: number) {
    this.cartService.removeFromCart(productId);
    this.refreshCart();
  }

  clearAllCart() {
    if (this.cartItems.length === 0) return;
    this.cartService.clearCart();
    this.refreshCart();
    this.alertHeader = 'Keranjang Dikosongkan';
    this.alertMessage = 'Semua barang di keranjang telah berhasil dihapus.';
    this.isAlertOpen = true;
  }

  konfirmasiTransaksi() {
    if (this.cartItems.length === 0) {
      this.alertHeader = 'Keranjang Kosong';
      this.alertMessage = 'Keranjang belanja masih kosong!';
      this.isAlertOpen = true;
      return;
    }

    const trx = this.transactionService.checkout(
      this.cartItems,
      this.metodePembayaran,
      this.catatanTransaksi
    );

    this.refreshCart();
    this.catatanTransaksi = '';

    this.alertHeader = 'Transaksi Berhasil';
    this.alertMessage = 'Transaksi berhasil disimpan dengan No. Nota: ' + trx.id;
    this.isAlertOpen = true;
  }

  onAlertDismiss() {
    this.isAlertOpen = false;
    if (this.alertHeader === 'Transaksi Berhasil') {
      this.router.navigate(['/tabs/transaksi']);
    }
  }

  formatRupiah(amount: number): string {
    return 'Rp ' + (amount || 0);
  }
}
