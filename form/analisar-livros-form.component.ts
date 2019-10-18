import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

import { Subscription, Subject } from 'rxjs';

import { AlertService } from 'lib-alert';

import { TextMaskFactory, StorageUtil } from 'lib-shared';

import { takeUntil } from 'rxjs/operators';

import { AnalisarLivrosFormService } from './analisar-livros-form.service';
import { PesquisaForm } from './pesquisa.form';

@Component({
  selector: 'app-analisar-livros-form',
  templateUrl: './analisar-livros-form.component.html',
  styleUrls: ['./analisar-livros-form.component.css']
})
export class AnalisarLivrosFormComponent implements OnInit {

  public loading: boolean;

  @Input() public protocolosSelecionados: Array<string>;
  @Input() public listar: Subscription;
  @Output() public dataAtribuir: EventEmitter<any>;
  @Output() public dataForm: EventEmitter<any>;
  @Input() public pesquisaInit: boolean;

  private _pesquisaForm: PesquisaForm;
  private _maskFactory: TextMaskFactory;
  private unsubscribe$ = new Subject();

  /**
   *Creates an instance of AnalisarLivrosFormComponent.
   * @param {AlertService} alertService
   * @param {AnalisarLivrosFormService} analisarLivrosFormService
   * @memberof AnalisarLivrosFormComponent
   */
  constructor(
    private alertService: AlertService,
    private analisarLivrosFormService: AnalisarLivrosFormService
  ) {
    this.dataForm = new EventEmitter();
    this.dataAtribuir = new EventEmitter();
    this._maskFactory = new TextMaskFactory();
    this._pesquisaForm = new PesquisaForm();
    this.loading = false;
    this.pesquisaInit = true;
  }

  /**
   * @memberof AnalisarLivrosFormComponent
   */
  public ngOnInit(): void {
    this.dataInit();
  }

  /**
   * @returns
   * @memberof AnalisarLivrosFormComponent
   */
  public dataInit() {
    return !this.pesquisaInit && this.listar;
  }

  /**
   * @readonly
   * @type {PesquisaForm}
   * @memberof AnalisarLivrosFormComponent
   */
  public get pesquisaForm(): PesquisaForm {
    return this._pesquisaForm;
  }

  /**
   * @readonly
   * @type {TextMaskFactory}
   * @memberof AnalisarLivrosFormComponent
   */
  public get maskFactory(): TextMaskFactory {
    return this._maskFactory;
  }

  /**
   * @memberof AnalisarLivrosFormComponent
   */
  public pesquisar(): void {
    const formValue = this.pesquisaForm.getDadosForm();
      const parametros = Object.assign(formValue);
      this.dataForm.emit({ form: parametros });
      return;
  }

  /**
   * @param {*} dado
   * @returns {boolean}
   * @memberof AnalisarLivrosFormComponent
   */
  public isEmpty(dado: any): boolean {
    return JSON.stringify(dado) === '{}';
  }

  /**
   * @returns {void}
   * @memberof AnalisarLivrosFormComponent
   */
  public  validaAtribuirProcessoForm(): void {

    if (!this.protocolosSelecionados) {
      this.alert('Nenhum protocolo selecionado!', 'warning');
      return;
    }

    this.atribuirProcessoForm();
  }

  /**
   * @returns {Subscription}
   * @memberof AnalisarLivrosFormComponent
   */
  public atribuirProcessoForm(): Subscription {

    const { id } = StorageUtil.get('user');

    this.loading = true;
    const dados = {
      'usuario': id,
      'protocolos': this.protocolosSelecionados
    };

    return this.analisarLivrosFormService.atribuirProcesso(dados).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(val => {
      this.loading = false;
      this.dataAtribuir.emit(true);
      this.alertService.openModal({
        message: `<strong>${val.mensagem}</strong>`,
        title: 'Sucesso!',
        alert: 'success',
      });
    },
      (error) => {
        this.loading = false;
        this.dataAtribuir.emit(false);
        this.alertService.openModal({
          message: `<strong>${error.mensagem}</strong>`,
          title: 'Atenção',
          alert: 'danger',
        });
      });
  }

  public alert(message: any, alert = 'danger'): void {
    const msn = this.testMessage(message);
    this.alertService.openModal({
      message: `<strong>${msn}</strong>`,
      title: 'Atenção',
      alert: alert,
    });
  }

  public testMessage(message: any) {
    return message.error ? message.error : message;
  }

}
