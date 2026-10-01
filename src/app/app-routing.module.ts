import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'detail-produk/:id',
    loadChildren: () => import('./pages/detail-produk/detail-produk.module').then(m => m.DetailProdukPageModule)
  },
  {
    path: 'tambah-produk',
    loadChildren: () => import('./pages/tambah-produk/tambah-produk.module').then(m => m.TambahProdukPageModule)
  },
  {
    path: 'edit-produk/:id',
    loadChildren: () => import('./pages/edit-produk/edit-produk.module').then(m => m.EditProdukPageModule)
  },
  {
    path: 'keranjang',
    loadChildren: () => import('./pages/keranjang/keranjang.module').then(m => m.KeranjangPageModule)
  },
  {
    path: 'detail-transaksi/:id',
    loadChildren: () => import('./pages/detail-transaksi/detail-transaksi.module').then(m => m.DetailTransaksiPageModule)
  },
  {
    path: 'pengaturan',
    loadChildren: () => import('./pages/pengaturan/pengaturan.module').then(m => m.PengaturanPageModule)
  },
  {
    path: 'tentang',
    loadChildren: () => import('./pages/tentang/tentang.module').then(m => m.TentangPageModule)
  },
  {
    path: '**',
    redirectTo: 'tabs'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
