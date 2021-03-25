import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { AddUserComponent } from './add-user/add-user.component';
import { FormsModule } from '@angular/forms';
import { NbButtonModule, NbCheckboxModule, NbInputModule, NbSelectModule } from '@nebular/theme';


@NgModule({
  declarations: [AddUserComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    NbSelectModule,
    NbInputModule,
    NbCheckboxModule,
    NbButtonModule
  ]
})
export class UsersModule { }
