import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleComponent } from './article.component';
import { NbButtonModule, NbDialogModule, NbDialogService, NbInputModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AddArticleComponent } from './add-article/add-article.component';


@NgModule({
  declarations: [ArticleComponent, AddArticleComponent],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    NbButtonModule,
    NbInputModule,
    FormsModule,
    CKEditorModule,
    NbDialogModule.forRoot()
  ],
  providers: [NbDialogService]
})
export class ArticleModule { }
