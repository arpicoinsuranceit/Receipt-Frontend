import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatComponentsModule } from './../../../mat-components.module';
import { HomeRouterModule } from './home-router.module';
import { HomeComponent } from './view/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DashboardService } from '../../../service/dashboard-service/dashboard.service';

@NgModule({
  imports: [
    CommonModule,
    MatComponentsModule,
    NgxChartsModule,
    HomeRouterModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [HomeComponent],
  providers : [DashboardService]
})
export class HomeModule { }
