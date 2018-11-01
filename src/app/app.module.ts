import { DashboardpopupComponent } from './view/core/dashboardpopup/dashboardpopup.component';
import { CourierpopupComponent } from './view/core/courierpopup/courierpopup.component';
import { CommonService } from './service/common-service/common.service';
import { AuthGuard } from './service/auth-service/auth.guard';
import { AuthService } from './service/auth-service/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { MatComponentsModule } from './mat-components.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormControl } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LoginComponent } from './view/core/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { AlertComponent } from './view/core/alert/alert.component';


@NgModule({
  declarations: [
<<<<<<< HEAD
    AppComponent, LoginComponent, AlertComponent, DashboardpopupComponent
=======
    AppComponent, LoginComponent, AlertComponent ,CourierpopupComponent
>>>>>>> origin/feature-courier-module
  ],
  imports: [
    BrowserModule,
    MatComponentsModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [AuthService, AuthGuard, CommonService],
  bootstrap: [AppComponent],
<<<<<<< HEAD
  entryComponents: [AlertComponent, DashboardpopupComponent]
=======
  entryComponents: [AlertComponent,CourierpopupComponent]
>>>>>>> origin/feature-courier-module
})
export class AppModule { }
