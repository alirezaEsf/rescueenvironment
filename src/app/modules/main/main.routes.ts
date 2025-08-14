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
    {
        path: 'module',
        loadComponent: () => import('./components/module-api/basemodule-api-management/basemodule-api-management.component')
            .then(c => c.BasemoduleApiManagementComponent)
    },
    {
        path: 'party',
        loadComponent: () => import('./components/services-api/party-management/party-management.component')
            .then(c => c.PartyManagementComponent)
    },
    {
        path: 'moduleBase',
        loadComponent: () => import('./components/module-base/module-base.component')
            .then(c => c.ModuleBaseComponent)
    },
    {
        path: 'clientBase',
        loadComponent: () => import('./components/client-base/client-base.component')
            .then(c => c.ClientBaseComponent)
    },
    {
        path: 'access-list',
        loadComponent: () => import('./components/access-list/access-list.component')
            .then(c => c.AccessListComponent)
    },
    {
        path: 'about',
        loadComponent: () => import('./components/about/about.component')
            .then(c => c.AboutComponent)
    },
    {
        path: 'costs',
        loadComponent: () => import('./components/costs/costs.component')
            .then(c => c.CostsComponent)
    },
    {
        path: 'factor',
        loadComponent: () => import('./components/factor/factor.component')
            .then(c => c.FactorComponent)
    },
    {
        path: 'log-reports',
        loadComponent: () => import('./components/log-reports/log-reports.component')
            .then(c => c.LogReportsComponent)
    },
    {
        path: 'mediators',
        loadComponent: () => import('./components/mediators-list-root/mediators-list-root.component')
            .then(c => c.MediatorsListRootComponent)
    },
    {
        path: 'mediatorsXml',
        loadComponent: () => import('./components/mediators/mediators.component')
            .then(c => c.MediatorsComponent)
    },
    {
        path: 'mediatorsJson',
        loadComponent: () => import('./components/mediators/mediators-json/mediators-json.component')
            .then(c => c.MediatorsJsonComponent)
    },
    {
        path: 'report',
        loadComponent: () => import('./components/report/report.component')
            .then(c => c.ReportComponent)
    },
    {
        path: 'roles',
        loadComponent: () => import('./components/roles/roles.component')
            .then(c => c.RolesComponent)
    },
    {
        path: 'rules',
        loadComponent: () => import('./components/rules/rules.component')
            .then(c => c.RulesComponent)
    },
    {
        path: 'user-management',
        loadComponent: () => import('./components/user-management/user-management.component')
            .then(c => c.UserManagementComponent)
    },
    {
        path: 'users',
        loadComponent: () => import('./components/users/users.component')
            .then(c => c.UsersComponent)
    },
    {
        path: 'client',
        loadComponent: () => import('./components/client/client.component')
            .then(c => c.ClientComponent)
    },
    {
        path: 'call-services-report',
        loadComponent: () => import('./components/call-services-report/call-services-report.component')
            .then(c => c.CallServicesReportComponent)
    },
    {
        path: 'wage-services',
        loadComponent: () => import('./components/wage/wage.component')
            .then(c => c.WageComponent)
    },
    {
        path: 'chart-report',
        loadComponent: () => import('./components/chart-report/chart-report.component')
            .then(c => c.ChartReportComponent)
    },
    {
        path: 'data-hub',
        loadComponent: () => import('./components/hub-management/hub-management.component')
            .then(c => c.HubManagementComponent)
    },
    {
        path: 'alerts',
        loadComponent: () => import('./components/alert-system/alert-system.component')
            .then(c => c.AlertSystemComponent)
    },
    {
        path: 'bill-store',
        loadComponent: () => import('./components/bill-store-cartable/bill-store-cartable.component')
            .then(c => c.BillStoreCartableComponent)
    },
    {
        path: 'response-rate',
        loadComponent: () => import('./components/response-rate/response-rate.component')
            .then(c => c.ResponseRateComponent)
    }
] as Routes;
