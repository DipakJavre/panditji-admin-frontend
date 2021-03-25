import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { CustomService } from '../../services/custom.service';
import { ResourceService } from '../../services/resource.service';

@Component({
  selector: 'ngx-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  articleList: any[] = [];
  editData: any;
  dialogRef: any;
  editDialogRef: any;
  deleteData: any;
  constructor(
    private customService: CustomService,
    public resourceService: ResourceService,
    private dialogService: NbDialogService,

  ) {
    customService.refreshArticle.subscribe(
      (res) => {
        if (res) {
          this.editData = undefined;
          this.closeModel();
          this.getArticleList();
        }
      }
    )
  }

  ngOnInit(): void {
    this.getArticleList();
  }

  getArticleList() {
    this.customService.showSpinner();
    this.resourceService.getArticle().subscribe(
      (res: any) => {
        this.customService.hideSpinner();
        this.articleList = res['data'];
      }, err => {
        this.articleList = [];
        this.customService.hideSpinner();
        this.customService.showErrorToast('Oops! Something went wrong')
      }
    )
  }

  deleteArticle() {
    this.closeModel();
    this.customService.showSpinner();
    this.resourceService.deleteArticle(this.deleteData).subscribe(
      (res: any) => {
        if (res) {
          this.customService.hideSpinner();
          this.getArticleList();
          this.customService.showSuccessToast('Article Delete successfully', 'Success');
          this.deleteData = undefined;
        }
      }, () => {
        this.customService.showErrorToast('Oops! Something went wrong', 'Error');
        this.customService.hideSpinner();
      }
    )

  }

  onDeleteConfirm(dialog, data): void {
    this.deleteData = data;
    this.dialogRef = this.dialogService.open(dialog)
  }

  closeModel() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
    if (this.editDialogRef) {
      this.editDialogRef.close();
    }
  }

  onEdit(dialog, data) {
    this.editData = data;
    this.editDialogRef = this.dialogService.open(dialog);
  }

}
