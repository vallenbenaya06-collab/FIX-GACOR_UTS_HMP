import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
  standalone: false,
})
export class ProfilPage implements OnInit {
  totalProduk: number = 0;
  totalTransaksi: number = 0;

  constructor(
    private productService: ProductService,
    private transactionService: TransactionService
  ) {}

  ngOnInit() {
    this.refreshStats();
  }

  ionViewWillEnter() {
    this.refreshStats();
  }

  refreshStats() {
    this.totalProduk = this.productService.getTotalProductCount();
    this.totalTransaksi = this.transactionService.getTransactions().length;
  }
}
