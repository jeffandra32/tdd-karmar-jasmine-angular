import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';

import { HttpUtil } from 'lib-shared';

import { catchError, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MotivoExigenciaLivroService {

  constructor(
    private http: HttpClient
  ) {}

  /**
   * @param {string} uri
   * @param {*} data
   * @returns {Observable<any>}
   * @memberof MotivoExigenciaLivroService
   */
  public requirement(uri: string, data: any): Observable<any> {
    return this.http.post(uri, JSON.stringify(data), {
      withCredentials: true,
      responseType: 'json'
    }).pipe(
      take(1),
      catchError((error: HttpErrorResponse) => HttpUtil.tratarErro(error))
    );
  }

  /**
   * @param {string} uri
   * @param {*} data
   * @returns {Observable<any>}
   * @memberof MotivoExigenciaLivroService
   */
  public defer(uri: string, data: any): Observable<any> {
    return this.http.post(uri,  JSON.stringify(data), {
      withCredentials: true,
      responseType: 'json'
    }).pipe(
      take(1),
      catchError((error: HttpErrorResponse) => HttpUtil.tratarErro(error))
    );
  }

}
