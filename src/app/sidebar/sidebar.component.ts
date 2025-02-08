import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',     title: 'Dashboard',         icon:'nc-image',       class: '' },
    { path: '/icons',         title: 'Carousel',          icon:'nc-album-2',    class: '' },
    { path: '/table',         title: 'Listado Cargas',        icon:'nc-tile-56',    class: '' },
    { path: '/maps',          title: 'Usuarios',          icon:'nc-single-02',      class: '' },
    { path: '/user',          title: 'Creacion Usuario',  icon:'nc-single-02',  class: '' },

];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
