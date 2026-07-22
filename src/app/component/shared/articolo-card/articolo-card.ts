import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Articolo } from '../../../models/articolo';

@Component({
  selector: 'app-articolo-card',
  imports: [RouterLink, DatePipe, SlicePipe, TitleCasePipe, UpperCasePipe],
  templateUrl: './articolo-card.html',
  styleUrl: './articolo-card.css',
})
export class ArticoloCard {

  articolo = input.required<Articolo>();
  preferito = input(false);
  togglePreferito = output<Articolo>();

  onTogglePreferito(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.togglePreferito.emit(this.articolo());
  }
}
