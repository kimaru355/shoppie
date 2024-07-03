import { Component } from '@angular/core';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-admin-visuals',
  standalone: true,
  imports: [],
  templateUrl: './admin-visuals.component.html',
  styleUrl: './admin-visuals.component.css'
})
export class AdminVisualsComponent {
  constructor(private analyticService: AnalyticsService) {
    this.getAnalytics();
  }

  getAnalytics() {
    console.log('Getting analytics');

    this.analyticService.getAnalytics().subscribe(response => {
      console.log(response);
    });
  }
}
