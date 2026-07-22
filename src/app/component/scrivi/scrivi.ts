import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-scrivi',
  imports: [ReactiveFormsModule],
  templateUrl: './scrivi.html',
  styleUrl: './scrivi.css'
})
export class Scrivi {
  private fb = inject(FormBuilder);
  inviato = false;

  segnalazioneForm = this.fb.group({
    nome: ['', Validators.required],
    cognome: ['', Validators.required],
    telefono: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    commento: ['', [Validators.required, Validators.minLength(10)]]
  });

  invia() {
    if (this.segnalazioneForm.valid) {
      this.inviato = true;
      console.log('Form inviato:', this.segnalazioneForm.value);
      this.segnalazioneForm.reset();
      
      // Nasconde il messaggio di successo dopo 4 secondi
      setTimeout(() => {
        this.inviato = false;
      }, 4000);
    } else {
      // Segna tutti i campi come touched per mostrare gli errori rossi
      this.segnalazioneForm.markAllAsTouched();
    }
  }
}
