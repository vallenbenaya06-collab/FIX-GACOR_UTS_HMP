import { Injectable } from '@angular/core';

export interface Product {
  id: number;
  nama: string;
  kategori: string;
  hargaBeli: number;
  hargaJual: number;
  stok: number;
  foto: string;
  deskripsi: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // Placeholder default jika produk belum memiliki foto
  public readonly DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80';

  public products: Product[] = [
    {
      id: 1,
      nama: 'Beras Rojolele 5kg',
      kategori: 'Sembako',
      hargaBeli: 65000,
      hargaJual: 74000,
      stok: 15,
      foto: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80',
      deskripsi: 'Beras pulen kualitas super kemasan 5 kg bersih tanpa pemutih.'
    },
    {
      id: 2,
      nama: 'Minyak Goreng Bimoli 2L',
      kategori: 'Sembako',
      hargaBeli: 32000,
      hargaJual: 36500,
      stok: 24,
      foto: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80',
      deskripsi: 'Minyak kelapa sawit murni kemasan pouch 2 Liter berkualitas tinggi.'
    },
    {
      id: 3,
      nama: 'Gula Pasir Gulaku 1kg',
      kategori: 'Sembako',
      hargaBeli: 15000,
      hargaJual: 17500,
      stok: 30,
      foto: 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?auto=format&fit=crop&w=400&q=80',
      deskripsi: 'Gula tebu murni butiran putih higienis 1 Kilogram.'
    },
    {
      id: 4,
      nama: 'Telur Ayam Ras 1kg',
      kategori: 'Sembako',
      hargaBeli: 26000,
      hargaJual: 29000,
      stok: 0, // STOK HABIS untuk menguji [disabled]="product.stok <= 0"
      foto: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=400&q=80',
      deskripsi: 'Telur ayam negeri segar pilihan, isi sekitar 16 butir per kg. (Stok sedang kosong).'
    },
    {
      id: 5,
      nama: 'Indomie Goreng Original',
      kategori: 'Makanan Ringan',
      hargaBeli: 2800,
      hargaJual: 3500,
      stok: 85,
      foto: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=400&q=80',
      deskripsi: 'Mi instan goreng legendaris dengan bumbu rempah khas Indonesia.'
    },
    {
      id: 6,
      nama: 'Kopi Kapal Api Special Mix',
      kategori: 'Minuman',
      hargaBeli: 1400,
      hargaJual: 2000,
      stok: 60,
      foto: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80',
      deskripsi: 'Kopi bubuk instan campur gula sachet praktis harum nikmat.'
    },
    {
      id: 7,
      nama: 'Teh Celup Sariwangi Kotak',
      kategori: 'Minuman',
      hargaBeli: 6500,
      hargaJual: 8000,
      stok: 18,
      foto: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=400&q=80',
      deskripsi: 'Teh hitam aroma melati celup isi 25 kantong sari wangi.'
    },
    {
      id: 8,
      nama: 'Susu Kental Manis Frisian Flag',
      kategori: 'Minuman',
      hargaBeli: 10500,
      hargaJual: 12500,
      stok: 22,
      foto: '', // FOTO KOSONG untuk menguji fallback gambar default
      deskripsi: 'Susu kental manis kaleng rasa vanila creamy untuk berbagai minuman.'
    },
    {
      id: 9,
      nama: 'Sabun Cuci Piring Sunlight 700ml',
      kategori: 'Kebersihan',
      hargaBeli: 13000,
      hargaJual: 15500,
      stok: 14,
      foto: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=400&q=80',
      deskripsi: 'Cairan pencuci piring ekstrak jeruk nipis efektif angkat lemak membandel.'
    },
    {
      id: 10,
      nama: 'Deterjen Rinso Molto 800g',
      kategori: 'Kebersihan',
      hargaBeli: 19000,
      hargaJual: 22500,
      stok: 12,
      foto: '', // FOTO KOSONG untuk menguji fallback gambar default
      deskripsi: 'Deterjen bubuk anti noda dan pewangi lembut kesegaran bunga.'
    },
    {
      id: 11,
      nama: 'Biskuit Roma Kelapa 300g',
      kategori: 'Makanan Ringan',
      hargaBeli: 9000,
      hargaJual: 11000,
      stok: 25,
      foto: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=400&q=80',
      deskripsi: 'Biskuit rasa kelapa gurih dan renyah cocok untuk teman minum kopi atau teh.'
    },
    {
      id: 12,
      nama: 'Kecap Manis Bango 550ml',
      kategori: 'Sembako',
      hargaBeli: 21000,
      hargaJual: 24500,
      stok: 0, // STOK HABIS untuk variasi pengujian
      foto: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=400&q=80',
      deskripsi: 'Kecap manis kedelai hitam malika kental alami gurih meresap.'
    }
  ];

  constructor() {}

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id == id) {
        return this.products[i];
      }
    }
    return undefined;
  }

  addProduct(newProduct: any): void {
    let maxId = 0;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id > maxId) {
        maxId = this.products[i].id;
      }
    }
    const nextId = maxId + 1;

    const item: Product = {
      id: nextId,
      nama: newProduct.nama,
      kategori: newProduct.kategori,
      hargaBeli: Number(newProduct.hargaBeli),
      hargaJual: Number(newProduct.hargaJual),
      stok: Number(newProduct.stok),
      foto: newProduct.foto ? newProduct.foto.trim() : '',
      deskripsi: newProduct.deskripsi ? newProduct.deskripsi.trim() : ''
    };

    this.products.push(item);
  }

  updateProduct(id: number, updatedData: any): boolean {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id == id) {
        this.products[i].nama = updatedData.nama;
        this.products[i].kategori = updatedData.kategori;
        this.products[i].hargaBeli = Number(updatedData.hargaBeli);
        this.products[i].hargaJual = Number(updatedData.hargaJual);
        this.products[i].stok = Number(updatedData.stok);
        this.products[i].foto = updatedData.foto ? updatedData.foto.trim() : '';
        this.products[i].deskripsi = updatedData.deskripsi ? updatedData.deskripsi.trim() : '';
        return true;
      }
    }
    return false;
  }

  deleteProduct(id: number): boolean {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id == id) {
        this.products.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  reduceStock(id: number, qty: number): boolean {
    const product = this.getProductById(id);
    if (product && product.stok >= qty) {
      product.stok -= qty;
      return true;
    }
    return false;
  }

  restoreStock(id: number, qty: number): void {
    const product = this.getProductById(id);
    if (product) {
      product.stok += qty;
    }
  }

  getTotalProductCount(): number {
    return this.products.length;
  }

  getCategories(): string[] {
    const categories: string[] = ['Semua'];
    for (let i = 0; i < this.products.length; i++) {
      const kat = this.products[i].kategori;
      if (!categories.includes(kat)) {
        categories.push(kat);
      }
    }
    return categories;
  }
}
