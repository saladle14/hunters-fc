import { Role } from './shared/auth.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './shared/auth.guard';
import { ShirtDemoComponent } from './shirt-demo/shirt-demo.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AddShirtComponent } from './add-shirt/add-shirt.component';
import { ListShirtsComponent } from './list-shirts/list-shirts.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: '/add', canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'add', component: AddShirtComponent, canActivate: [AuthGuard], data: {roles: [Role.Admin]}},
      { path: 'shirt', component: ShirtDemoComponent },
    ],
  },
  { path: 'list-shirts', component: ListShirtsComponent },
  { path: '**', component: LoginComponent},
  // { path: 'list-shirts', loadChildren: () => import('./list-shirts/list-shirts.module').then(m => m.ListShirtsModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
