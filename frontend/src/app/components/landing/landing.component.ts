import { NavbarComponent } from './../navbar/navbar.component';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoadingComponent } from '../loading/loading.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink, NavbarComponent, LoadingComponent, CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  loading: boolean = true;
  ngOnInit() {

    setTimeout(() => {
      this.loading = false;
    }, 1500);

  }

}
