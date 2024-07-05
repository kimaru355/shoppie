import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../../services/analytics.service';
import { LoadingComponent } from '../loading/loading.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-visuals',
  standalone: true,
  imports: [LoadingComponent, CommonModule],
  templateUrl: './admin-visuals.component.html',
  styleUrls: ['./admin-visuals.component.css']
})
export class AdminVisualsComponent implements OnInit {
  totalUsers: number = 0;
  totalProducts: number = 0;
  totalCategories: number = 0;
  totalProductsSold: number = 0;
  tenLeastStockProducts: any[] = [];
  topTenSellingProducts: any[] = [];
  loading: boolean = true;

  constructor(private analyticService: AnalyticsService) {}

  ngOnInit() {
    this.getAnalytics();
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  }

  getAnalytics() {
    console.log('Getting analytics');

    this.analyticService.getAnalytics().subscribe(response => {
      console.log(response);

      if (response.success && response.data) {
        this.totalUsers = response.data.totalUsers;
        this.totalProducts = response.data.totalProducts;
        this.totalCategories = response.data.totalCategories;
        this.totalProductsSold = response.data.totalProductsSold;
        this.tenLeastStockProducts = response.data.tenLeastStockProducts;
        this.topTenSellingProducts = response.data.topTenSellingProducts;
      }
    });
  }
}
