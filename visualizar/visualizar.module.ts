import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { LoadingModalModule } from '@voxtecnologia/vox-preload';

import { CardsModule, FlapsModule } from 'lib-cards-genericos';

import { MotivoExigenciaLivroComponent } from '../components/motivo-exigencia-livro/motivo-exigencia-livro.component';
import { MotivoExigenciaLivroModule } from '../components/motivo-exigencia-livro/motivo-exigencia-livro.module';
import { IconModule } from '../../../../projects/lib/lib-shared/src/lib/directives/icon/icon.module';

import { VisualizarRoutingModule } from './visualizar-routing.module';
import { VisualizarComponent } from './visualizar.component';

const entries = [
  MotivoExigenciaLivroComponent
];

CardsModule.entries(entries);
FlapsModule.entries(entries);

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    VisualizarRoutingModule,
    LoadingModalModule,
    MotivoExigenciaLivroModule,
    IconModule,
    CardsModule.forRoot(entries),
    FlapsModule.forRoot(entries)
  ],
  declarations: [
    VisualizarComponent
  ],
  exports: [
    VisualizarComponent
  ]
})
export class VisualizarModule { }
