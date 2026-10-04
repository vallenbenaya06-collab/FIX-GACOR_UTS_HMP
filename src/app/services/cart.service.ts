import { Injectable } from '@angular/core';
import { Product } from './product.service';

export interface CartItem {
  product: Product;
  kuantitas: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public items: CartItem[] = [];

  constructor() {}

  getCart(): CartItem[] {
    return this.items;
  }

  addToCart(product: Product, kuantitas: number = 1): { success: boolean; message: string } {
    if (product.stok <= 0) {
      return { success: false, message: 'Stok barang habis!' };
    }

    let existingIndex = -1;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].product.id === product.id) {
        existingIndex = i;
        break;
      }
    }

    if (existingIndex !== -1) {
      const currentQty = this.items[existingIndex].kuantitas;
      if (currentQty + kuantitas > product.stok) {
        return { 
          success: false, 
          message: `Maksimal stok tersedia hanya ${product.stok} unit!` 
        };
      }
      this.items[existingIndex].kuantitas += kuantitas;
    } else {
      if (kuantitas > product.stok) {
        return { 
          success: false, 
          message: `Maksimal stok tersedia hanya ${product.stok} unit!` 
        };
      }
      this.items.push({
        product: product,
        kuantitas: kuantitas
      });
    }

    return { success: true, message: `${product.nama} berhasil ditambahkan ke keranjang.` };
  }

  updateQuantity(productId: number, newQty: number, maxStock: number): boolean {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].product.id === productId) {
        if (newQty <= 0) {
          this.removeFromCart(productId);
          return true;
        }
        if (newQty > maxStock) {
          return false;
        }
        this.items[i].kuantitas = newQty;
        return true;
      }
    }
    return false;
  }

  removeFromCart(productId: number): void {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].product.id === productId) {
        this.items.splice(i, 1);
        break;
      }
    }
  }

  clearCart(): void {
    this.items = [];
  }

  getTotalItemCount(): number {
    let total = 0;
    for (let i = 0; i < this.items.length; i++) {
      total += this.items[i].kuantitas;
    }
    return total;
  }

  getTotalBelanja(): number {
    let total = 0;
    for (let i = 0; i < this.items.length; i++) {
      total += this.items[i].product.hargaJual * this.items[i].kuantitas;
    }
    return total;
  }
}
