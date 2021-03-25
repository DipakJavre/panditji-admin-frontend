import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CustomService } from '../../../services/custom.service';
import { ResourceService } from '../../../services/resource.service';


@Component({
  selector: 'ngx-add-pooja',
  templateUrl: './add-pooja.component.html',
  styleUrls: ['./add-pooja.component.scss']
})
export class AddPoojaComponent implements OnInit {

  public Editor = ClassicEditor;
  @Input('data') data: any;

  dataModel: any = {};
  file: any;
  message: any;
  imgURL: any;
  @ViewChild('addPoojaForm', { static: false }) addPoojaForm: NgForm;

  constructor(
    private customService: CustomService,
    private resourseService: ResourceService
  ) { }


  ngOnInit(): void {
    console.log(this.data);

    if (this.data) {
      this.dataModel.content = this.data.content;
      this.dataModel.poojaName = this.data.name;
      this.dataModel.id = this.data.id;
      this.imgURL = this.data.photo;
    } else {
      this.dataModel.content = '';
    }
  }

  addPooja() {
    console.log('dataModel :', this.dataModel);
    const formData = new FormData();
    if (this.file) {
      formData.set('File', this.file);
    }
    const Model = {
      Name: this.dataModel.poojaName,
      Content: this.dataModel.content,
      isActive: true
    }
    formData.set('Model', JSON.stringify(Model));
    this.customService.showSpinner();
    if (this.dataModel.id) {
      this.resourseService.updatePooja(this.dataModel.id, formData).subscribe(
        (res: any) => {
          if (res) {
            this.customService.hideSpinner();
            this.customService.showSuccessToast('Pooja Update successfully', 'Success');
            this.customService.refreshPooja.next(true);
            this.reset();
          }
        }, () => {
          this.customService.showErrorToast('Oops! Something went wrong', 'Error');
          this.customService.hideSpinner();
        }
      )
    } else {
      this.resourseService.addPooja(formData).subscribe(
        (res: any) => {
          if (res) {
            this.customService.hideSpinner();
            this.customService.showSuccessToast('New pooja added successfully', 'Success');
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
    this.addPoojaForm.resetForm();
    this.dataModel = {};
    this.dataModel = { content: '' };
    this.file = undefined;
    this.imgURL = '';
  }

}
