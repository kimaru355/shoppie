import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Cart } from '../interfaces/cart';
import { order } from '../test_data/test_data';
import { Order } from '../interfaces/order';

describe('CartService', () => {
  let service: CartService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CartService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(CartService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should add items to cart', () => {
    service.getCart().subscribe((res) => {
      expect(res).toBeTruthy();
      expect(res.message).toBe('Item successfully added to cart');
    });

    const req = httpTestingController.expectOne(
      'http://localhost:3000/cart/add'
    );
    expect(req.request.method).toEqual('POST');
  });

  it('should get cart items', ()=>{
    service.getCart().subscribe(res=>{
      expect(res).toBeTruthy();
      let test = res.data as Cart[];
      expect(test.length).toBe(3);

      expect(test[1].productNumber).toBe(56);
    });

    const req = httpTestingController.expectOne(
      'http://localhost:3000/cart/all'
    );
    expect(req.request.method).toEqual('GET');

    req.flush({ data: order });
  })

  it('should delete item from cart', ()=>{
    service.deleteFromCart('fea51ffd-8115-491d-807c-0992d56f5982').subscribe(res=>{
      expect(res).toBeTruthy();
      expect(res.message).toBe('Item successfully removed from cart');
      expect(res.success).toBe(true);
    })

    const req = httpTestingController.expectOne('http://localhost:3000/cart/delete/fea51ffd-8115-491d-807c-0992d56f5982')

    expect(req.request.method).toEqual('DELETE')

    req.flush({order:order[0]})
  })

  it('Should delete all items from cart', () => {
    service.emptyCart().subscribe(res=>{
      expect(res).toBeTruthy();
      expect(res.message).toBe('Cart successfully emptied');
      expect(res.success).toBe(true);
    })

    const req = httpTestingController.expectOne('http://localhost:3000/cart/delete/all')

    expect(req.request.method).toEqual('DELETE');
  });
});
