import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pengaturan',
  templateUrl: './pengaturan.page.html',
  styleUrls: ['./pengaturan.page.scss'],
  standalone: false,
})
export class PengaturanPage implements OnInit {
  isDarkMode: boolean = false;

  constructor() {}

  ngOnInit() {
    this.isDarkMode = document.documentElement.classList.contains('ion-palette-dark');
  }

  toggleDarkMode(event: any) {
    this.isDarkMode = event.detail.checked;
    document.documentElement.classList.toggle('ion-palette-dark', this.isDarkMode);
  }
}
