import { Routes } from '@angular/router';
import { Dashboard } from '../app/dashboard/dashboard';
import { User } from '../app/user/user';


export const routes: Routes = [
    { path: '', component: Dashboard },
    { path: 'dashboard', component: Dashboard },
    { path: 'user', component: User },
];
