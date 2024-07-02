import { Component, Input,Output, OnInit, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Input() product: Product | null = null;
  @Output() cancelEdit = new EventEmitter<void>();

  formMode: 'create' | 'update' = 'create';

  name: string = '';
  description: string = '';
  category: string = '';
  quantity: number = 0;
  price: number = 0;
  size: string = '';
  images: string[] = [];

  ngOnInit() {
    if (this.product) {
      this.formMode = 'update';
      this.name = this.product.name;
      this.description = this.product.description;
      this.category = this.product.type;
      this.quantity = this.product.quantity;
      this.price = this.product.price;
      this.size = this.product.size;
      this.images = this.product.images;
    }
  }

  onSubmit() {
    // Implement your logic to update or create the product data here
    console.log('Form submitted with data:', {
      name: this.name,
      description: this.description,
      category: this.category,
      quantity: this.quantity,
      price: this.price,
      size: this.size,
      images: this.images
    });
  }
  onCancel() {
    this.cancelEdit.emit();
  }
}
