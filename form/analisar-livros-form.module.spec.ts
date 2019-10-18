import { AnalisarLivrosFormModule } from './analisar-livros-form.module';

describe('AnalisarLivrosFormModule', () => {
  let analisarLivrosFormModule: AnalisarLivrosFormModule;

  beforeEach(() => {
    analisarLivrosFormModule = new AnalisarLivrosFormModule();
  });

  it('should create an instance', () => {
    expect(analisarLivrosFormModule).toBeTruthy();
  });
});
