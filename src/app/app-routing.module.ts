import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AdminModuleComponent } from './components/admin-module/admin-module.component';
import { AddMenuComponent } from './components/add-menu/add-menu.component';
import { CompleteMenuComponent } from './components/complete-menu/complete-menu.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserModuleComponent } from './components/user-module/user-module.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';
import { FaqComponent } from './components/faq/faq.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { TableComponent } from './components/table/table.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { ReservationSummaryComponent } from './components/reservation-summary/reservation-summary.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  { path: '', component: HomePageComponent ,  pathMatch: 'full'},
  { path: 'login', component: LoginComponent ,  pathMatch: 'full'},
  { path: 'register', component: RegistrationComponent ,  pathMatch: 'full'},
  { path: 'change-password', component: ChangePasswordComponent ,  pathMatch: 'full'},
  { path: 'book-table', component: TableComponent ,  pathMatch: 'full'},
  { path: 'reservation', component: ReservationComponent ,  pathMatch: 'full'},
  { path: 'summary', component: ReservationSummaryComponent ,  pathMatch: 'full'},
  { path: 'menu-list', component: MenuListComponent ,  pathMatch: 'full'},
  { path: 'gallery', component: GalleryComponent ,  pathMatch: 'full'},
  { path: 'about', component: AboutComponent ,  pathMatch: 'full'},
  {
    path: 'admin',
    component: AdminModuleComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Default child route
      { path: 'dashboard', component: AdminDashboardComponent ,  pathMatch: 'full'},
      { path: 'add-menu', component: AddMenuComponent ,  pathMatch: 'full'},
      { path: 'complete-menu', component: CompleteMenuComponent ,  pathMatch: 'full'},
      { path: 'contact-details', component: ContactDetailsComponent ,  pathMatch: 'full'},

    ],
  },
  {
    path: 'user',
    component: UserModuleComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Default child route
      { path: 'dashboard', component: UserDashboardComponent ,  pathMatch: 'full'},
      { path: 'profile', component: ProfileComponent ,  pathMatch: 'full'},
      { path: 'book-table', component: TableComponent ,  pathMatch: 'full'},
      { path: 'my-bookings', component: MyBookingsComponent ,  pathMatch: 'full'},
      { path: 'faqs', component: FaqComponent ,  pathMatch: 'full'},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
