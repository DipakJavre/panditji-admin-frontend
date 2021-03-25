import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { CustomService } from '../../../services/custom.service';
import { ResourceService } from '../../../services/resource.service';

@Component({
  selector: 'ngx-pooja-list',
  templateUrl: './pooja-list.component.html',
  styleUrls: ['./pooja-list.component.scss']
})
export class PoojaListComponent implements OnInit {

  poojaList: any[] = [];
  editData: any;
  dialogRef: any;
  editDialogRef: any;
  deleteData: any;

  constructor(
    private customService: CustomService,
    public resourceService: ResourceService,
    private dialogService: NbDialogService,


  ) {
    customService.refreshPooja.subscribe(
      (res) => {
        if (res) {
          this.closeModel();
          this.editData = undefined;
          this.getPoojaList();
        }
      }
    )
  }

  ngOnInit(): void {
    this.getPoojaList();
  }

  getPoojaList() {
    this.customService.showSpinner();
    this.resourceService.getPoojaList().subscribe(
      (res: any) => {
        this.customService.hideSpinner();
        if (res) {
          this.poojaList = res['data'].reverse();
        }
      }, err => {
        this.customService.hideSpinner();
        this.customService.showErrorToast('Oops! Something went wrong')
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


  deletePooja() {
    this.closeModel();
    this.customService.showSpinner();
    this.resourceService.deletePooja(this.deleteData).subscribe(
      (res: any) => {
        if (res) {
          this.customService.hideSpinner();
          this.getPoojaList();
          this.customService.showSuccessToast('Pooja Delete successfully', 'Success');
          this.deleteData = undefined;
          this.closeModel();
        }
      }, () => {
        this.customService.showErrorToast('Oops! Something went wrong', 'Error');
        this.customService.hideSpinner();
        this.deleteData = undefined;
        this.closeModel();
      }
    )
  }

  onEdit(dialog, data) {
    this.editData = data;
    this.editDialogRef = this.dialogService.open(dialog);
  }

}
