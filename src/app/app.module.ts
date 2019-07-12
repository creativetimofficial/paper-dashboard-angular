import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { DashboardComponent }       from './pages/dashboard/dashboard.component';
import { UserComponent }            from './pages/user/user.component';
import { TableComponent }           from './pages/table/table.component';
import { TypographyComponent }      from './pages/typography/typography.component';
import { IconsComponent }           from './pages/icons/icons.component';
import { MapsComponent }            from './pages/maps/maps.component';
import { NotificationsComponent }   from './pages/notifications/notifications.component';
import { UpgradeComponent }         from './pages/upgrade/upgrade.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserComponent,
    TableComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: true
    }),
    SidebarModule,
    ToastrModule.forRoot(), // ToastrModule added
    NavbarModule,
    FooterModule,
    FixedPluginModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
