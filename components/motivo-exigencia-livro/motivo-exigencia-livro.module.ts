import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoxFormModule } from 'vox-form';

import { IconModule } from '../../../../../projects/lib/lib-shared/src/lib/directives/icon/icon.module';

import { MotivoExigenciaLivroComponent } from './motivo-exigencia-livro.component';

@NgModule({
  imports: [
    CommonModule,
    VoxFormModule,
    IconModule
  ],
  declarations: [
    MotivoExigenciaLivroComponent
  ],
  exports:  [
    MotivoExigenciaLivroComponent
  ],
})
export class MotivoExigenciaLivroModule { }
