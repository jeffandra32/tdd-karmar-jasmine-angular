import { TestBed } from '@angular/core/testing';
import { VisualizarModule } from './visualizar.module';
describe('VisualizarModule', () => {
  let pipe: VisualizarModule;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [VisualizarModule] });
    pipe = TestBed.get(VisualizarModule);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
