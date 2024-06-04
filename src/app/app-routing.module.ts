import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { AllPostComponent } from './posts/all-post/all-post.component';
import { NewPostComponent } from './posts/new-post/new-post.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  {path:'',component:DashboardComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'login',component:LoginComponent},
  {path:'category',component:CategoriesComponent},
  {path:'post' , component:AllPostComponent},
  {path:'newPost', component:NewPostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
