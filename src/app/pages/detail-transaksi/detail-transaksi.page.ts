import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Transaction, TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-detail-transaksi',
  templateUrl: './detail-transaksi.page.html',
  styleUrls: ['./detail-transaksi.page.scss'],
  standalone: false,
})
export class DetailTransaksiPage implements OnInit {
  trxId: string = '';
  transaction?: Transaction;

  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.trxId = params['id'];
      this.transaction = this.transactionService.getTransactionById(this.trxId);
    });
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
