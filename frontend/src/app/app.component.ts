import { FavouritesComponent } from './components/favourites/favourites.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ShopComponent } from './components/shop/shop.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { HistoryComponent } from './components/history/history.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import {CloudinaryModule} from '@cloudinary/ng';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LandingComponent, NavbarComponent, ShopComponent, LoginComponent, SignupComponent, ProductComponent, CartComponent, HistoryComponent, FavouritesComponent, NgxDropzoneModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'shoppie';

  providers: any[] = [];

  files: File[] = [];

  constructor() {
    this.providers = [];
  }



  onSelect(event: any): void {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: File) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

}
