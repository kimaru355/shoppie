import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';
import { NavbarComponent } from '../navbar/navbar.component';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  product: Product | null = null;
  quantity = 1;
  cartItem: string = localStorage.getItem('productId') as string;

  constructor(private route: ActivatedRoute, private productService: ProductService, private cartService: CartService) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      console.log("Product id:p",productId);
      this.productService.getProduct(productId).subscribe(response => {
        if (response.success && response.data) {
          console.log("Product:p",response.data);
          this.product = response.data;
          console.log("Product:",this.product);
        }
      });
    }
  }

  changeQuantity(change: number): void {
    this.quantity += change;
    this.quantity = Math.max(1, this.quantity);
  }

  addToCart(productId: string) {
    console.log("This is the product id selected:" + productId);
    this.cartService.addToCart({ productId: productId, productNumber: this.quantity }).subscribe(res => {
      console.log(res);
    });
  }
}
