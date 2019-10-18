import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

import { HttpUtil } from 'lib-shared';

import { mockDefers } from './helpers.spec';
import { MotivoExigenciaLivroService } from './motivo-exigencia-livro.service';
describe('MotivoExigenciaLivroService', () => {
  let service: MotivoExigenciaLivroService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MotivoExigenciaLivroService]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(MotivoExigenciaLivroService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it('should return the object method requirement() and status 200', (() => {
    const uri = 'http://www.mocky.io/v2/5d7fe52330000010008e6c61';
    const body = {};
    service.requirement(uri, body).subscribe(res => {
      expect(res).toEqual(mockDefers);
    });

    const req = httpTestingController.expectOne('http://www.mocky.io/v2/5d7fe52330000010008e6c61');

    expect(req.request.method).toEqual('POST');

    req.flush(mockDefers);
  })
  );

  it('should return the cacth error method on requirement() and status 500 ', ((done: DoneFn) => {
    const uri = 'http://www.mocky.io/v2/5d7fe52330000010008e6c61';
    const body = {};

    spyOn(HttpUtil, 'tratarErro').and.callThrough();
    service.requirement(uri, body).subscribe(() => { }, (res: HttpErrorResponse) => {
      expect(HttpUtil.tratarErro).toHaveBeenCalled();
      expect(res).toBeTruthy();
      done();
    });

    httpTestingController.expectOne(uri).flush({ 'error': 'Error Interno' }, { status: 500, statusText: 'Server error' });

  })
  );

  it('should return the object method defer() and status 200', (() => {
    const uri = 'http://www.mocky.io/v2/5d7fe52330000010008e6c61';
    const body = {};
    service.defer(uri, body).subscribe(res => {
      expect(res).toEqual(mockDefers);
    });

    const req = httpTestingController.expectOne('http://www.mocky.io/v2/5d7fe52330000010008e6c61');

    expect(req.request.method).toEqual('POST');

    req.flush(mockDefers);
  })
  );

  it('should return the cacth error method on defer() and status 500', ((done: DoneFn) => {
    const uri = 'http://www.mocky.io/v2/5d7fe52330000010008e6c61';
    const body = {};

    spyOn(HttpUtil, 'tratarErro').and.callThrough();
    service.defer(uri, body).subscribe(() => { }, (res: HttpErrorResponse) => {
      expect(HttpUtil.tratarErro).toHaveBeenCalled();
      expect(res).toBeTruthy();
      done();
    });

    httpTestingController.expectOne(uri).flush({ 'error': 'Error Interno' }, { status: 500, statusText: 'Server error' });

  })
  );
});
