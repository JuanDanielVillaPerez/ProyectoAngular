import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/main/home/home.component';
import { TemperaturaComponent } from './components/main/temperatura/temperatura.component';
import { HumedadComponent } from './components/main/humedad/humedad.component';
import { HumesueloComponent } from './components/main/humesuelo/humesuelo.component';
import { PirComponent } from './components/main/pir/pir.component';
import { ChartsModule } from 'ng2-charts';
import { CookieService } from 'ngx-cookie-service';
import { TempComponent } from './components/app/temp/temp.component';
import { HumeComponent } from './components/app/hume/hume.component';
import { HusuComponent } from './components/app/husu/husu.component';
import { PComponent } from './components/app/p/p.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    TemperaturaComponent,
    HumedadComponent,
    HumesueloComponent,
    PirComponent,
    TempComponent,
    HumeComponent,
    HusuComponent,
    PComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
