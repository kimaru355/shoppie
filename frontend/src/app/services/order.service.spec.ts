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

  it('should create a new order', ()=>{
    service.createOrder('fea51ffd-8115-491d-807c-0992d56f5982').subscribe(res=>{
      expect(res.message).toBe("Order successfully created")
    })

    const req = httpTestingController.expectOne('http://localhost:3000/orders/create')

    expect(req.request.method).toEqual("POST")

    req.flush({message: "Order successfully created"})
  })

  it('should get an order by ID', ()=>{
    service.getOrdersByProductId('fea51ffd-8115-491d-807c-0992d56f5982').subscribe(res=>{
      expect(res).toBeTruthy()
      let newData = res.data as Order[]
      expect(newData[0].id).toBe('fea51ffd-8115-491d-807c-0992d56f5982')
    })

    const req = httpTestingController.expectOne('http://localhost:3000/orders/fea51ffd-8115-491d-807c-0992d56f5982')

    expect(req.request.method).toEqual('GET')

    req.flush({order:order[0]})
  })

  it('Should get completed oders', () => {
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

  it('should get order by user id', ()=>{

    service.getOrdersByUserId('17236d6e-930b-4f4b-a9f2-54fafeb8ca1b').subscribe(res=>{
      expect(res.data).toBeTruthy();
    })

    const req = httpTestingController.expectOne('http://localhost:3000/orders/user/17236d6e-930b-4f4b-a9f2-54fafeb8ca1b')

    expect(req.request.method).toEqual('GET')

    req.flush({data: order})
  })
});
