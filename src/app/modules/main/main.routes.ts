import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';

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
     {
        path: 'contact',
        component: ContactUsComponent,
    },




] as Routes;
