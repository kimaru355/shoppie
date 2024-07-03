import { Component, Input, Output, OnInit, EventEmitter, OnDestroy, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import Dropzone from 'dropzone';


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnDestroy {
  dropzone: Dropzone = {} as Dropzone;

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
stockLimit: any;

  constructor(private elementRef: ElementRef, private productService: ProductService) {}

  ngOnInit() {
    this.dropzone = new Dropzone(this.elementRef.nativeElement, {
      url: '/your-upload-endpoint',
      autoProcessQueue: false,
    });
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


  files: File[] = [];

  onSelect(event: any): void {
    this.files.push(...event.addedFiles);
  }

  onRemove(event: File) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  onSubmit() {
    const productData: Product = {
      id: '',
      stockLimit: 0,
      name: this.name,
      description: this.description,
      type: this.category,
      quantity: this.quantity,
      price: this.price,
      size: this.size,
      images: this.images,
    };

    if (!productData.id) {
      this.productService.createProduct(productData).subscribe({
        next: (response) => console.log('Product created', response),
        error: (error) => console.error('Error creating product', error),
      });
    } else {
      this.productService.updateProduct(productData).subscribe({
        next: (response) => console.log('Product updated', response),
        error: (error) => console.error('Error updating product', error),
      });
    }

    console.log('Form submitted with data:', productData);
  }

  onCancel() {
    this.cancelEdit.emit();
  }

  ngOnDestroy(): void {
    if (this.dropzone) {
      this.dropzone.destroy();
    }
  }
}


