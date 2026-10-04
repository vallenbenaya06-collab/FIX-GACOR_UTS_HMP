import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { CartItem, CartService } from './cart.service';

export interface TransactionItem {
  productId: number;
  nama: string;
  hargaBeli: number;
  hargaJual: number;
  kuantitas: number;
  subtotal: number;
}

export interface Transaction {
  id: string;
  tanggal: Date;
  items: TransactionItem[];
  totalBayar: number;
  totalUntung: number;
  metodePembayaran: string;
  catatan?: string;
}

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  public transactions: Transaction[] = [
    {
      id: 'TRX-20260922-001',
      tanggal: new Date(),
      items: [
        {
          productId: 5,
          nama: 'Indomie Goreng Original',
          hargaBeli: 2800,
          hargaJual: 3500,
          kuantitas: 10,
          subtotal: 35000
        },
        {
          productId: 6,
          nama: 'Kopi Kapal Api Special Mix',
          hargaBeli: 1400,
          hargaJual: 2000,
          kuantitas: 5,
          subtotal: 10000
        }
      ],
      totalBayar: 45000,
      totalUntung: 10000,
      metodePembayaran: 'Tunai',
      catatan: 'Pelanggan tetangga warung'
    },
    {
      id: 'TRX-20260922-002',
      tanggal: new Date(),
      items: [
        {
          productId: 2,
          nama: 'Minyak Goreng Bimoli 2L',
          hargaBeli: 32000,
          hargaJual: 36500,
          kuantitas: 1,
          subtotal: 36500
        },
        {
          productId: 3,
          nama: 'Gula Pasir Gulaku 1kg',
          hargaBeli: 15000,
          hargaJual: 17500,
          kuantitas: 2,
          subtotal: 35000
        }
      ],
      totalBayar: 71500,
      totalUntung: 9500,
      metodePembayaran: 'QRIS',
      catatan: 'Pembayaran non-tunai'
    }
  ];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  getTransactions(): Transaction[] {
    return this.transactions;
  }

  getTransactionById(id: string): Transaction | undefined {
    for (let i = 0; i < this.transactions.length; i++) {
      if (this.transactions[i].id === id) {
        return this.transactions[i];
      }
    }
    return undefined;
  }

  checkout(items: CartItem[], metodePembayaran: string = 'Tunai', catatan: string = ''): Transaction {
    const now = new Date();
    const dateStr = '' + now.getFullYear() + (now.getMonth() + 1) + now.getDate();
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const trxId = 'TRX-' + dateStr + '-' + randomSuffix;

    let totalBayar = 0;
    let totalUntung = 0;
    const trxItems: TransactionItem[] = [];

    for (let i = 0; i < items.length; i++) {
      const cartItem = items[i];
      const subtotal = cartItem.product.hargaJual * cartItem.kuantitas;
      const profit = (cartItem.product.hargaJual - cartItem.product.hargaBeli) * cartItem.kuantitas;
      totalBayar += subtotal;
      totalUntung += profit;

      this.productService.reduceStock(cartItem.product.id, cartItem.kuantitas);

      trxItems.push({
        productId: cartItem.product.id,
        nama: cartItem.product.nama,
        hargaBeli: cartItem.product.hargaBeli,
        hargaJual: cartItem.product.hargaJual,
        kuantitas: cartItem.kuantitas,
        subtotal: subtotal
      });
    }

    const newTransaction: Transaction = {
      id: trxId,
      tanggal: now,
      items: trxItems,
      totalBayar: totalBayar,
      totalUntung: totalUntung,
      metodePembayaran: metodePembayaran,
      catatan: catatan
    };

    const listBaru: Transaction[] = [newTransaction];
    for (let i = 0; i < this.transactions.length; i++) {
      listBaru.push(this.transactions[i]);
    }
    this.transactions = listBaru;
    this.cartService.clearCart();
    return newTransaction;
  }

  getTotalTransaksiHariIni(): { count: number; totalRupiah: number; totalUntung: number } {
    const todayStr = new Date().toDateString();
    let count = 0;
    let totalRupiah = 0;
    let totalUntung = 0;

    for (let i = 0; i < this.transactions.length; i++) {
      const t = this.transactions[i];
      if (new Date(t.tanggal).toDateString() === todayStr) {
        count++;
        totalRupiah += t.totalBayar;
        totalUntung += (t.totalUntung || 0);
      }
    }

    return { count, totalRupiah, totalUntung };
  }

  getProdukTerlaris(): { nama: string; totalTerjual: number } | null {
    if (this.transactions.length === 0) return null;

    const salesMap: { [nama: string]: number } = {};
    for (let i = 0; i < this.transactions.length; i++) {
      const trx = this.transactions[i];
      for (let j = 0; j < trx.items.length; j++) {
        const item = trx.items[j];
        if (salesMap[item.nama]) {
          salesMap[item.nama] += item.kuantitas;
        } else {
          salesMap[item.nama] = item.kuantitas;
        }
      }
    }

    let topProduct: string | null = null;
    let maxQty = 0;

    for (const nama in salesMap) {
      if (salesMap[nama] > maxQty) {
        maxQty = salesMap[nama];
        topProduct = nama;
      }
    }

    if (!topProduct) return null;

    return {
      nama: topProduct,
      totalTerjual: maxQty
    };
  }
}
