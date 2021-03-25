import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoojaRoutingModule } from './pooja-routing.module';
import { AddPoojaComponent } from './add-pooja/add-pooja.component';
import { PoojaListComponent } from './pooja-list/pooja-list.component';
import { NbButtonModule, NbDialogModule, NbInputModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


@NgModule({
  declarations: [
    AddPoojaComponent,
    PoojaListComponent
  ],
  imports: [
    CommonModule,
    PoojaRoutingModule,
    NbButtonModule,
    NbInputModule,
    FormsModule,
    CKEditorModule,
    NbDialogModule.forRoot()
  ]
})
export class PoojaModule { }
