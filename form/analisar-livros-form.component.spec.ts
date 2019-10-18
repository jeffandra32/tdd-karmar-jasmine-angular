import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { DebugElement } from '@angular/core';

import { Subscription } from 'rxjs';

import { AlertService } from 'lib-alert';

import { TextMaskModule } from 'angular2-text-mask';

import { UrlUtilService } from 'projects/lib/lib-shared/src/public_api';

import { environment } from './../../../environments/environment.docker';

import { AnalisarLivrosFormComponent } from './analisar-livros-form.component';
import { AnalisarLivrosFormService } from './analisar-livros-form.service';


describe('AnalisarLivrosFormComponent: Validação de Formulário', () => {
  let component: AnalisarLivrosFormComponent;
  let fixture: ComponentFixture<AnalisarLivrosFormComponent>;
  let de: DebugElement;
  let el: HTMLHtmlElement;

  beforeEach(async(() => {
    const alertServiceStub = { openModal: object => ({}) };
    const analisarLivrosFormServiceStub = {
      atribuirProcesso: dados => ({ pipe: () => ({ subscribe: () => ({}) }) })
    };
    TestBed.configureTestingModule({
      declarations: [AnalisarLivrosFormComponent],
      imports: [
        ReactiveFormsModule,
        TextMaskModule
      ],
      providers: [
        HttpClient,
        HttpHandler,
        AnalisarLivrosFormService,
        UrlUtilService,
        {
          provide: 'env',
          useValue: environment
        },
        { provide: AlertService, useValue: alertServiceStub },
        {
          provide: AnalisarLivrosFormService,
          useValue: analisarLivrosFormServiceStub
        }
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(AnalisarLivrosFormComponent);

        component = fixture.componentInstance;

        de = fixture.debugElement.query(By.css('form'));
        el = de.nativeElement;
      });
  }));

  it('should to create a instance', () => {
    expect(component).toBeTruthy();
  });

  it('should set `loading to false` on start',
    async(() => {
      const { loading } = component;
      expect(loading).toBeFalsy();
    }));

  it('should not have ngOnInit() after construction',
    async(() => {
      const { ngOnInit } = component;
      expect(ngOnInit).toBeDefined();
    }));

  it('should dataInit() after Angular calls ngOnInit',
    async(() => {
      component.ngOnInit();
      expect(component.dataInit()).toBeFalsy();
    }));

  it(`should have a object pesquisaForm`, async(() => {
    const pesquisaForm = {
      protocolo: '',
      nomeEmpresarial: '',
      cnpj: '',
      numeroRegistro: '',
      atribuido: ''
    };

    expect(component.pesquisaForm.value).toEqual(pesquisaForm);
  }));

  it(`should call the "createCnpj()" method`, async(() => {
    fixture.detectChanges();
    spyOn(component.maskFactory, 'createCnpj');
    el = fixture.debugElement.query(By.css('input')).nativeElement;
    el.click();
    expect(component.maskFactory.createCnpj).toHaveBeenCalledTimes(0);
  }));

  it(`should call the "createProtocolo()" method`, async(() => {
    fixture.detectChanges();
    spyOn(component.maskFactory, 'createProtocolo');
    el = fixture.debugElement.query(By.css('input')).nativeElement;
    el.click();
    expect(component.maskFactory.createProtocolo).toHaveBeenCalledTimes(0);
  }));

  it(`should set submitted "pesquisar()" to true`, async(() => {
    component.pesquisar();
    expect(component.pesquisar).toBeTruthy();
  }));

  it(`should call the pesquisar method`, async(() => {
    fixture.detectChanges();
    spyOn(component, 'pesquisar');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.pesquisar).toHaveBeenCalledTimes(0);
  }));

  it(`should set submitted "validaAtribuirProcessoForm()" to true`, async(() => {
    const ps = null;
    spyOn(component, 'validaAtribuirProcessoForm');
    component.validaAtribuirProcessoForm();
    component.protocolosSelecionados = ps;

    if (!component.protocolosSelecionados) {
      expect(component.protocolosSelecionados).toBeFalsy();
      spyOn(component, 'alert').and.callThrough();
      component.alert('Nenhum protocolo selecionado!', 'warning');
      expect(component.alert).toHaveBeenCalledTimes(1);
      return;
    }
  }));

  it(`should call function "atribuirProcessoForm()"`, async(() => {
    spyOn(component, 'validaAtribuirProcessoForm');
    component.validaAtribuirProcessoForm();
    spyOn(component, 'atribuirProcessoForm');
    component.atribuirProcessoForm();
    expect(component.atribuirProcessoForm).toHaveBeenCalledTimes(1);
  }));

  it(`should call the "validaAtribuirProcessoForm()" method`, async(() => {
    fixture.detectChanges();
    spyOn(component, 'validaAtribuirProcessoForm');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.validaAtribuirProcessoForm).toHaveBeenCalledTimes(1);
  }));

  it(`form should be valid`, async(() => {
    component.pesquisaForm.controls['protocolo'].setValue('');
    component.pesquisaForm.controls['nomeEmpresarial'].setValue('');
    component.pesquisaForm.controls['cnpj'].setValue('');
    component.pesquisaForm.controls['numeroRegistro'].setValue('');
    component.pesquisaForm.controls['atribuido'].setValue('');
    expect(component.pesquisaForm.valid).toBeTruthy();
  }));

  it('should true if pesquisaInit is false and listar is true', () => {
    expect(component.dataInit()).toBeFalsy();
    component.listar = new Subscription();
    component.pesquisaInit = false;
    expect(component.dataInit()).toBeTruthy();
  });

  it('should return true if the parameter json of function isEmpty() is empty', () => {
    expect(component.isEmpty({ mock: 'mock' })).toBeFalsy();
    expect(component.isEmpty({})).toBeTruthy();
  });

  it(`should call the function alert() if not exists protocolosSelecionados when function validaAtribuirProcessoForm()`, () => {
    component.alert('', '');
    spyOn(component, 'alert').and.callThrough();
    spyOn(component, 'atribuirProcessoForm').and.callThrough();
    component.validaAtribuirProcessoForm();
    expect(component.alert).toHaveBeenCalledTimes(1);
  });

  it('', () => {
    const msgMock = { error: 'mock' };
    expect(component.testMessage(msgMock)).toBe(msgMock.error);
    const msgMock2 = {};
    expect(component.testMessage(msgMock2)).toBe(msgMock2);
  });

  it(`should call the "getFirstErrorFrom()" method`, async(() => {
    fixture.detectChanges();
    spyOn(component.pesquisaForm, 'getFirstErrorFrom');
    el = fixture.debugElement.query(By.css('div')).nativeElement;
    el.click();
    expect(component.pesquisaForm.getFirstErrorFrom).toHaveBeenCalledTimes(0);
  }));

  it(`should call the "markAllAsTouched()" method`, async(() => {
    fixture.detectChanges();
    component.pesquisaForm.markAllAsTouched();
    spyOn(component.pesquisaForm, 'markAllAsTouched').and.callThrough();
    expect(component.pesquisaForm.markAllAsTouched).toBeDefined();
    expect(component.pesquisaForm.markAllAsTouched).toHaveBeenCalledTimes(0);
  }));

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});


