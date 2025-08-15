import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import { AboutComponent } from './components/about.component';

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
        path: 'about',
        component: AboutComponent,
    },



] as Routes;
