import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopNavbarComponent } from './components/top-navbar/top-navbar.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SideNavbarComponent } from './components/side-navbar/side-navbar.component';
import { AdminModuleComponent } from './components/admin-module/admin-module.component';
import { AddMenuComponent } from './components/add-menu/add-menu.component';
import { CompleteMenuComponent } from './components/complete-menu/complete-menu.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserModuleComponent } from './components/user-module/user-module.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserSideNavbarComponent } from './components/user-side-navbar/user-side-navbar.component';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FaqComponent } from './components/faq/faq.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { TableComponent } from './components/table/table.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { ReservationSummaryComponent } from './components/reservation-summary/reservation-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    TopNavbarComponent,
    HomePageComponent,
    SideNavbarComponent,
    AdminModuleComponent,
    AddMenuComponent,
    CompleteMenuComponent,
    ContactDetailsComponent,
    BreadcrumbComponent,
    AdminDashboardComponent,
    UserModuleComponent,
    UserDashboardComponent,
    UserSideNavbarComponent,
    MyBookingsComponent,
    ProfileComponent,
    FaqComponent,
    RegistrationComponent,
    LoginComponent,
    ChangePasswordComponent,
    TableComponent,
    ReservationComponent,
    ReservationSummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
