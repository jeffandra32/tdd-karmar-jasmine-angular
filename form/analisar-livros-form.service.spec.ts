import { TestBed, async } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

import { UrlUtilService, HttpUtil } from 'lib-shared';

import { environment } from './../../../environments/environment';

import { AnalisarLivrosFormService } from './analisar-livros-form.service';

describe('AnalisarLivrosFormService: atribuir-processo', () => {

  let httpTestingController: HttpTestingController;
  let service: AnalisarLivrosFormService;
  let urlUtilService: UrlUtilService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AnalisarLivrosFormService,
        HttpClientTestingModule,
        UrlUtilService,
        {
          provide: 'env',
          useValue: environment
        }
      ]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(AnalisarLivrosFormService);
    urlUtilService = TestBed.get(UrlUtilService);

  }));

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /**
	 * @param {*} dados
	 * @returns {Observable<any>}
	 * @memberof AnalisarLivrosFormService
	 */
  it('should return the object about the endpoint `/atribuir-processo`', async(() => {
    const url = urlUtilService.montarUrlApi('/atribuir-processo');
    const dados = {
      'usuario': 'id',
      'protocolos': 'this.protocolosSelecionados'
    };

    service.atribuirProcesso(JSON.stringify(dados)).subscribe(res => {
      expect(res).toBeTruthy();
    },
      error => {
        expect(error).toBeTruthy();
      }
    );

    const req = httpTestingController.expectOne(url);

    expect(req.request.method).toEqual('POST');

  }));

  /**
	 * @returns {Observable<any>}
	 * @memberof AnalisarLivrosFormService
	 */
  it('should return the object about the endpoint `/listar-processos`', async(() => {
    const url = urlUtilService.montarUrlApi('/listar-processos');
    service.listarEmpresa().subscribe(val => {
      expect(val).toBeTruthy();
    }, error => {
      expect(error).toBeTruthy();
    }
    );

    const req = httpTestingController.expectOne(url);

    expect(req.request.method).toEqual('GET');

  }));

  /**
   * @param {PesquisaForm} parameters
   * @returns {Observable<any>}
   * @memberof AnalisarLivrosFormService
   */
  it('should return the object about the endpoint `/listar-processos`', async(() => {
    const pesqForm = {
      cnpj: '',
      limit: 0,
      nomeEmpresarial: '',
      numeroArquivamento: '',
      numeroRegistro: '',
      offset: 0,
      protocolo: '',
    };
    const url = urlUtilService.montarUrlApi('/listar-processos', pesqForm);

    service.pesquisarEmpresa(pesqForm).subscribe(val => {
      expect(val).toBeTruthy();
    }, error => {
      expect(error).toBeTruthy();
    }
    );

    const req = httpTestingController.expectOne(url);

    expect(req.request.method).toEqual('GET');

  }));

  it('should remove numbers and specials characters of parameter function formataParametro()', () => {
    expect(service.formataParametro('121.017.100-11a')).toEqual('12101710011');
  });

  it('should return cacth error method on pesquisarEmpresa() and status: 500 ', ((done: DoneFn) => {
    const pesqForm = {
      cnpj: '',
      limit: 0,
      nomeEmpresarial: '',
      numeroArquivamento: '',
      numeroRegistro: '',
      offset: 0,
      protocolo: '',
    };
    const url = urlUtilService.montarUrlApi('/listar-processos', pesqForm);

    spyOn(HttpUtil, 'tratarErro').and.callThrough();
    service.pesquisarEmpresa(pesqForm).subscribe(() => { }, (error: HttpErrorResponse) => {
      expect(HttpUtil.tratarErro).toHaveBeenCalled();
      expect(error).toBeTruthy();
      done();
    });

    httpTestingController.expectOne(url).flush({ 'error': 'Error Interno' }, { status: 500, statusText: 'Server error' });
  }));

  it('should return cacth error method on listarEmpresa() and status: 500 ', ((done: DoneFn) => {

    spyOn(HttpUtil, 'tratarErro').and.callThrough();
    service.listarEmpresa().subscribe(() => { }, (error: HttpErrorResponse) => {
      expect(HttpUtil.tratarErro).toHaveBeenCalled();
      expect(error).toBeTruthy();
      done();
    });
    const url = urlUtilService.montarUrlApi('/listar-processos');
    httpTestingController.expectOne(url).flush({ 'error': 'Error Interno' }, { status: 500, statusText: 'Server error' });
  }));

  it('should return cacth error method on atribuirProcesso() and status: 500 ', ((done: DoneFn) => {

    spyOn(HttpUtil, 'tratarErro').and.callThrough();
    service.atribuirProcesso('1').subscribe(() => { }, (error: HttpErrorResponse) => {
      expect(HttpUtil.tratarErro).toHaveBeenCalled();
      expect(error).toBeTruthy();
      done();
    });
    const url = urlUtilService.montarUrlApi('/atribuir-processo');
    httpTestingController.expectOne(url).flush({ 'error': 'Error Interno' }, { status: 500, statusText: 'Server error' });
  }));

});
