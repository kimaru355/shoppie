import { TestBed } from '@angular/core/testing';

import { OrderService } from './order.service';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { Order } from '../interfaces/order';
import { order } from '../test_data/test_data';

describe('OrderService', () => {
  let service: OrderService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(OrderService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should get all oders', () => {
    service.getAllOrders().subscribe((res) => {
      expect(res).toBeTruthy();
      let test = res.data as Order[];
      expect(test.length).toBe(3);

      expect(test[1].productNumber).toBe(56);
    });

    const req = httpTestingController.expectOne(
      'http://localhost:3000/orders/all'
    );
    expect(req.request.method).toEqual('GET');

    req.flush({ data: order });
  });

  it('Should create new order', () => {
    service.createOrder('');
  });
});
