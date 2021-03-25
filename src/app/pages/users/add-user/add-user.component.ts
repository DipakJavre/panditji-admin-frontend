import { Component, OnInit } from '@angular/core';
import { CustomService } from '../../../services/custom.service';

@Component({
  selector: 'ngx-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  dataModel: any = {};
  selectedItem = 1;
  rolesList: any[] = [
    {
      id: 1,
      name: "Admin"
    },
    {
      id: 2,
      name: 'Super Admin'
    }
  ];
  checked = false;
  constructor(
    private customService: CustomService
  ) {

  }

  ngOnInit(): void {

  }


  toggle(checked: boolean) {
    this.checked = checked;
  }

  addUser() {
    console.log(this.dataModel);
  }

}
