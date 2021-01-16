import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CartItemComponent } from './cart-item/cart-item.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RestoServicesComponent } from './resto-services/resto-services.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path:"",redirectTo:"home",pathMatch:"full"},
  {path:"header",component:HeaderComponent},
  {path:"home",component:HomeComponent},
  {path:"signup",component:SignupComponent},
  {path:"resto-services",component:RestoServicesComponent,canActivate:[AuthGuard]},
  {path:"cart-item",component:CartItemComponent,canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'profile',component:ProfileComponent},
  {path:'editPro',component:EditProfileComponent},
  {path:'resetPass',component:ResetPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
