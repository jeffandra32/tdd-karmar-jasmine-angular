import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';

import { HttpUtil, UrlUtilService } from 'lib-shared';

import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VisualizarService {
  private config: any;

  /**
   *Creates an instance of VisualizarService.
   * @param {HttpClient} http
   * @param {UrlUtilService} urlUtilService
   * @memberof VisualizarService
   */
  constructor(
    private http: HttpClient,
    private urlUtilService: UrlUtilService
  ) {
    this.config = {
      withCredentials: true,
      responseType: 'json'
    };
  }

    /**
  * @param {string} uri
  * @param {*} body
  * @returns {Observable<any>}
  * @memberof VisualizarService
  */
  public requirement(uri: string, body: any): Observable<any> {
    return this.http.post(uri, JSON.stringify(body), this.config).pipe(
      catchError((error: HttpErrorResponse) => HttpUtil.tratarErro(error))
    );
  }

  /**
   * @param {string} id
   * @returns {Observable<any>}
   * @memberof VisualizarService
   */
  public getCards(id: string): Observable<any> {
    const url = this.urlUtilService.montarUrlApi(`/cards/${id}`);
    return this.http.get(url, this.config).pipe(
      catchError((error: HttpErrorResponse) => HttpUtil.tratarErro(error))
    );
  }

  /**
   * @param {string} uri
   * @returns {Observable<any>}
   * @memberof VisualizarService
   */
  public getCard(uri: string): Observable<any> {
    return this.http.get(uri, this.config).pipe(
      catchError((error: HttpErrorResponse) => HttpUtil.tratarErro(error))
    );
  }

  /**
   * @param {string} uri
   * @param {*} body
   * @returns {Observable<any>}
   * @memberof VisualizarService
   */
  public defer(uri: string, body: any): Observable<any> {
    return this.http.post(uri, JSON.stringify(body), this.config).pipe(
      catchError((error: HttpErrorResponse) => HttpUtil.tratarErro(error))
    );
  }

  /**
   * @param {string} uri
   * @param {*} body
   * @returns {Observable<any>}
   * @memberof VisualizarService
   */
  public finish(uri: string, body: any): Observable<any> {
    return this.http.post(uri, JSON.stringify(body), this.config).pipe(
      catchError((error: HttpErrorResponse) => HttpUtil.tratarErro(error))
    );
  }

}
