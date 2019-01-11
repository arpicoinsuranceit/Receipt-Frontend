import { LapsedSummeryReportComponent } from './view/components/report/view/lapsed-summery-report/lapsed-summery-report.component';
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
import { ConfirmationAlertComponent } from './view/core/confirmation-alert/confirmation-alert.component';
import { ReceiptRegisterReportComponent } from './view/components/report/view/receipt-register-report/receipt-register-report.component';
import { PaymentHistoryReportComponent } from './view/components/report/view/payment-history-report/payment-history-report.component';
import { PremiumDueReportComponent } from './view/components/report/view/premium-due-report/premium-due-report.component';
import { UnderwriteConfirmationAlertComponent } from './view/core/underwrite-confirmation-alert/underwrite-confirmation-alert.component';


@NgModule({
  declarations: [
    AppComponent, LoginComponent, AlertComponent ,CourierpopupComponent,DashboardpopupComponent,ConfirmationAlertComponent,ReceiptRegisterReportComponent,
    LapsedSummeryReportComponent,PaymentHistoryReportComponent,PremiumDueReportComponent,UnderwriteConfirmationAlertComponent
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
  entryComponents: [AlertComponent,CourierpopupComponent, DashboardpopupComponent,ConfirmationAlertComponent,ReceiptRegisterReportComponent,
    LapsedSummeryReportComponent,PaymentHistoryReportComponent,PremiumDueReportComponent,UnderwriteConfirmationAlertComponent]
})
export class AppModule { }
