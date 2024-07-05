import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NavbarComponent,
    CommonModule,
    LoadingComponent,
  ],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css',
})
export class ReviewFormComponent {
  loading: boolean = true;
  reviewForm: FormGroup;

  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  }
  constructor(private fb: FormBuilder) {
    this.reviewForm = this.fb.group({
      review: ['', Validators.required],
      rating: [
        null,
        [Validators.required, Validators.min(1), Validators.max(5)],
      ],
    });
  }

  submitReview() {
    if (this.reviewForm.valid) {
    }
  }
}
