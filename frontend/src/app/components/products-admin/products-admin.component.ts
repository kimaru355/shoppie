import { FormComponent } from './../form/form.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Subscription } from 'rxjs';


interface Product {
  id: number;
  name: string;
  type: string;
  price: number;
  description: string;
  image: string;
  remainingProducts: number;
  totalProducts: number;
}

@Component({
  selector: 'app-products-admin',
  standalone: true,
  imports: [CommonModule,  FormComponent],
  templateUrl: './products-admin.component.html',
  styleUrl: './products-admin.component.css'
})
export class ProductsAdminComponent {
    progressPercentage: number = 20;
  // products: Product[] = [
  //   {
  //     id: 1,
  //     name: 'Floral Tshirt',
  //     type: 'Tshirt',
  //     price: 1200,
  //     description: 'Checked fabric out of the premium material, Imported from the best London tailors',
  //     image: '/assets/imgs/floralshirt.webp',
  //     remainingProducts: 30,
  //     totalProducts: 100
  //   },
  //   {
  //     id: 1,
  //     name: 'Floral Tshirt',
  //     type: 'Tshirt',
  //     price: 1200,
  //     description: 'Checked fabric out of the premium material, Imported from the best London tailors',
  //     image: '/assets/imgs/floralshirt.webp',
  //     remainingProducts: 30,
  //     totalProducts: 100
  //   },
  //   {
  //     id: 1,
  //     name: 'Floral Tshirt',
  //     type: 'Tshirt',
  //     price: 1200,
  //     description: 'Checked fabric out of the premium material, Imported from the best London tailors',
  //     image: '/assets/imgs/floralshirt.webp',
  //     remainingProducts: 30,
  //     totalProducts: 100
  //   },
  //   {
  //     id: 1,
  //     name: 'Floral Tshirt',
  //     type: 'Tshirt',
  //     price: 1200,
  //     description: 'Checked fabric out of the premium material, Imported from the best London tailors',
  //     image: '/assets/imgs/floralshirt.webp',
  //     remainingProducts: 30,
  //     totalProducts: 100
  //   },
  //   {
  //     id: 1,
  //     name: 'Floral Tshirt',
  //     type: 'Tshirt',
  //     price: 1300,
  //     description: 'Checked fabric out of the premium material, Imported from the best London tailors',
  //     image: '/assets/imgs/floralshirt.webp',
  //     remainingProducts: 30,
  //     totalProducts: 100
  //   },
  //   {
  //     id: 1,
  //     name: 'Floral Tshirt',
  //     type: 'Tshirt',
  //     price: 1200,
  //     description: 'Checked fabric out of the premium material, Imported from the best London tailors',
  //     image: '/assets/imgs/floralshirt.webp',
  //     remainingProducts: 30,
  //     totalProducts: 100
  //   },
  // ];

  constructor(private productService: ProductService){}

  products: Product[] = []
  productsSubscription: Subscription | undefined;

  ngOnInit() {
    this.productsSubscription = this.productService.getAllProducts().subscribe(
      (res) => {
        if (res.success) {
          // this.products = res.data || [];
        } else {
          // Handle error
          console.error(res.message);
        }
      },
      (error) => {
        // Handle error
        console.error(error);
      }
    );
  }


  // selectedProduct: Product | null = null;

  handleEditClick(product: Product) {
    // this.selectedProduct = product;
  }

}
