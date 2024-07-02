import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewProduct } from '../../interfaces/product'; // Adjust the import path as needed

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  @Input() product: NewProduct | null = null;
  @Output() saveChanges = new EventEmitter<NewProduct>();
  @Output() cancelEdit = new EventEmitter<void>();

  onSubmit() {
    if (this.product) {
      this.saveChanges.emit(this.product);
    }
  }

  onCancel() {
    this.cancelEdit.emit();
  }
}
