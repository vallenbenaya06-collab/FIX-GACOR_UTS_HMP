import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-produk',
  templateUrl: './produk.page.html',
  styleUrls: ['./produk.page.scss'],
  standalone: false,
})
export class ProdukPage implements OnInit {
  searchQuery: string = '';
  selectedCategory: string = 'Semua';
  categories: string[] = [];
  filteredProducts: Product[] = [];
  totalCartItems: number = 0;
  defaultImage: string = '';

  isAlertOpen: boolean = false;
  alertMessage: string = '';
  public alertButtons: string[] = ['OK'];

  constructor(
    public productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.defaultImage = this.productService.DEFAULT_IMAGE;
    this.refreshCategories();
    this.filterProduk();
  }

  ionViewWillEnter() {
    this.refreshCategories();
    this.filterProduk();
    this.totalCartItems = this.cartService.getTotalItemCount();
  }

  refreshCategories() {
    this.categories = this.productService.getCategories();
  }

  filterProduk() {
    let list = this.productService.getProducts();

    if (this.selectedCategory && this.selectedCategory !== 'Semua') {
      const tempList: Product[] = [];
      for (let i = 0; i < list.length; i++) {
        if (list[i].kategori === this.selectedCategory) {
          tempList.push(list[i]);
        }
      }
      list = tempList;
    }

    if (this.searchQuery && this.searchQuery.trim() !== '') {
      const q = this.searchQuery.toLowerCase().trim();
      const tempList: Product[] = [];
      for (let i = 0; i < list.length; i++) {
        const nama = list[i].nama.toLowerCase();
        const kat = list[i].kategori.toLowerCase();
        if (nama.includes(q) || kat.includes(q)) {
          tempList.push(list[i]);
        }
      }
      list = tempList;
    }

    this.filteredProducts = list;
  }

  addToCart(product: Product, event: Event) {
    event.stopPropagation();

    if (product.stok <= 0) {
      this.alertMessage = 'Maaf, stok barang ini sedang habis!';
      this.isAlertOpen = true;
      return;
    }

    const res = this.cartService.addToCart(product, 1);
    this.totalCartItems = this.cartService.getTotalItemCount();

    this.alertMessage = res.message;
    this.isAlertOpen = true;
  }

  goToDetail(productId: number) {
    this.router.navigate(['/detail-produk', productId]);
  }

  formatRupiah(amount: number): string {
    return 'Rp ' + (amount || 0);
  }
}
