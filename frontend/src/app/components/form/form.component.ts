import { Component, Input, Output, OnInit, EventEmitter, OnDestroy, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import Dropzone from 'dropzone';
import { FileToUmageUrlPipe } from '../../pipes/file-to-umage-url.pipe';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule, FileToUmageUrlPipe],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnDestroy {
  @Input() product: Product | null = null;
  @Output() cancelEdit = new EventEmitter<void>();

  dropzone!: Dropzone;
  formMode: 'create' | 'update' = 'create';
  name: string = '';
  description: string = '';
  category: string = '';
  quantity: number = 0;
  stockLimit: number = 0;
  price: number = 0;
  size: string = '';
  images: string[] = [];
  files: File[] = [];

  constructor(private elementRef: ElementRef, private productService: ProductService) {}

  ngOnInit(): void {
    this.initializeDropzone();
    this.loadProductData();
  }

  private initializeDropzone(): void {
    this.dropzone = new Dropzone(this.elementRef.nativeElement, {
      url: '/your-upload-endpoint',
      autoProcessQueue: false,
    });
  }

  private loadProductData(): void {
    if (this.product) {
      this.formMode = 'update';
      this.name = this.product.name;
      this.description = this.product.description;
      this.category = this.product.type;
      this.quantity = this.product.quantity;
      this.price = this.product.price;
      this.size = this.product.size;
      this.images = this.product.images;
      this.stockLimit = this.product.stockLimit;
    }
  }

  onSelect(event: any): void {
    this.files.push(...event.addedFiles);
  }

  onRemove(event: File): void {
    this.files.splice(this.files.indexOf(event), 1);
  }

  onSubmit(): void {
    const productData: Product = {
      id: this.product ? this.product.id : '', // Use existing ID if in update mode
      name: this.name,
      description: this.description,
      type: this.category,
      quantity: this.quantity,
      price: this.price,
      size: this.size,
      images: this.images,
      stockLimit: 0, // Assuming stockLimit is a required field, default to 0 or another logic as needed
    };

    if (this.formMode === 'create') {
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

  onCancel(): void {
    this.cancelEdit.emit();
  }

  ngOnDestroy(): void {
    this.dropzone.destroy();
  }
}
