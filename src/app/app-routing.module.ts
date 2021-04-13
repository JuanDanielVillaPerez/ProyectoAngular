import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/main/home/home.component';
import { HumedadComponent } from './components/main/humedad/humedad.component';
import { HumesueloComponent } from './components/main/humesuelo/humesuelo.component';
import { PirComponent } from './components/main/pir/pir.component';
import { TemperaturaComponent } from './components/main/temperatura/temperatura.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'',redirectTo:'/login',pathMatch: 'full' },
  {path:'home',component:HomeComponent},
  {path:'temperatura',component:TemperaturaComponent},
  {path:'humedad',component:HumedadComponent},
  {path:'humesuelo',component:HumesueloComponent},
  {path:'pir',component:PirComponent},
  {path:'**',redirectTo:'/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
