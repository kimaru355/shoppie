import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})

export class ShopComponent {
  minPrice: number = 500;
  maxPrice: number = 100000;
  progressWidth: string = '0%';

  constructor() {
    this.updateProgressWidth();
  }
  updatePriceRange(): void {
    if (this.minPrice > this.maxPrice) {
      let temp = this.maxPrice;
      this.maxPrice = this.minPrice;
      this.minPrice = temp;
    }
    this.updateProgressWidth();
  }
  private updateProgressWidth(): void {
    let totalRange = 10000; 
    let selectedRange = this.maxPrice - this.minPrice;
    let progressPercentage = (selectedRange / totalRange) * 100;
    this.progressWidth = `${progressPercentage}%`;
  }

}
