import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Categorie } from '../../services/categorie';
import { Categoria } from '../../models/categoria';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-scrivi',
  imports: [ReactiveFormsModule],
  templateUrl: './scrivi.html',
  styleUrl: './scrivi.css'
})
export class Scrivi {
  private fb = inject(FormBuilder);
  private categorieService = inject(Categorie);
  
  inviato = false;
  categorieDisponibili = toSignal(this.categorieService.getCategorie(), { initialValue: [] });

  segnalazioneForm = this.fb.group({
    nome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    categoria: ['', Validators.required],
    titoloNotizia: ['', Validators.required],
    descrizione: ['', [Validators.required, Validators.minLength(10)]],
    urgenza: ['bassa', Validators.required]
  });

  invia() {
    if (this.segnalazioneForm.valid) {
      this.inviato = true;
      console.log('Segnalazione inviata:', this.segnalazioneForm.value);
      this.segnalazioneForm.reset({ urgenza: 'bassa' }); // Resetta con valore di default
      
      setTimeout(() => {
        this.inviato = false;
      }, 4000);
    } else {
      this.segnalazioneForm.markAllAsTouched();
    }
  }
}
