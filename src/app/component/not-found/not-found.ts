import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css'
})
export class NotFound {
  private readonly route = inject(ActivatedRoute);

  readonly tipo = this.route.snapshot.queryParamMap.get('tipo');

  readonly isArticoloNotFound = this.tipo === 'articolo';
}