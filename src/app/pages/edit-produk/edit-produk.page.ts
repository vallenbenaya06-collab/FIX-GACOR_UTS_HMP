import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductService } from '../../services/product.service';

@Component({
  selector: 'app-edit-produk',
  templateUrl: './edit-produk.page.html',
  styleUrls: ['./edit-produk.page.scss'],
  standalone: false,
})
export class EditProdukPage implements OnInit {
  productId: number = 0;
  product?: Product;
  productForm!: FormGroup;

  categories: string[] = [
    'Sembako',
    'Makanan Ringan',
    'Minuman',
    'Kebersihan',
    'Bumbu Dapur',
    'Lainnya'
  ];

  errorNama: string = '';
  errorHargaBeli: string = '';
  errorHargaJual: string = '';
  errorStok: string = '';
  isPriceLoss: boolean = false;

  isAlertOpen: boolean = false;
  alertHeader: string = '';
  alertMessage: string = '';
  public alertButtons: string[] = ['OK'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.initForm();
    this.route.params.subscribe(params => {
      this.productId = Number(params['id']);
      this.loadProductData();
    });
  }

  private initForm() {
    this.productForm = this.fb.group({
      nama: [''],
      kategori: ['Sembako'],
      hargaBeli: [null],
      hargaJual: [null],
      stok: [0],
      foto: [''],
      deskripsi: ['']
    });
  }

  private loadProductData() {
    this.product = this.productService.getProductById(this.productId);
    if (this.product) {
      this.productForm = this.fb.group({
        nama: [this.product.nama],
        kategori: [this.product.kategori],
        hargaBeli: [this.product.hargaBeli],
        hargaJual: [this.product.hargaJual],
        stok: [this.product.stok],
        foto: [this.product.foto],
        deskripsi: [this.product.deskripsi]
      });
      this.checkPriceLoss();
    }
  }

  checkPriceLoss() {
    const beli = Number(this.productForm.value.hargaBeli || 0);
    const jual = Number(this.productForm.value.hargaJual || 0);
    this.isPriceLoss = beli > 0 && jual > 0 && jual <= beli;
  }

  onSubmit() {
    this.errorNama = '';
    this.errorHargaBeli = '';
    this.errorHargaJual = '';
    this.errorStok = '';

    const val = this.productForm.value;
    let isValid = true;

    if (!val.nama || val.nama.trim().length < 3) {
      this.errorNama = 'Nama barang wajib diisi minimal 3 karakter!';
      isValid = false;
    }
    if (val.hargaBeli === null || val.hargaBeli === '' || Number(val.hargaBeli) <= 0) {
      this.errorHargaBeli = 'Harga beli harus berupa angka lebih dari 0!';
      isValid = false;
    }
    if (val.hargaJual === null || val.hargaJual === '' || Number(val.hargaJual) <= 0) {
      this.errorHargaJual = 'Harga jual harus berupa angka lebih dari 0!';
      isValid = false;
    }
    if (val.stok === null || val.stok === '' || Number(val.stok) < 0) {
      this.errorStok = 'Stok tidak boleh negatif (minimal 0)!';
      isValid = false;
    }

    this.checkPriceLoss();
    if (this.isPriceLoss) {
      this.errorHargaJual =
        'Harga jual tidak boleh lebih kecil atau sama dengan harga beli!';
      isValid = false;
    }

    if (!isValid) {
      this.alertHeader = 'Form Belum Lengkap';
      this.alertMessage = 'Harap perbaiki isian yang masih belum sesuai.';
      this.isAlertOpen = true;
      return;
    }

    const success = this.productService.updateProduct(this.productId, {
      nama: val.nama.trim(),
      kategori: val.kategori,
      hargaBeli: Number(val.hargaBeli),
      hargaJual: Number(val.hargaJual),
      stok: Number(val.stok),
      foto: val.foto ? val.foto.trim() : '',
      deskripsi: val.deskripsi ? val.deskripsi.trim() : ''
    });

    if (success) {
      this.alertHeader = 'Berhasil';
      this.alertMessage = `Data "${val.nama}" berhasil diperbarui!`;
      this.isAlertOpen = true;
    } else {
      this.alertHeader = 'Gagal';
      this.alertMessage = 'Gagal memperbarui data produk.';
      this.isAlertOpen = true;
    }
  }

  onAlertDismiss() {
    this.isAlertOpen = false;
    if (this.alertHeader === 'Berhasil') {
      this.router.navigate(['/detail-produk', this.productId]);
    }
  }
}
