import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { NewProduct } from '../interfaces/product';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { newTestProduct, products } from '../test_data/test_data';

describe('ProductService', () => {
  let service: ProductService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all products', () => {
    service.getAllProducts().subscribe(res => {
      expect(res).toBeTruthy();
      let test = res.data as NewProduct[];
      expect(test.length).toBe(3);

      expect(test[1].quantity).toBe(78);
    });

    const req = httpTestingController.expectOne(
      'http://localhost:3000/products/all'
    );
    expect(req.request.method).toEqual('GET');

    req.flush({ data: products });
  });

  it('should create product', () => {
    service.createProduct(newTestProduct)
  });
  it('should delete product by id', () => {
    expect(service.deleteProduct('')).toBeTruthy();
  });
  it('should update product', () => {
    // expect(service.updateProduct()).toBeTruthy();
  });
    
});
