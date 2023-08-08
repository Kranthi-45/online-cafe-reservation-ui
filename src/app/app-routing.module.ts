import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AddMenuComponent } from './components/add-menu/add-menu.component';
import { CompleteMenuComponent } from './components/complete-menu/complete-menu.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';

const routes: Routes = [
  { path: '', component: HomePageComponent ,  pathMatch: 'full'},
  {
    path: 'dashboard',
    component: AdminDashboardComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Default child route
      { path: 'dashboard', component: AdminDashboardComponent ,  pathMatch: 'full'},
      { path: 'add-menu', component: AddMenuComponent ,  pathMatch: 'full'},
      { path: 'complete-menu', component: CompleteMenuComponent ,  pathMatch: 'full'},
      { path: 'contact-details', component: ContactDetailsComponent ,  pathMatch: 'full'},

    ],
  },
  // ... other routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
