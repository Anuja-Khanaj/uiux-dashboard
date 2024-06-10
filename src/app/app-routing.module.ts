import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { AllPostComponent } from './posts/all-post/all-post.component';
import { NewPostComponent } from './posts/new-post/new-post.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { SubscribersComponent } from './subscribers/subscribers.component';
import { SignupComponent } from './auth/signup/signup.component';

const routes: Routes = [
  {path:'',component:LoginComponent,},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'category',component:CategoriesComponent,canActivate:[AuthGuard]},
  {path:'post' , component:AllPostComponent,canActivate:[AuthGuard]},
  {path:'subscribers' , component:SubscribersComponent,canActivate:[AuthGuard]},
  {path:'newPost', component:NewPostComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
