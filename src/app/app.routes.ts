import { Routes } from '@angular/router';
import { FormsComponent } from './forms/forms.component';
import { SuccessComponent } from './success/success.component';

const routeConfig: Routes = [
    { path: '', component: FormsComponent, title: "Form | Abdurrahman Abdulsalam" },
    { path: 'success', component: SuccessComponent, title: 'Success | Abdurrahman Abdulsalam' }
];

export default routeConfig;