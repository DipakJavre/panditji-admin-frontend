import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPoojaComponent } from './add-pooja/add-pooja.component';
import { PoojaListComponent } from './pooja-list/pooja-list.component';

const routes: Routes = [
  {
    path: 'add-pooja',
    component: AddPoojaComponent
  },
  {
    path: 'list',
    component: PoojaListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoojaRoutingModule { }
