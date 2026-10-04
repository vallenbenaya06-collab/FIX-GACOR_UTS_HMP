import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Transaction, TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-transaksi',
  templateUrl: './transaksi.page.html',
  styleUrls: ['./transaksi.page.scss'],
  standalone: false,
})
export class TransaksiPage implements OnInit {
  transactions: Transaction[] = [];
  totalOmzet: number = 0;
  totalUntung: number = 0;

  constructor(
    private transactionService: TransactionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.refreshTransactions();
  }

  ionViewWillEnter() {
    this.refreshTransactions();
  }

  refreshTransactions() {
    this.transactions = this.transactionService.getTransactions();
    this.calculateTotals();
  }

  calculateTotals() {
    let omzet = 0;
    let untung = 0;
    for (let i = 0; i < this.transactions.length; i++) {
      omzet += this.transactions[i].totalBayar;
      if (this.transactions[i].totalUntung) {
        untung += this.transactions[i].totalUntung;
      }
    }
    this.totalOmzet = omzet;
    this.totalUntung = untung;
  }

  goToDetail(trxId: string) {
    this.router.navigate(['/detail-transaksi', trxId]);
  }

  formatDate(date: any): string {
    const d = new Date(date);
    const daftarHari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const daftarBulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    return daftarHari[d.getDay()] + ', ' + d.getDate() + ' ' + daftarBulan[d.getMonth()] + ' ' + d.getFullYear();
  }

  formatRupiah(amount: number): string {
    return 'Rp ' + (amount || 0);
  }
}
