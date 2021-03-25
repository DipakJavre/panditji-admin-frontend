import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddPoojaComponent } from './pooja/add-pooja/add-pooja.component';
import { PoojaListComponent } from './pooja/pooja-list/pooja-list.component';
// import { ECommerceComponent } from './e-commerce/e-commerce.component';
// import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    // {
    //   path: 'dashboard',
    //   component: ECommerceComponent,
    // },
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: '',
      component: DashboardComponent,
    },
    {
      path: 'add-restaurant',
      loadChildren: () => import('./create-resturant/create-resturant.module').then(m => m.CreateResturantModule)
    },
    {
      path: 'pooja',
      loadChildren: () => import('./pooja/pooja.module').then(m => m.PoojaModule)
    },
    {
      path: 'about',
      loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
    },
    {
      path: 'article',
      loadChildren: () => import('./article/article.module').then(m => m.ArticleModule)
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    // {
    //   path: '**',
    //   component: NotFoundComponent,
    // },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
