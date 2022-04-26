import { LoginComponent } from './routes/components/login/login.component';
import { ShirtDemoComponent } from './shirt-demo/shirt-demo.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AddShirtComponent } from './add-shirt/add-shirt.component';
import { ListShirtsComponent } from './list-shirts/list-shirts.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/add'},
  { path: 'list-shirts', component: ListShirtsComponent},
  { path: 'add', component: AddShirtComponent},
  { path: 'shirt', component: ShirtDemoComponent},
  { path: 'login', component: LoginComponent},
  { path: '**', component: ErrorPageComponent},
  // { path: 'list-shirts', loadChildren: () => import('./list-shirts/list-shirts.module').then(m => m.ListShirtsModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
