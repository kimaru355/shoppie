  import { CommonModule } from '@angular/common';
  import { Component, OnInit } from '@angular/core';
  import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

  @Component({
    selector: 'app-signup',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.css'
  })
  export class SignupComponent implements OnInit {
    signupForm: FormGroup;

    constructor(private fb: FormBuilder) {
      this.signupForm = this.fb.group({});
    }

    ngOnInit() {
      this.signupForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required]
      }, {
        validator: this.mustMatch('password', 'confirmPassword')
      });
    }

    mustMatch(controlName: string, matchingControlName: string) {
      return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
          return;
        }

        if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
        } else {
          matchingControl.setErrors(null);
        }
      };
    }

    onSubmit() {
      if (this.signupForm.valid) {
        // Handle form submission
        console.log(this.signupForm.value);
        this.signupForm.reset();
      }
    }
  }
