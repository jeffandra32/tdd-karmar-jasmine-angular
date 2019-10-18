import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { QueryList } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService } from 'lib-alert';

import { VisualizarService } from './visualizar.service';

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.component.html'
})
export class VisualizarComponent implements OnInit, AfterViewInit {
  public actionFinish: any;
  public actionRequirement: any;
  public actions: any;
  public cards: any;
  public components: QueryList<any>;
  public finish: boolean;
  public requirement: boolean;
  public loading: boolean;
  public visibleExigencia: boolean;
  public visibleFinalizar: boolean;

  @ViewChild('cardsComponent') public cardsComponent: any;

  /**
   *Creates an instance of VisualizarComponent.
   * @param {Router} router
   * @param {ActivatedRoute} activeRouter
   * @param {AlertService} alertService
   * @param {VisualizarService} visualizarService
   * @memberof VisualizarComponent
   */
  constructor(
    private router: Router,
    private activeRouter: ActivatedRoute,
    private alertService: AlertService,
    private visualizarService: VisualizarService
  ) {
    this.actionRequirement = {};
    this.actionFinish = {};
    this.actions = {};
    this.cards = [];
    this.components = new QueryList();
    this.finish = false;
    this.requirement = false;
    this.loading = false;
    this.visibleExigencia = true;
    this.visibleFinalizar = true;
  }

  public ngOnInit(): void { }

  /**
   * @memberof VisualizarComponent
   */
  public ngAfterViewInit(): void {
    this.loadCards();
  }

  /**
   * @readonly
   * @type {boolean}
   * @memberof VisualizarComponent
   */
  public get showRequirementAction(): boolean {
    return !!this.actions.requirement || this.requirement || this.actionRequirement.requirement;
  }

  /**
   * @readonly
   * @type {boolean}
   * @memberof VisualizarComponent
   */
  public get showFinishAction(): boolean {
    return !!this.actions.finish || this.finish || this.actionFinish.finish;
  }

  /**
   * @memberof VisualizarComponent
   */
  public back(): void {
    this.router.navigateByUrl('/pesquisar').then(
      () => window.scrollTo(0, 0)
    );
  }

  /**
  * @memberof VisualizarComponent
  */
  public onRequirement(): void {
    const body = [];
    const url = this.actions.requirement ? this.actions.requirement : this.actionRequirement;
    this.loading = true;

    this.visualizarService.requirement(url, body)
      .subscribe(
        (response: any) => {
          this.loading = false;
          this.visibleExigencia = false;
          this.alert(response.mensagem, 'success');
        },
        error => {
          this.loading = false;
          this.alert(error);
        }
      );
  }

  /**
  * @memberof VisualizarComponent
  */
  public onFinish(): void {
    const body = [];
    const url = this.actions.finish ? this.actions.finish : this.actionFinish;
    this.loading = true;

    this.visualizarService.finish(url, body)
      .subscribe(
        (response: any) => {
          this.loading = false;
          this.visibleFinalizar = false;
          this.alert(response.mensagem, 'success');
        },
        error => {
          this.loading = false;
          this.alert(error);
        }
      );
  }

  /**
   * @memberof VisualizarComponent
   */
  public toggleCardRequirement(): void {
    const { open, title, action } = this.components.last;

    this.components.last.card = { open: !open, title, action };
  }

  /**
   * @param {QueryList<any>} cards
   * @memberof VisualizarComponent
   */
  public onCardsChange(cards: QueryList<any>) {
    this.components = cards;
  }

  /**
   * @private
   * @param {*} message
   * @param {string} [alert='danger']
   * @memberof VisualizarComponent
   */
  public alert(mensagem: any, alert: string = 'danger'): void {
    this.alertService.openModal({
      title: 'Atenção',
      message: mensagem.error || mensagem,
      alert: alert,
    });
  }

  /**
   * @private
   * @memberof VisualizarComponent
   */
  private loadCards() {
    this.activeRouter.params.subscribe(
      params => {
        this.visualizarService.getCards(params.id).subscribe(
          (response: any) => {
            this.actions = response.actions;
            this.cards = response.cards;
          },
          error => {
            this.alert(error);
          }
        );
      }
    );
  }

}

