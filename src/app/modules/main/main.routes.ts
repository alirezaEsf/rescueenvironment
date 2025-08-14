import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';

export default [
    {
        path: '',
        component: HomeComponent, // تنها کامپوننت eager-loaded
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'messages-management',
        loadComponent: () => import('./components/messages-management/messages-management.component')
            .then(c => c.MessagesManagementComponent)
    },

] as Routes;
