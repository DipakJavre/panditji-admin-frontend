import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateResturantComponent } from './create-resturant.component';

const routes: Routes = [
  {
    path: '',
    component: CreateResturantComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateResturantRoutingModule { }
