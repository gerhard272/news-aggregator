import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-articolo-card',
  imports: [RouterLink, DatePipe, SlicePipe, TitleCasePipe, UpperCasePipe],
  templateUrl: './articolo-card.html',
  styleUrl: './articolo-card.css',
})
export class ArticoloCard {
  // Quando l'interfaccia Articolo sarà pronta, cambiare "any" in "Articolo"
  articolo = input.required<any>();
  preferito = input(false);
  togglePreferito = output<any>();

  onTogglePreferito(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.togglePreferito.emit(this.articolo());
  }
}
