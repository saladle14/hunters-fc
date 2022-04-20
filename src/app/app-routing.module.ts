import { ErrorPageComponent } from './error-page/error-page.component';
import { AddShirtComponent } from './add-shirt/add-shirt.component';
import { ListShirtsComponent } from './list-shirts/list-shirts.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/add'},
  { path: 'list-shirts', component: ListShirtsComponent},
  { path: 'add', component: AddShirtComponent},
  { path: '**', component: ErrorPageComponent},
  // { path: 'list-shirts', loadChildren: () => import('./list-shirts/list-shirts.module').then(m => m.ListShirtsModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
