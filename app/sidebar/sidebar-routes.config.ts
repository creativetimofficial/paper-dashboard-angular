import { MenuType, RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Dashboard', menuType: MenuType.LEFT, icon: 'ti-panel' },
    { path: 'user', title: 'User Profile', menuType: MenuType.LEFT, icon:'ti-user' },
    { path: 'table', title: 'Table List', menuType: MenuType.LEFT, icon:'ti-view-list-alt' },
    { path: 'typography', title: 'Typography', menuType: MenuType.LEFT, icon:'ti-text' },
    { path: 'icons', title: 'Icons', menuType: MenuType.LEFT, icon:'ti-pencil-alt2' },
    { path: 'maps', title: 'Maps', menuType: MenuType.LEFT, icon:'ti-map' },
    { path: 'notifications', title: 'Notifications', menuType: MenuType.LEFT, icon:'ti-bell' }
];
