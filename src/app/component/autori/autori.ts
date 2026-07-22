import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { SlicePipe } from '@angular/common';
import { Autori as AutoriService } from '../../services/autori';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-autori',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, SlicePipe],
  templateUrl: './autori.html',
  styleUrl: './autori.css',
})
export class Autori {
  private autoriService = inject(AutoriService);
  autori = toSignal(this.autoriService.getAutori(), { initialValue: [] });
}

