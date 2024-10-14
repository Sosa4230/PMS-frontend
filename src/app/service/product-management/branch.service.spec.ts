import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from 'src/app/entity/product';

describe('ProductService', () => {
  let service: ProductService;
  let mock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    mock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    mock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request', () => {
    const product: Product = new Product()
    product.name = "Test"
    product.price = 500

    service.createProduct(product).subscribe();

    const req = mock.expectOne('http://localhost:10095/product');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(product)
  });

  it('should send a GET request', () => {
    service.readAllProducts().subscribe();

    const req = mock.expectOne('http://localhost:10095/product');
    expect(req.request.method).toBe('GET');
    expect(req.request.body).toEqual(null)
  });

  it('should send a GET request', () => {
    service.readProduct(1).subscribe();

    const req = mock.expectOne('http://localhost:10095/product/1');
    expect(req.request.method).toBe('GET');
    expect(req.request.body).toEqual(null)
  });

  it('should send a PUT request', () => {
    const product: Product = new Product()
    product.name = "Test"
    product.price = 500

    service.updateProduct(product).subscribe();

    const req = mock.expectOne('http://localhost:10095/product');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(product)
  });

  it('should send a DELETE request', () => {
    service.deleteProduct(1).subscribe();

    const req = mock.expectOne('http://localhost:10095/product/1');
    expect(req.request.method).toBe('DELETE');
    expect(req.request.body).toEqual(null)
  });
});
