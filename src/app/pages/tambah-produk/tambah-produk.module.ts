import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TambahProdukPageRoutingModule } from './tambah-produk-routing.module';
import { TambahProdukPage } from './tambah-produk.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TambahProdukPageRoutingModule
  ],
  declarations: [TambahProdukPage]
})
export class TambahProdukPageModule {}
