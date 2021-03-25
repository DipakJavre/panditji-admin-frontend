import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantListRoutingModule } from './restaurant-list-routing.module';
import { RestaurantListComponent } from './restaurant-list.component';
import { QRCodeModule } from 'angularx-qrcode';


@NgModule({
  declarations: [RestaurantListComponent],
  imports: [
    CommonModule,
    RestaurantListRoutingModule,
    QRCodeModule
  ]
})
export class RestaurantListModule { }
