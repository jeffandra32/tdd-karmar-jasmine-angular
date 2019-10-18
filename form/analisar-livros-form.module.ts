import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TextMaskModule } from 'angular2-text-mask';

import { AnalisarLivrosFormComponent } from './analisar-livros-form.component';

@NgModule({
  imports: [
    CommonModule,
    TextMaskModule,
    ReactiveFormsModule
  ],
  declarations: [
    AnalisarLivrosFormComponent
  ],
  exports: [
    AnalisarLivrosFormComponent
  ]
})
export class AnalisarLivrosFormModule { }
