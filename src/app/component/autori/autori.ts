import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Autori as AutoriService } from '../../services/autori';
import { toSignal } from '@angular/core/rxjs-interop';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-autori',
  imports: [RouterOutlet, RouterLink, SlicePipe],
  templateUrl: './autori.html',
  styleUrl: './autori.css',
})
export class Autori {
  private autoriService = inject(AutoriService);
  autori = toSignal(this.autoriService.getAutori(), { initialValue: [] });
}

