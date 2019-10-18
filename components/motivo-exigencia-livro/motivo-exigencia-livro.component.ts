import { Component, Input, OnInit, Host, ViewChild } from '@angular/core';

import { AlertService } from 'lib-alert';

import { CardComponent } from 'lib-cards-genericos';

import { VoxFormGroup } from 'vox-form/lib/vox-form.group';

import { VisualizarComponent } from './../../visualizar/visualizar.component';

import { MotivoExigenciaLivroService } from './motivo-exigencia-livro.service';
@Component({
  selector: 'app-motivo-exigencia-livro',
  templateUrl: './motivo-exigencia-livro.component.html',
})
export class MotivoExigenciaLivroComponent implements OnInit {
  public formGroup: VoxFormGroup;
  public formData: any;
  public actions: any;
  public visible: boolean;
  public visibleActions: boolean;
  public loading: boolean;

  @Input() public data: any;

  @ViewChild('visualizarComponent') public visualizarComponent: any;

  /**
   *Creates an instance of MotivoExigenciaLivroComponent.
   * @param {AlertService} alertService
   * @param {MotivoExigenciaLivroService} motivoExigenciaService
   * @memberof MotivoExigenciaLivroComponent
   */
  constructor(
    @Host() private cards: CardComponent,
    @Host() public visualizar: VisualizarComponent,
    private alertService: AlertService,
    private motivoExigenciaService: MotivoExigenciaLivroService
  ) {
    this.visible = false;
    this.visibleActions = true;
    this.loading = false;
  }

  ngOnInit() {
    this.formData = this.data.form;
    this.actions = this.data.actions;
  }

  /**
   * @readonly
   * @memberof MotivoExigenciaLivroComponent
   */
  public get hasDeferAction(): boolean {
    return !!this.actions.defer;
  }

  /**
   * @readonly
   * @memberof MotivoExigenciaLivroComponent
   */
  public get hasRequirementAction(): boolean {
    return !!this.actions.requirement;
  }

  /**
   * @param {VoxFormGroup} event
   * @memberof MotivoExigenciaLivroComponent
   */
  public onExport(event: VoxFormGroup): void {
    this.formGroup = event;
  }

  /**
   * @memberof MotivoExigenciaLivroComponent
   */
  public onCancel(): void {
    this.visible = false;
    this.visibleActions = true;
  }

  /**
   * @memberof MotivoExigenciaLivroComponent
   */
  public onConfirm(): void {
    this.loading = true;

    if (this.formGroup.validate()) {
      this.motivoExigenciaService.requirement(this.actions.requirement, this.formGroup.value)
        .subscribe(
          response => {

            this.loading = false;
            this.updateMainComponent();

            if (!!response.requirement) {
              this.showExigenciaButton(response.requirement);
            }

            this.alert(response.mensagem, 'sucesso');
          },
          error => {
            this.loading = false;
            this.alert(error);
          }
        );
    }
  }

  /**
   * @memberof MotivoExigenciaLivroComponent
   */
  public onDefer(): void {
    const body = [];
    this.loading = true;

    this.motivoExigenciaService.defer(this.actions.defer, body)
      .subscribe(
        (response: any) => {
          this.loading = false;

          if (!!response.finish) {
            this.showFinishButton(response.finish);
          }

          if (!!response.requirement) {
            this.showExigenciaButton(response.requirement);
          }

          this.updateMainComponent();
          this.alert(response.mensagem, 'sucesso');
        },
        error => {
          this.loading = false;
          this.alert(error);
        }
      );
  }

  /**
   * Envia o requerimento os requerimentos para o botão de exigência do componente visualizar.
   * @param {*} requirement
   * @memberof MotivoExigenciaLivroComponent
   */
  public showExigenciaButton(requirement: any): void {
    this.visualizar.requirement = true;
    this.visualizar.actionRequirement = requirement;
  }

  /**
   * Envia o requerimento os requerimentos para o botão de finalizar do componente visualizar.
   * @param {*} finish
   * @memberof MotivoExigenciaLivroComponent
   */
  public showFinishButton(finish: any): void {
    this.visualizar.finish = true;
    this.visualizar.actionFinish = finish;
  }

  /**
   * @memberof MotivoExigenciaLivroComponent
   */
  public onRequirement(): void {
    this.visible = !this.visible;
    this.visibleActions = !this.visibleActions;
  }

  public alert(mensagem: any, alert: string = 'danger'): void {
    this.alertService.openModal({
      title: 'Atenção',
      message: mensagem.error || mensagem,
      alert: alert,
    });
  }

  public updateMainComponent(): void {
    this.getMainComponent().loadData();
  }

  private getMainComponent(): any {
     return this.cards.container.injector['view'].parent.parent.parent.viewContainerParent.component;
  }

}
