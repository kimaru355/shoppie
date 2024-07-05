import {
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter,
  OnDestroy,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import Dropzone from 'dropzone';
import { FileToUmageUrlPipe } from '../../pipes/file-to-umage-url.pipe';
import { LoadingComponent } from '../loading/loading.component';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule, FileToUmageUrlPipe, LoadingComponent, MessageComponent],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit, OnDestroy {
  message: string | null = null;
  messageType: 'success' | 'error' | undefined;

  @Input() product: Product | null = null;
  @Output() cancelEdit = new EventEmitter<void>();
  loading: boolean = true;

  dropzone!: Dropzone;
  formMode: 'create' | 'update' = 'create';
  name: string = '';
  description: string = '';
  category: string = '';
  quantity: number = 0;
  price: number = 0;
  size: string = '';
  images: string[] = [];
  files: File[] = [];
  stockLimit: number = 0;

  constructor(
    private elementRef: ElementRef,
    private productService: ProductService
  ) {}

  ngOnDestroy(): void {
    
  }

  ngOnInit(): void {
    this.initializeDropzone();
    this.loadProductData();

    setTimeout(() => {
      this.loading = false;
    }, 1500);
  }

  private initializeDropzone(): void {
    this.dropzone = new Dropzone(
      this.elementRef.nativeElement.querySelector('.dropzone'),
      {
        url: '/your-upload-endpoint', // This won't be used
        autoProcessQueue: false,
        addRemoveLinks: true,
      }
    );

    this.dropzone.on('addedfile', (file: File) => {
      this.files.push(file);
      this.readFile(file);
    });

    this.dropzone.on('removedfile', (file: File) => {
      this.files.splice(this.files.indexOf(file), 1);
      const index = this.images.indexOf(file.name);
      if (index !== -1) {
        this.images.splice(index, 1);
      }
    });
  }

  private readFile(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.images.push(e.target.result);
    };
    reader.readAsDataURL(file);
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

  onSubmit(): void {
    this.uploadFiles(this.files)
      .then((uploadedFileUrls) => {
        const productData: Product = {
          id: this.product ? this.product.id : '',
          name: this.name,
          description: this.description,
          type: this.category,
          quantity: this.quantity,
          price: this.price,
          size: this.size,
          images: [...this.images, ...uploadedFileUrls],
          stockLimit: this.stockLimit,
        };

        if (this.formMode === 'create') {
          this.productService.createProduct(productData).subscribe({
            next: (response) => {
              if (response.success) {
                this.showMessage('Product created successfully', 'success');
                console.log('Product created', response);
              } else {
                this.showMessage(response.message || 'Unknown error', 'error');
                console.error('Error creating product', response);
              }
            },
            error: (error) => {
              this.showMessage('Error creating product', 'error');
              console.error('Error creating product', error);
            },
          });
        } else {
          this.productService.updateProduct(productData).subscribe({
            next: (response) => {
              if (response.success) {
                this.showMessage('Product updated successfully', 'success');
                console.log('Product updated', response);
              } else {
                this.showMessage(response.message || 'Unknown error', 'error');
                console.error('Error updating product', response);
              }
            },
            error: (error) => {
              this.showMessage('Error updating product', 'error');
              console.error('Error updating product', error);
            },
          });
        }

        console.log('Form submitted with data:', productData);
      })
      .catch((error) => {
        this.showMessage('Error uploading files', 'error');
        console.error('Error uploading files', error);
      });
  }

  async uploadFiles(files: File[]): Promise<string[]> {
    const urls: string[] = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'shoppie');
      formData.append('cloud_name', 'dr0qq0taf');

      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dr0qq0taf/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      urls.push(data.url);
    }

    return urls;
  }

  onCancel(): void {
    this.cancelEdit.emit();
  }

  showMessage(message: string, type: 'success' | 'error'): void {
    this.message = message;
    this.messageType = type;
    setTimeout(() => {
      this.clearMessage();
    }, 2000);
  }

  clearMessage(): void {
    this.message = null;
    this.messageType = undefined;
  }
}
