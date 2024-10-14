import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/entity/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url : string = "http://localhost:10095/product"

  constructor(private client : HttpClient) {}

  createProduct(newProduct : Product) : Observable<Product> {

    return this.client.post<Product>(this.url, newProduct)

  }

  readAllProducts() : Observable<Product[]> {

    return this.client.get<Product[]>(this.url)
    
  }

  readProduct(id : number | null | undefined) : Observable<Product> {

    return this.client.get<Product>(`${this.url}/${id}`)

  }

  updateProduct(updateProduct : Product) : Observable<Product> {

    return this.client.put<Product>(this.url, updateProduct);

  }

  deleteProduct(id : number | null | undefined) : Observable<Product> {

    return this.client.delete<Product>(`${this.url}/${id}`)

  }
}
