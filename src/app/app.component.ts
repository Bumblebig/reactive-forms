import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsComponent } from "./forms/forms.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, FormsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Reactive Form';
}