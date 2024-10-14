import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PriceValidation } from 'src/app/custom-validation/addressValidation';
import { Product } from 'src/app/entity/product';
import { ProductService } from 'src/app/service/product-management/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products : Product[] = []

  form : FormGroup = new FormGroup({
    name : new FormControl("", [Validators.required]),
    price : new FormControl(0, [Validators.required, PriceValidation.price])
  })

  createMode : boolean = true

  updatedProduct !: Product

  @ViewChild('formHeading')
  h3 : any

  @ViewChild('formSubmission', {static: false})
  inputButton : any

  constructor(private service : ProductService) {}

  ngOnInit(): void {
    this.refreshProductsList()
  }

  refreshProductsList() {
    this.service.readAllProducts().subscribe({
      next: (products: Product[]) => {
        this.products = products;
      },
      error: err => {
        console.error('Loading error:', err);
      },
      complete: () => {
        console.log('Submission successful!');
      },
    })
  }

  public get f() : any {

    return this.form.controls

  }

  submit() {
    if (this.createMode) {
      const newProduct = new Product()
      newProduct.name = this.form.value['name']
      newProduct.price = this.form.value['price']
      const subscription = this.service.createProduct(newProduct).subscribe({
        next: value => {},
        error: err => {
          console.error('Submission error:', err)
        },
        complete : () => {
          console.log('Submission successful!')
          subscription.unsubscribe()
          this.refreshProductsList()
        }
      })
    } else {
      this.updatedProduct.name = this.form.value['name']
      this.updatedProduct.price = this.form.value['price']
      const subscription = this.service.updateProduct(this.updatedProduct).subscribe({
        next: value => {},
        error: err => {
          console.error('Submission error:', err)
        },
        complete : () => {
          console.log('Submission successful!')
          subscription.unsubscribe()
          this.refreshProductsList()
        }
      })
    }
  }

  createProduct() {
    this.createMode = true
    this.h3.nativeElement.textContent = "Create Product Entry"
    this.inputButton.nativeElement.value = "Create"
    this.form.reset()
  }

  updateProduct(id : number | null| undefined) {
    this.service.readProduct(id).subscribe(data => {
      this.updatedProduct = data
      this.form.patchValue({
        name : data.name,
        price : data.price
      })},
    error => console.log(error))
    this.createMode = false
    this.h3.nativeElement.textContent = "Update Product Entry"
    this.inputButton.nativeElement.value = "Update"
  }

  deleteProduct(id : number | null| undefined) {
    this.service.deleteProduct(id).subscribe({
      next: (response) => {},
      error: (err) => {
        console.error('Deletion error:', err);
      },
      complete: () => {
        this.refreshProductsList();
      }
    })
  }

}
