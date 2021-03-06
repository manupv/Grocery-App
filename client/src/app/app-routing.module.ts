import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { CategoriesComponent } from './categories/categories.component';
import { AddCategoryComponent } from './categories/add-category.component'
import { ItemsComponent } from './items/items.component';
import { ListsComponent } from './lists/lists.component';

import { AuthGuard } from './guards/auth.guard'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add_category',
    component: AddCategoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'items',
    component: ItemsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'lists',
    component: ListsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
