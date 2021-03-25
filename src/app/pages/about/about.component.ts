import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomService } from '../../services/custom.service';
import { ResourceService } from '../../services/resource.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'ngx-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public Editor = ClassicEditor;
  dataModel: any = {};
  file: any;
  message: any;
  imgURL: any;
  @ViewChild('addAboutForm', { static: false }) addAboutForm: NgForm;


  constructor(
    private customService: CustomService,
    private resourseService: ResourceService
  ) { }


  ngOnInit(): void {
    this.dataModel.content = '';
    this.getAbout();
  }

  getAbout() {
    this.customService.showSpinner();
    this.resourseService.getAbout().subscribe(
      (res: any) => {
        console.log(res);
        if (res.data) {
          this.dataModel.content = res.data.content;
          this.dataModel.id = res.data.id;
          this.imgURL = res.data.photo
        }
        this.customService.hideSpinner();
        if (res && res['data']) {
        }
      }, (err) => {
        this.customService.hideSpinner();
      }
    )
  }

  addUpdateAbout() {
    const formData = new FormData();
    if (this.file) {
      formData.set('File', this.file);
    }
    const Model = {
      Content: this.dataModel.content,
      isActive: true
    };
    if (this.dataModel.id && this.dataModel.id > 0) {
      Model['id'] = this.dataModel.id;
    }
    formData.set('Model', JSON.stringify(Model));
    this.customService.showSpinner();
    this.resourseService.addAbout(formData).subscribe(
      (res: any) => {
        if (res) {
          this.customService.hideSpinner();
          this.customService.showSuccessToast('About added successfully', 'Success');
          this.reset();
          this.getAbout();
        }
      }, () => {
        this.customService.showErrorToast('Oops! Something went wrong', 'Error');
        this.customService.hideSpinner();
      }
    )

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
    this.addAboutForm.resetForm();
    this.dataModel = {};
    this.dataModel = { content: '' };
    this.file = undefined;
    this.imgURL = '';
  }

}
