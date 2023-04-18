import {Route} from '@angular/router';
import {LayoutComponent} from 'app/layout/layout.component';
import {InitialDataResolver} from 'app/app.resolvers';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/home'
    {path: '', pathMatch: 'full', redirectTo: 'home'},

    // routes
    {
        path: '',
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver
        },
        children: [
            {path: 'home', loadChildren: () => import('app/modules/home/home.module').then(m => m.HomeModule)},
        ]
    },
    {
        path: '',
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver
        },
        children: [
            {
                path: 'dashboard',
               loadChildren: () => import('app/modules/dashboard/dashboard.module').then(m => m.DashboardModule)
            },
        ]
    },
    // Catch all
    {path: '**', redirectTo: 'home'}
];
