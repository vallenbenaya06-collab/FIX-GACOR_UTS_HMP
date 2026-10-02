import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { Product, ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-detail-produk',
  templateUrl: './detail-produk.page.html',
  styleUrls: ['./detail-produk.page.scss'],
  standalone: false,
})
export class DetailProdukPage implements OnInit {
  productId: number = 0;
  product?: Product;
  defaultImage: string = '';
  totalCartItems: number = 0;

  profitPerUnit: number = 0;
  profitMarginPercent: string = '0';
  totalPotentialProfit: number = 0;

  isAlertOpen: boolean = false;
  alertHeader: string = '';
  alertMessage: string = '';
  alertButtons: any[] = ['OK'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public productService: ProductService,
    private cartService: CartService,
    private animationCtrl: AnimationController
  ) {}

  ngOnInit() {
    this.defaultImage = this.productService.DEFAULT_IMAGE;
    this.route.params.subscribe(params => {
      this.productId = Number(params['id']);
      this.loadProduct();
    });
  }

  ionViewWillEnter() {
    this.loadProduct();
    this.totalCartItems = this.cartService.getTotalItemCount();
  }

  ionViewDidEnter() {
    this.playImageAnimation();
  }

  loadProduct() {
    this.product = this.productService.getProductById(this.productId);
    if (this.product) {
      this.profitPerUnit = this.product.hargaJual - this.product.hargaBeli;
      if (this.product.hargaBeli > 0) {
        const percent = ((this.product.hargaJual - this.product.hargaBeli) / this.product.hargaBeli) * 100;
        this.profitMarginPercent = percent.toFixed(1);
      } else {
        this.profitMarginPercent = '0';
      }
      this.totalPotentialProfit = this.profitPerUnit * this.product.stok;
    }
  }

  playImageAnimation() {
    const imgEl = document.querySelector('#detailProductImage') as HTMLElement;
    if (imgEl) {
      const animation = this.animationCtrl
        .create()
        .addElement(imgEl)
        .duration(500)
        .easing('ease-out')
        .fromTo('opacity', '0.4', '1')
        .fromTo('transform', 'scale(0.95)', 'scale(1)');
      animation.play();
    }
  }

  addToCart() {
    if (!this.product || this.product.stok <= 0) {
      this.alertHeader = 'Stok Kosong';
      this.alertMessage = 'Stok barang sedang kosong!';
      this.alertButtons = ['OK'];
      this.isAlertOpen = true;
      return;
    }

    const res = this.cartService.addToCart(this.product, 1);
    this.totalCartItems = this.cartService.getTotalItemCount();

    this.alertHeader = res.success ? 'Berhasil' : 'Perhatian';
    this.alertMessage = res.message;
    this.alertButtons = ['OK'];
    this.isAlertOpen = true;
  }

  goToEdit() {
    this.router.navigate(['/edit-produk', this.productId]);
  }

  confirmDelete() {
    this.alertHeader = 'Konfirmasi Hapus';
    this.alertMessage = 'Apakah Anda yakin ingin menghapus produk "' + (this.product ? this.product.nama : '') + '" dari katalog?';
    this.alertButtons = [
      {
        text: 'Batal',
        role: 'cancel'
      },
      {
        text: 'Hapus',
        role: 'destructive',
        handler: () => {
          this.productService.deleteProduct(this.productId);
          this.router.navigate(['/tabs/produk']);
        }
      }
    ];
    this.isAlertOpen = true;
  }

  onAlertDismiss() {
    this.isAlertOpen = false;
  }

  formatRupiah(amount: number): string {
    return 'Rp ' + (amount || 0);
  }
}
