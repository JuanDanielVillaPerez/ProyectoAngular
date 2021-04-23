import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/main/home/home.component';
import { HumedadComponent } from './components/main/humedad/humedad.component';
import { HumesueloComponent } from './components/main/humesuelo/humesuelo.component';
import { PirComponent } from './components/main/pir/pir.component';
import { TemperaturaComponent } from './components/main/temperatura/temperatura.component';
import { VigilantGuard } from './guards/vigilant.guard';

const routes: Routes = [
  {path:'home',component:HomeComponent,canActivate:[VigilantGuard]},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'',redirectTo:'/home',pathMatch: 'full' },
  {path:'temperatura',component:TemperaturaComponent,canActivate:[VigilantGuard]},
  {path:'humedad',component:HumedadComponent,canActivate:[VigilantGuard]},
  {path:'humesuelo',component:HumesueloComponent,canActivate:[VigilantGuard]},
  {path:'pir',component:PirComponent,canActivate:[VigilantGuard]},
  {path:'**',redirectTo:'/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
