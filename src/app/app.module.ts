import { AuthGuard } from './service/login/auth.guard';
import { AppRoutingModule } from './app-routing.module';
import { LoginService } from './service/login/login.service';
import { MatComponentsModule } from './mat-components.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormControl } from '@angular/forms';
import { LoginComponent } from './view/core/login/login.component';
import { HttpModule } from '@angular/http';
import { LoginLayoutComponent } from './view/core/layout/login-layout/login-layout.component';
import { HomeLayoutComponent } from './view/core/layout/home-layout/home-layout.component';
import { NavbarComponent } from './view/core/navbar/navbar.component';
import { HomeComponent } from './view/components/home/home.component';
import { FooterComponent } from './view/core/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginLayoutComponent,
    HomeLayoutComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    MatComponentsModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [LoginService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
