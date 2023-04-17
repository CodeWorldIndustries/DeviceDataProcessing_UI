import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {HomeComponent} from 'app/modules/home/home.component';
import {SharedModule} from '../../shared/shared.module';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FuseAlertModule} from '../../../@fuse/components/alert';
import {MatSelectModule} from '@angular/material/select';

const routes: Route[] = [
    {
        path: '',
        component: HomeComponent
    }
];

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        SharedModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatSlideToggleModule,
        FuseAlertModule,
        MatSelectModule
    ]
})
export class HomeModule {
}
