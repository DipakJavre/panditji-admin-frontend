import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { NbInputModule, NbButtonModule } from '@nebular/theme';
import { AuthService } from '../services/auth.service';

@NgModule({
  declarations: [LoginComponent],
  entryComponents: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    NbInputModule,
    NbButtonModule,
    FormsModule,
  ],
  providers: [AuthService]
})
export class LoginModule { }
