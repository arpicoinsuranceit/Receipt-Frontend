import { MatComponentsModule } from '../../../mat-components.module';
import { HomeLayoutRouterModule } from './home-layout-router.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeLayoutComponent } from './view/home-layout.component';

@NgModule({
  imports: [
    CommonModule,
    HomeLayoutRouterModule,
    MatComponentsModule
  ],
  declarations: [HomeLayoutComponent]
})
export class HomeLayoutModule { }
