import { ListMatchComponent } from './routes/components/admin/list-match/list-match.component';
import { AdminComponent } from './routes/components/admin/admin.component';
import { FixtureResultComponent } from './routes/components/fixture-result/fixture-result.component';
import { HomeComponent } from './routes/components/home/home.component';
import { Role } from './shared/auth.service';
import { AuthGuard } from './shared/auth.guard';
import { ShirtDemoComponent } from './shirt-demo/shirt-demo.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AddShirtComponent } from './add-shirt/add-shirt.component';
import { ListShirtsComponent } from './list-shirts/list-shirts.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './routes/components/dashboard/dashboard.component';
import { ClubInformationComponent } from './routes/components/club-information/club-information.component';
import { PlayerListComponent } from './routes/components/admin/player-list/player-list.component';
import { ShirtRegisterComponent } from './routes/components/shirt-register/shirt-register.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home/dashboard' },
  { path: 'login', component: LoginComponent },
  // { path: 'home', component: HomeComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'fixture', component: FixtureResultComponent },
      { path: 'traditional-room', component: ClubInformationComponent },
      { path: 'shirt-register', component: ShirtRegisterComponent },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { role: [Role.Admin] },
    children: [
      { path: 'list-match', component: ListMatchComponent },
      { path: 'player-list', component: PlayerListComponent },
      { path: 'list-shirt', component: ListShirtsComponent },
    ],
  },
  // {
  //   path: 'dashboard',
  //   component: DashboardComponent,
  //   canActivate: [AuthGuard],
  //   children: [
  //     {
  //       path: 'add',
  //       component: AddShirtComponent,
  //       canActivate: [AuthGuard],
  //       data: { roles: [Role.Admin] },
  //     },
  //     { path: 'shirt', component: ShirtDemoComponent },
  //   ],
  // },
  { path: 'list-shirts', component: ListShirtsComponent },
  { path: '**', component: ErrorPageComponent, canActivate: [AuthGuard] },
  // { path: 'list-shirts', loadChildren: () => import('./list-shirts/list-shirts.module').then(m => m.ListShirtsModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
