import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { FormsModule } from '@angular/forms';
import { NbButtonModule, NbInputModule } from '@nebular/theme';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    AboutRoutingModule,
    FormsModule,
    NbInputModule,
    NbInputModule,
    CKEditorModule,
    NbButtonModule
  ]
})
export class AboutModule { }
