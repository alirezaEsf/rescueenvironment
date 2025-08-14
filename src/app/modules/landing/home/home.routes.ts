import { Routes } from '@angular/router';
import { LandingHomeComponent } from 'app/modules/landing/home/home.component';
import { WalletHomeComponent } from '../wallet-home/wallet-home.component';

export default [
    {
        path: '',
        component: LandingHomeComponent,
    },
    {
        path: 'wallet-home',
        component: WalletHomeComponent,
    },
    {
        path: 'wallet-home',
        component: WalletHomeComponent,
    },
] as Routes;
