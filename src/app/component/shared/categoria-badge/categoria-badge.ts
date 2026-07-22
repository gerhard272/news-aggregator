import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Categoria } from '../../../models/categoria';

@Component({
  selector: 'app-categoria-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categoria-badge.html',
  styleUrl: './categoria-badge.css',
})
export class CategoriaBadge {
  categoria = input.required<Categoria>();
}
