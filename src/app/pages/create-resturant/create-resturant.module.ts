import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateResturantRoutingModule } from './create-resturant-routing.module';
import { CreateResturantComponent } from './create-resturant.component';
import { FormsModule } from '@angular/forms';
import { NbButtonModule, NbCheckboxModule, NbDatepickerModule, NbDialogModule, NbDialogService, NbInputModule, NbSelectModule } from '@nebular/theme';
import { QRCodeModule } from 'angularx-qrcode';


@NgModule({
  declarations: [CreateResturantComponent],
  imports: [
    CommonModule,
    CreateResturantRoutingModule,
    FormsModule,
    NbButtonModule,
    NbInputModule,
    NbSelectModule,
    NbCheckboxModule,
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    QRCodeModule

  ],
  providers: [NbDialogService]
})
export class CreateResturantModule { }
