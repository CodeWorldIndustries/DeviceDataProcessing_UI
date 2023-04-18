/* tslint:disable:max-line-length */
import {FuseNavigationItem} from '@fuse/components/navigation';

const nav: FuseNavigationItem[] = [
    {
        id: 'home',
        title: 'Home',
        type: 'basic',
        icon: 'mat_outline:home',
        link: '/home'
    },
    {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'basic',
        icon: 'mat_outline:dashboard',
        link: '/dashboard'
    }
]

export const defaultNavigation: FuseNavigationItem[] = nav;
export const horizontalNavigation: FuseNavigationItem[] = nav;
