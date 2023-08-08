import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopNavbarComponent } from './components/top-navbar/top-navbar.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SideNavbarComponent } from './components/side-navbar/side-navbar.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AddMenuComponent } from './components/add-menu/add-menu.component';
import { CompleteMenuComponent } from './components/complete-menu/complete-menu.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';

@NgModule({
  declarations: [
    AppComponent,
    TopNavbarComponent,
    HomePageComponent,
    SideNavbarComponent,
    AdminDashboardComponent,
    AddMenuComponent,
    CompleteMenuComponent,
    ContactDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
