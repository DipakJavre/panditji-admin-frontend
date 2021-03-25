import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CustomService } from '../../../services/custom.service';
import { ResourceService } from '../../../services/resource.service';


@Component({
  selector: 'ngx-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {

  @Input('data') data: any;

  public Editor = ClassicEditor;
  dataModel: any = {};
  file: any;
  message: any;
  imgURL: any;
  @ViewChild('addPoojaForm', { static: false }) addArticleForm: NgForm;

  constructor(
    private customService: CustomService,
    private resourseService: ResourceService
  ) { }


  ngOnInit(): void {
    if (this.data) {
      this.dataModel.content = this.data.content;
      this.dataModel.name = this.data.name;
      this.dataModel.id = this.data.id;
      this.imgURL = this.data.photo;
    } else {
      this.dataModel.content = '';
    }
  }

  addArticle() {

    const formData = new FormData();
    if (this.file) {
      formData.set('File', this.file);
    }
    const Model = {
      Name: this.dataModel.name,
      Content: this.dataModel.content,
      isActive: true
    }
    formData.set('Model', JSON.stringify(Model));
    this.customService.showSpinner();
    if (this.dataModel.id) {
      this.resourseService.updateArticle(this.dataModel.id, formData).subscribe(
        (res: any) => {
          if (res) {
            this.customService.hideSpinner();
            this.customService.showSuccessToast('Article Update successfully', 'Success');
            this.customService.refreshArticle.next(true);
            this.data = {};
            this.reset();
          }
        }, () => {
          this.customService.showErrorToast('Oops! Something went wrong', 'Error');
          this.customService.hideSpinner();
        }
      )
    } else {
      this.resourseService.addArticle(formData).subscribe(
        (res: any) => {
          if (res) {
            this.customService.hideSpinner();
            this.customService.showSuccessToast('New Article added successfully', 'Success');
            this.customService.refreshArticle.next(true);
            this.reset();
          }
        }, () => {
          this.customService.showErrorToast('Oops! Something went wrong', 'Error');
          this.customService.hideSpinner();
        }
      )
    }

  }

  onFileChange(event) {
    this.message = undefined;
    if (event && event.target && event.target.files) {
      this.file = event.target.files[0];
      var mimeType = this.file.type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        this.imgURL = '';
        return;
      }

      var reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      }
    }
  }

  reset() {
    this.addArticleForm.resetForm();
    this.dataModel = {};
    this.dataModel = { content: '' };
    this.file = undefined;
    this.imgURL = '';
    this.data = {};
    this.customService.refreshArticle.next(true);
  }

}
