import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxSemanticModule } from 'ngx-semantic';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, ReactiveFormsModule, NgxSemanticModule],
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {
  form!: FormGroup;
  countries: any[] = [];
  occupations = [
    { text: 'Frontend Developer', value: 'Frontend' },
    { text: 'Backend Developer', value: 'Backend' },
    { text: 'Designer', value: 'Designer' },
    { text: 'Devops Engineer', value: 'Devops Engineer' },
  ];

  constructor(
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.initializeForm();
  }

  ngOnInit() {
    this.fetchDetails();
  }

  private initializeForm() {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[A-Z])(?=.*\W).+$/),
        ],
      ],
      phone: ['', Validators.required],
      country: ['', Validators.required],
      occupation: ['', Validators.required],
      successful: ['', Validators.required],
    });
  }

  fetchDetails() {
    this.http.get('https://restcountries.com/v3.1/all').subscribe(
      (resp: any) => {
        this.countries = resp
          .map((country: any) => ({
            text: country.name.common,
            value: country.cca2,
          }))
          .sort((a: any, b: any) => a.text.localeCompare(b.text));
      },
      (error) => {
        console.error('Error fetching country data:', error);
      }
    );
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      console.log('Form Data:', formData);

      if (formData.successful === 'true') {
        this.toastr.success('Form submitted successfully!', 'Success');
        this.router.navigate(['/success']);
      } else {
        this.toastr.error('Form submission failed. Please try again.', 'Error');
        this.router.navigate(['/']);
      }
    } else {
      this.toastr.warning('Please fill out all required fields correctly.', 'Warning');
    }
  }

  getControl(controlName: string): AbstractControl | null {
    return this.form.get(controlName);
  }
}
