import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';

import { HttpUtil, UrlUtilService, RespostaPesquisa } from 'lib-shared';

import { catchError } from 'rxjs/operators';

import { PesquisaForm } from './pesquisa-form.interface';

@Injectable({
  providedIn: 'root'
})
export class AnalisarLivrosFormService {

  /**
   *Creates an instance of AnalisarLivrosFormService.
   * @param {HttpClient} http
   * @param {UrlUtilService} urlUtilService
   * @memberof AnalisarLivrosFormService
   */
  constructor(
    private http: HttpClient,
    private urlUtilService: UrlUtilService
  ) {

  }

  /**
   * @param {PesquisaForm} parameters
   * @returns {Observable<any>}
   * @memberof AnalisarLivrosFormService
   */
  public pesquisarEmpresa(parameters: PesquisaForm): Observable<any> {
    parameters.cnpj = this.formataParametro(parameters.cnpj);
    parameters.numeroArquivamento = this.formataParametro(parameters.numeroArquivamento);

    const url = this.urlUtilService.montarUrlApi('/listar-processos', parameters);

    return this.http.get<RespostaPesquisa>(url, { withCredentials: true, responseType: 'json' })
      .pipe(catchError((error: HttpErrorResponse) => HttpUtil.tratarErro(error)));
  }

  public formataParametro(value: string): string {
    return value && value.replace(/\D*/g, '');
  }

  /**
   * @returns {Observable<any>}
   * @memberof AnalisarLivrosFormService
   */
  public listarEmpresa(): Observable<any> {
    const url = this.urlUtilService.montarUrlApi('/listar-processos');

    return this.http.get<RespostaPesquisa>(url, { withCredentials: true, responseType: 'json' })
      .pipe(catchError((error: HttpErrorResponse) => HttpUtil.tratarErro(error)));
  }

  /**
   * @param {*} dados
   * @returns {Observable<any>}
   * @memberof AnalisarLivrosFormService
   */
  public atribuirProcesso(dados: any): Observable<any> {
    const url = this.urlUtilService.montarUrlApi('/atribuir-processo');

    return this.http.post<any>(url, JSON.stringify(dados), { withCredentials: true, responseType: 'json' })
      .pipe(catchError((error: HttpErrorResponse) => HttpUtil.tratarErro(error)));

  }


}
