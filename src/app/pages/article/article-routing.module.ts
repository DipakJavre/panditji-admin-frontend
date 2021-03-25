import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddArticleComponent } from './add-article/add-article.component';
import { ArticleComponent } from './article.component';

const routes: Routes = [
  {
    path: 'list',
    component: ArticleComponent
  },
  {
    path: 'add-article',
    component: AddArticleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }
