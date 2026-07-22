import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  menuAperto = signal(false);

  toggleMenu() {
    this.menuAperto.update(valore => !valore);
  }
}