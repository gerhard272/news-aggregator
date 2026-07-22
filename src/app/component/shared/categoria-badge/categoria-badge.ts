import { Component, input } from '@angular/core';
import { Categoria } from '../../../models/categoria';

@Component({
  selector: 'app-categoria-badge',
  imports: [],
  templateUrl: './categoria-badge.html',
  styleUrl: './categoria-badge.css',
})
export class CategoriaBadge {
  categoria = input.required<Categoria>();
}
