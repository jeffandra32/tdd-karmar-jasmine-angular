export interface PesquisaForm {
  cnpj: string;
  limit: number;
  nomeEmpresarial: string;
  numeroArquivamento: string;
  numeroRegistro: string;
  offset: number;
  protocolo?: string;
}
