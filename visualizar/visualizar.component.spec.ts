import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { AlertService } from 'lib-alert';

import { VisualizarComponent } from './visualizar.component';
import { VisualizarService } from './visualizar.service';
describe('VisualizarComponent', () => {
  let component: VisualizarComponent;
  let fixture: ComponentFixture<VisualizarComponent>;
  beforeEach(() => {
    const queryListStub = {};
    const routerStub = { navigateByUrl: (string: any) => ({ then: () => ({}) }) };
    const activatedRouteStub = { params: { subscribe: () => ({}) } };
    const alertServiceStub = { openModal: (object: any) => ({}) };
    const visualizarServiceStub = {
      requirement: (url: any, body: any) => ({ subscribe: () => ({}) }),
      finish: (url: any, body: any) => ({ subscribe: () => ({}) }),
      getCard: (uri: any) => ({ subscribe: () => ({}) }),
      getCards: (id: any) => ({ subscribe: () => ({}) }),
      defer: (uri: any, body: any) => ({ subscribe: () => ({}) })
    };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [VisualizarComponent],
      providers: [
        { provide: QueryList, useValue: queryListStub },
        { provide: Router, useValue: routerStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: AlertService, useValue: alertServiceStub },
        { provide: VisualizarService, useValue: visualizarServiceStub }
      ]
    });
    fixture = TestBed.createComponent(VisualizarComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('back', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigateByUrl').and.callThrough();
      component.back();
      expect(routerStub.navigateByUrl).toHaveBeenCalled();
    });
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

  describe('onCardsChange', () => {
    it('makes expected calls', () => {
      const { cards } = component;
      spyOn(component, 'onCardsChange').and.callThrough();
      component.onCardsChange(cards);
      expect(component.onCardsChange).toBeDefined();
      expect(component.onCardsChange).toHaveBeenCalled();
    });
  });

  describe('showRequirementAction', () => {
    it('makes expected calls', () => {
      const { showFinishAction } = component;
      expect(showFinishAction).toBeUndefined();
    });
  });

  it(`should return true if actions.requirement
   or actions.requirement or this.actionRequirement.requirement are true, and return false if any is false`, () => {
    expect(component.showFinishAction).toBeFalsy();
    component.actions.finish = true;
    expect(component.showFinishAction).toBeTruthy();
  });

});
