import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AnalyticsService } from '../../services/analytics.service';
import { AdminVisualsComponent } from './admin-visuals.component';

describe('AdminVisualsComponent', () => {
  let component: AdminVisualsComponent;
  let fixture: ComponentFixture<AdminVisualsComponent>;

  beforeEach(() => {
    const analyticsServiceStub = () => ({
      getAnalytics: () => ({ subscribe: (f: (arg0: {}) => any) => f({}) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AdminVisualsComponent],
      providers: [
        { provide: AnalyticsService, useFactory: analyticsServiceStub }
      ]
    });
    fixture = TestBed.createComponent(AdminVisualsComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`totalUsers has default value`, () => {
    expect(component.totalUsers).toEqual(0);
  });

  it(`totalProducts has default value`, () => {
    expect(component.totalProducts).toEqual(0);
  });

  it(`totalCategories has default value`, () => {
    expect(component.totalCategories).toEqual(0);
  });

  it(`totalProductsSold has default value`, () => {
    expect(component.totalProductsSold).toEqual(0);
  });

  it(`tenLeastStockProducts has default value`, () => {
    expect(component.tenLeastStockProducts).toEqual([]);
  });

  it(`topTenSellingProducts has default value`, () => {
    expect(component.topTenSellingProducts).toEqual([]);
  });

  it(`loading has default value`, () => {
    expect(component.loading).toEqual(true);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'getAnalytics').and.callThrough();
      component.ngOnInit();
      expect(component.getAnalytics).toHaveBeenCalled();
    });
  });

  describe('getAnalytics', () => {
    it('makes expected calls', () => {
      const analyticsServiceStub: AnalyticsService = fixture.debugElement.injector.get(
        AnalyticsService
      );
      spyOn(analyticsServiceStub, 'getAnalytics').and.callThrough();
      component.getAnalytics();
      expect(analyticsServiceStub.getAnalytics).toHaveBeenCalled();
    });
  });
});
