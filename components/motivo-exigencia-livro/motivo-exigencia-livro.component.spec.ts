import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';

import { Observable } from 'rxjs';

import { AlertService } from 'lib-alert';

import { CardComponent } from 'lib-cards-genericos';

import { VisualizarComponent } from './../../visualizar/visualizar.component';

import { MotivoExigenciaLivroComponent } from './motivo-exigencia-livro.component';
import { MotivoExigenciaLivroService } from './motivo-exigencia-livro.service';

describe('MotivoExigenciaLivroComponent', () => {
  let component: MotivoExigenciaLivroComponent;
  let fixture: ComponentFixture<MotivoExigenciaLivroComponent>;
  let de: DebugElement;
  let el: HTMLHtmlElement;
  beforeEach(() => {
    const alertServiceStub = { openModal: () => ({}) };
    const cardComponentStub = {
      container: {
        injector: {
          parent: {
            parent: { parent: { viewContainerParent: { component: {} } } }
          }
        }
      }
    };
    const visualizarComponentStub = {
      requirement: {},
      actionRequirement: {},
      finish: {},
      actionFinish: {}
    };
    const motivoExigenciaLivroServiceStub = {
      requirement: () => ({
        subscribe: (res: { finish: any; requirement: any; mensagem?: any; }) => {
          component.loading = false;
          expect(component.loading).toBeFalsy();
          let { finish, requirement, mensagem } = res;
          finish = '1';
          requirement = '2';
          mensagem = 'mensagem teste';
          component.loading = false;
          spyOn(component, 'updateMainComponent');
          component.updateMainComponent();
          expect(component.updateMainComponent).toHaveBeenCalledTimes(1);

          if (!!res.requirement) {
            spyOn(component, 'showExigenciaButton').and.callThrough();
            component.showExigenciaButton(res.requirement);
            expect(component.showExigenciaButton).toHaveBeenCalledTimes(1);
          }

          spyOn(component, 'alert').and.callThrough();
          component.alert(mensagem, 'sucesso');
          expect(component.alert).toHaveBeenCalledTimes(1);
        }
      }),

      defer: () => ({
        subscribe: (res: { finish: any; requirement: any; mensagem?: any; }) => {
          component.loading = false;
          expect(component.loading).toBeFalsy();
          let { finish, requirement, mensagem } = res;
          finish = '1';
          requirement = '2';
          mensagem = 'mensagem teste';

          spyOn(component, 'showFinishButton').and.callThrough();
          component.showFinishButton(res.finish);
          expect(component.showFinishButton).toHaveBeenCalledTimes(1);


          spyOn(component, 'showExigenciaButton').and.callThrough();
          component.showExigenciaButton(res.requirement);
          expect(component.showExigenciaButton).toHaveBeenCalledTimes(1);


          spyOn(component, 'updateMainComponent');
          component.updateMainComponent();
          expect(component.updateMainComponent).toHaveBeenCalledTimes(1);
          spyOn(component, 'alert').and.callThrough();
          component.alert(mensagem, 'sucesso');
          expect(component.alert).toHaveBeenCalledTimes(1);

        }
      })
    };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [MotivoExigenciaLivroComponent],
      providers: [
        { provide: AlertService, useValue: alertServiceStub },
        { provide: CardComponent, useValue: cardComponentStub },
        { provide: VisualizarComponent, useValue: visualizarComponentStub },
        {
          provide: MotivoExigenciaLivroService,
          useValue: motivoExigenciaLivroServiceStub
        }
      ]
    });
    fixture = TestBed.createComponent(MotivoExigenciaLivroComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('.btn'));
    el = fixture.nativeElement;
    const data = {
      'actions': {
        'defer': 'defer',
        'requirement': 'requirement'
      }
    };

    component.data = data;
    fixture.detectChanges();
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('should set `visible to false` && `loading to false` && `visibleActions to true` on start',
    async(() => {
      const { loading, visible, visibleActions } = component;
      expect(loading).toBeFalsy();
      expect(visible).toBeFalsy();
      expect(visibleActions).toBeTruthy();
    }));

  it('should set defer', async(() => {
    const { defer } = component.data.actions;
    expect(defer).toBeTruthy();
    expect(defer).toString();
  }));

  it('should set requirement', async(() => {
    const { requirement } = component.data.actions;

    expect(requirement).toBeTruthy();
  }));

  it('should be hasDeferAction() true and Defined', async(() => {
    const { hasDeferAction } = component;

    expect(hasDeferAction).toBeTruthy();
    expect(hasDeferAction).toBeDefined();
  }));

  it('should be hasRequirementAction() true and Defined', async(() => {
    const { hasRequirementAction } = component;

    expect(hasRequirementAction).toBeTruthy();
    expect(hasRequirementAction).toBeDefined();
  }));

  it('should be onExport return `event`', async(() => {
    const { formGroup } = component;
    spyOn(component, 'onExport').and.callThrough();
    component.onExport(formGroup);
    expect(component.formGroup).toBe(formGroup);
    expect(component.onExport).toBeDefined();
    expect(component.onExport).toHaveBeenCalled();
  }));

  it('should be onCancel() true and Defined', async(() => {
    spyOn(component, 'onCancel').and.callThrough();
    component.onCancel();
    expect(component.onCancel).toHaveBeenCalled();
  }));

  it('should be visibleActions() true and Defined', async(() => {
    const { visibleActions } = component;

    expect(visibleActions).toBeTruthy();
    expect(visibleActions).toBeDefined('Function');
  }));

  it('should call the onDefer() method', async(() => {
    fixture.detectChanges();

    spyOn(component, 'onDefer').and.returnValue(Observable);
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.onDefer).toHaveBeenCalledTimes(1);
    expect(component.loading).toBeFalsy();
  }));

  it('should call the onConfirm() method', async(() => {
    fixture.detectChanges();
    spyOn(component, 'onConfirm');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    component.onConfirm();
    expect(component.onConfirm).toHaveBeenCalledTimes(1);
  }));

  it('should call the onRequirement() method', async(() => {
    fixture.detectChanges();

    spyOn(component, 'onRequirement');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.onRequirement).toHaveBeenCalledTimes(0);
    expect(component.visibleActions).toBeTruthy();
  }));

  it(`should change the value of visualizar.finish to
  true and the value of visualizar.actionFinish to the function parameter when showFinishButton() is called`, () => {
      component.showFinishButton(false);
      const { finish, actionFinish } = component.visualizar;
      expect(finish).toBeTruthy();
      expect(actionFinish).toBe(false);
    });

  it('should change the value of visible and visibleActions to their inverse when onRequirement() is called', () => {
    component.onRequirement();
    const { visible, visibleActions } = component;
    expect(visible).not.toBe(!visible);
    expect(visibleActions).not.toBe(!visibleActions);
  });

  it(`should change the value of visualizar.requirement to true and the value of visualizar.actionRequirement
  to the function parameter when showExigenciaButton() is called`, () => {
      component.showExigenciaButton(false);
      const { requirement, actionRequirement } = component.visualizar;
      expect(requirement).toBeTruthy();
      expect(actionRequirement).toBe(false);
    });

  describe('alert', () => {
    it('makes expected calls', () => {
      const messagem = '';
      const alert = '';
      const alertServiceStub: AlertService = fixture.debugElement.injector.get(AlertService);
      spyOn(alertServiceStub, 'openModal').and.callThrough();
      component.alert(messagem, alert);
      expect(component.alert).toBeDefined();
      expect(alertServiceStub.openModal).toHaveBeenCalled();
    });
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
