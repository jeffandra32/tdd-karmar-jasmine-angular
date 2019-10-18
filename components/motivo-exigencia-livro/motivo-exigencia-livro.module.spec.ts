import { TestBed } from '@angular/core/testing';
import { MotivoExigenciaLivroModule } from './motivo-exigencia-livro.module';
describe('MotivoExigenciaLivroModule', () => {
  let pipe: MotivoExigenciaLivroModule;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [MotivoExigenciaLivroModule] });
    pipe = TestBed.get(MotivoExigenciaLivroModule);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
