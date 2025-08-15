/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';
let navigations:any=  [
    {
        "icon": "home",
        "menuId": 2,
        "id": "home",
        "title": "home",
        "type": "basic",
        "parentId": 1,
        "translate": "home",
        "link": "/main/home",
        "children": [],
    },
    {
        "icon": "feedback",
        "menuId": 3,
        "id": "about",
        "title": "About Us",
        "type": "basic",
        "parentId": 1,
        "translate": "About Us",
        "link": "/main/about",
        "children": [],
    },
    {
        "icon": "call",
        "menuId": 4,
        "id": "contact",
        "title": "Contact Us",
        "type": "basic",
        "parentId": 1,
        "translate": "Contact Us",
        "link": "/main/contact",
        "children": [],
    },{
        "icon": "business",
        "menuId": 5,
        "id": "projects",
        "title": "Projects",
        "type": "basic",
        "parentId": 1,
        "translate": "Projects",
        "link": "/main/projects",
        "children": [],
    },

];
export const defaultNavigation: FuseNavigationItem[] = navigations
export const compactNavigation: FuseNavigationItem[] = navigations
export const futuristicNavigation: FuseNavigationItem[] = navigations
export const horizontalNavigation: FuseNavigationItem[] = navigations
