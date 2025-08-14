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


] as Routes;
