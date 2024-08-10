import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="ui container segment">
      <i class="check circle icon huge"></i>
      <h1>Success</h1>
      <p>Your form has been submitted successfully!</p>
      <button class="ui button primary" (click)="goBack()">Back to Form</button>
    </div>

  `,
  styleUrl: './success.component.css'
})
export class SuccessComponent {
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate([""])
  }
}