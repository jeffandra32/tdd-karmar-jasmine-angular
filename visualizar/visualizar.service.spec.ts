import { TestBed, async } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

import { UrlUtilService, HttpUtil } from 'lib-shared';

import { mockDefers } from '../components/motivo-exigencia-livro/helpers.spec';
import { environment } from './../../../environments/environment';

import { getCardsMock } from './help.spec';
import { VisualizarService } from './visualizar.service';
describe('VisualizarService', () => {
  let httpTestingController: HttpTestingController;
  let service: VisualizarService;
  let urlUtilService: UrlUtilService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        VisualizarService,
        UrlUtilService,
        { provide: 'env', useValue: environment }
      ]
    });
    service = TestBed.get(VisualizarService);
    httpTestingController = TestBed.get(HttpTestingController);
    urlUtilService = TestBed.get(UrlUtilService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return object method on defer() and status 200', async(() => {
    const url = 'http://www.mocky.io/v2/5d7fe52330000010008e6c61';
    const dados = {
      'usuario': 'id',
      'protocolos': 'this.protocolosSelecionados'
    };

    service.defer(url, JSON.stringify(dados)).subscribe(res => {
      expect(res).toBeTruthy();
    });

    const req = httpTestingController.expectOne(url);

    expect(req.request.method).toEqual('POST');

  }));

  it('should return the cacth error method on defer() and status 500', ((done: DoneFn) => {
    const uri = 'http://www.mocky.io/v2/5d7fe52330000010008e6c61';
    const body = {};

    spyOn(HttpUtil, 'tratarErro').and.callThrough();
    service.defer(uri, body).subscribe(() => { }, (error: HttpErrorResponse) => {
      expect(HttpUtil.tratarErro).toHaveBeenCalled();
      expect(error).toBeTruthy();
      done();
    });

    httpTestingController.expectOne(uri).flush({ 'error': 'Error Interno' }, { status: 500, statusText: 'Server error' });

  })
  );

  it('should return object method on finish() and status: 200`', async(() => {
    const url = 'http://www.mocky.io/v2/5d7fe52330000010008e6c61';
    const dados = {
      'usuario': 'id',
      'protocolos': 'this.protocolosSelecionados'
    };

    service.finish(url, JSON.stringify(dados)).subscribe(res => {
      expect(res).toBeTruthy();
    });

    const req = httpTestingController.expectOne(url);

    expect(req.request.method).toEqual('POST');

  }));

  it('should return the cacth error method on finish() and status 500 ', ((done: DoneFn) => {
    const uri = 'http://www.mocky.io/v2/5d7fe52330000010008e6c61';
    const body = {};

    spyOn(HttpUtil, 'tratarErro').and.callThrough();
    service.finish(uri, body).subscribe(() => { }, (error: HttpErrorResponse) => {
      expect(HttpUtil.tratarErro).toHaveBeenCalled();
      expect(error).toBeTruthy();
      done();
    });

    httpTestingController.expectOne(uri).flush({ 'error': 'Error Interno' }, { status: 500, statusText: 'Server error' });

  })
  );

  it('should return object method on requirement() and status: 200`', async(() => {
    const url = 'http://www.mocky.io/v2/5d7fe52330000010008e6c61';
    const dados = {
      'usuario': 'id',
      'protocolos': 'this.protocolosSelecionados'
    };

    service.requirement(url, JSON.stringify(dados)).subscribe(res => {
      expect(res).toBeTruthy();
    });

    const req = httpTestingController.expectOne(url);

    expect(req.request.method).toEqual('POST');

  }));

  it('should return the cacth error method on requirement() and status 500 ', ((done: DoneFn) => {
    const uri = 'http://www.mocky.io/v2/5d7fe52330000010008e6c61';
    const body = {};

    spyOn(HttpUtil, 'tratarErro').and.callThrough();
    service.requirement(uri, body).subscribe(() => { }, (error: HttpErrorResponse) => {
      expect(HttpUtil.tratarErro).toHaveBeenCalled();
      expect(error).toBeTruthy();
      done();
    });

    httpTestingController.expectOne(uri).flush({ 'error': 'Error Interno' }, { status: 500, statusText: 'Server error' });

  })
  );

  it('should return response getCard() and status: 200 ', ((done: DoneFn) => {
    const url = 'http://www.mocky.io/v2/5d7fe52330000010008e6c61';

    service.getCard(url).subscribe(res => {
      expect(res).toBeTruthy();
      expect(res).toEqual(mockDefers);
      done();
    });

    const req = httpTestingController.expectOne(url);

    expect(req.request.method).toEqual('GET');

    req.flush(mockDefers);

    httpTestingController.verify();
  }));

  it('should return cacth error method on getCard() and status: 500 ', ((done: DoneFn) => {
    const url = 'http://www.mocky.io/v2/5d7fe52330000010008e6c61';

    spyOn(HttpUtil, 'tratarErro').and.callThrough();
    service.getCard(url).subscribe(() => { }, (error: HttpErrorResponse) => {
      expect(HttpUtil.tratarErro).toHaveBeenCalled();
      expect(error).toBeTruthy();
      done();
    });

    httpTestingController.expectOne(url).flush({ 'error': 'Error Interno' }, { status: 500, statusText: 'Server error' });
  }));

  it('getUserList() should return data', (done: DoneFn) => {
    service.getCards('1').subscribe((res) => {
      expect(res).toEqual(getCardsMock);
      done();
    });

    const url = urlUtilService.montarUrlApi(`/cards/${1}`);
    const reqMock = httpTestingController.expectOne((req) => req.method === 'GET' && req.url === url);
    expect(reqMock.request.method).toBe('GET');
    reqMock.flush(getCardsMock);
  });

  it('should return cacth error method on getCards() and status: 500 ', ((done: DoneFn) => {
    spyOn(HttpUtil, 'tratarErro').and.callThrough();
    service.getCards('1').subscribe(() => { }, (error: HttpErrorResponse) => {
      expect(HttpUtil.tratarErro).toHaveBeenCalled();
      expect(error).toBeTruthy();
      done();
    });
    const url = urlUtilService.montarUrlApi(`/cards/${1}`);
    httpTestingController.expectOne(url).flush({ 'error': 'Error Interno' }, { status: 500, statusText: 'Server error' });
  }));

});
