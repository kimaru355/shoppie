import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [CommonModule, NavbarComponent, LoadingComponent],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css'
})
export class FavouritesComponent {
  loading: boolean = true
  products = [
    {
    id: 1,
    name: "name",
    quantity: 1,
    size: "large",
    image: "/assets/imgs/men-s-casual-t-shirshort-sleeve-o-neck-t-shirt-lestyleparfait-kenya-t-shirts-1.webp"
  },
    {
    id: 1,
    name: "name",
    quantity: 1,
    size: "large",
    image: "/assets/imgs/men-s-casual-t-shirshort-sleeve-o-neck-t-shirt-lestyleparfait-kenya-t-shirts-1.webp"
  },
    {
    id: 1,
    name: "name",
    quantity: 1,
    size: "large",
    image: "/assets/imgs/men-s-casual-t-shirshort-sleeve-o-neck-t-shirt-lestyleparfait-kenya-t-shirts-1.webp"
  },
    {
    id: 1,
    name: "name",
    quantity: 1,
    size: "large",
    image: "/assets/imgs/men-s-casual-t-shirshort-sleeve-o-neck-t-shirt-lestyleparfait-kenya-t-shirts-1.webp"
  },
    {
    id: 1,
    name: "name",
    quantity: 1,
    size: "large",
    image: "/assets/imgs/men-s-casual-t-shirshort-sleeve-o-neck-t-shirt-lestyleparfait-kenya-t-shirts-1.webp"
  },
    {
    id: 1,
    name: "name",
    quantity: 1,
    size: "large",
    image: "/assets/imgs/men-s-casual-t-shirshort-sleeve-o-neck-t-shirt-lestyleparfait-kenya-t-shirts-1.webp"
  },
    {
    id: 1,
    name: "name",
    quantity: 1,
    size: "large",
    image: "/assets/imgs/men-s-casual-t-shirshort-sleeve-o-neck-t-shirt-lestyleparfait-kenya-t-shirts-1.webp"
  },
]
ngOnInit() {

  setTimeout(() => {
    this.loading = false; // Hide the overlay after 1.5 seconds
  }, 1500);

}
}
