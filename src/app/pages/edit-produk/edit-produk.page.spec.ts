import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditProdukPage } from './edit-produk.page';

describe('EditProdukPage', () => {
  let component: EditProdukPage;
  let fixture: ComponentFixture<EditProdukPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProdukPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
