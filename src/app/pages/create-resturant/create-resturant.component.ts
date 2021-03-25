import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import { CustomService } from '../../services/custom.service';
import { RestaurantService } from '../../services/restaurant.service';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-create-resturant',
  templateUrl: './create-resturant.component.html',
  styleUrls: ['./create-resturant.component.scss']
})
export class CreateResturantComponent implements OnInit {

  @ViewChild('addRestaurantForm', { static: false }) restaurantForm: NgForm;
  selectedItem = 1;
  host: any = window.location.protocol + "//" + window.location.host + '/';
  file: any;
  message: any;
  imgURL: any;
  today = new Date();
  owner: any[] = [
    {
      id: 1,
      name: "Joan Doe"
    },
    {
      id: 2,
      name: 'Jack Roe'
    }
  ];
  checkBoxList: any[] = [
    {
      key: 'cloudSync',
      label: 'Cloud sync',
      value: false
    },
    {
      key: 'multiOpr',
      label: 'Multi opr',
      value: false
    },
    {
      key: 'dgtalDsply',
      label: 'Dgtal Dsply',
      value: false
    },
    {
      key: 'group',
      label: 'Group',
      value: false
    },
    {
      key: 'smsAlerts',
      label: 'SMS Alerts',
      value: false
    },
    {
      key: 'multiPerformance',
      label: 'Multi Performance',
      value: false
    },
    {
      key: 'eInvoice',
      label: 'E-Invoice',
      value: false
    },
    {
      key: 'cloudInv',
      label: 'Cloud inv',
      value: false
    },
    {
      key: 'cashbox',
      label: 'Cashbox',
      value: false
    },
    {
      key: 'crm',
      label: 'CRM',
      value: false
    },
    {
      key: 'multiLocation',
      label: 'Multi Location',
      value: false
    },
  ];
  dataModel: any = {};
  dialogRef: any;
  dialog: any;
  restaurantLink: any = '';
  qrCode: any = 'hello world'
  constructor(
    private restaurantService: RestaurantService,
    private customService: CustomService,
    private dialogService: NbDialogService
  ) { }

  ngOnInit(): void {
    this.loadCheckboxValue();
  }


  loadCheckboxValue() {
    for (let index = 0; index < this.checkBoxList.length; index++) {
      this.dataModel[this.checkBoxList[index]['key']] = false;
    }
  }


  toggle(checked: boolean, checkboxName) {
    checkboxName['value'] = checked;
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

  openGenerateQRCode(dialog): void {
    this.dialogRef = this.dialogService.open(dialog)
  }
  closeModel() {
    this.dialogRef.close();
  }

  addResaurant(dialog) {
    this.dialog = dialog;
    console.log('data :', this.dataModel);
    this.customService.showSpinner();
    const formData = new FormData();
    if (this.file) {
      formData.set('restaurant_Image', this.file);
    }
    formData.set('resturant_name', this.dataModel['restaurantName']);
    formData.set('resturant_description', this.dataModel.restaurantDescription);
    formData.set('subscription', this.dataModel.subscription.toISOString().substring(0, 10));
    formData.set('restaurant_mobile_number', this.dataModel.mobile);
    formData.set('restaurant_alternative__mobile_number', this.dataModel.alternativeNumber);
    formData.set('restaurant_email', this.dataModel.email);
    formData.set('resturant_full_address', this.dataModel.fullAddress);
    formData.set('ratting', this.dataModel.rating);
    formData.set('approx_delivery_time', this.dataModel.approxDelivery);
    formData.set('approx_price_for_two_people', this.dataModel.approxPrice);
    formData.set('pincode', this.dataModel.pincode);
    formData.set('latitude', this.dataModel.latitude);
    formData.set('longitude', this.dataModel.longitude);
    formData.set('commission_rate', this.dataModel.commissionRate);
    formData.set('licence_code', this.dataModel.licenceCode);
    formData.set('restuarant_charges', this.dataModel.restaurantCharge);
    formData.set('delivery_radius_in_km', this.dataModel.deliveryRadius);
    formData.set('gstin_number', this.dataModel.gst);
    formData.set('restaurant_link', this.host + this.dataModel['restaurantName'].replace(' ', '-'));
    formData.set('restaurantLinkQR', this.host + this.dataModel['restaurantName'].replace(' ', '-'));
    formData.set('cloudSync', this.dataModel.cloudSync);
    formData.set('multiOpr', this.dataModel.multiOpr);
    formData.set('dgtalDsply', this.dataModel.dgtalDsply);
    formData.set('group', this.dataModel.group);
    formData.set('smsAlerts', this.dataModel.smsAlerts);
    formData.set('multiPerformance', this.dataModel.multiPerformance);
    formData.set('eInvoice', this.dataModel.eInvoice);
    formData.set('cloudInv', this.dataModel.cloudInv);
    formData.set('cashbox', this.dataModel.cashbox);
    formData.set('crm', this.dataModel.crm);
    formData.set('multiLocation', this.dataModel.multiLocation);
    // formData.set('isActive', 'true');

    this.restaurantService.addRestaurant(formData).subscribe(
      (res: any) => {
        this.customService.showSuccessToast("Restaurant Added Successfully", "Success");
        this.customService.hideSpinner();
        this.qrCode = this.host + this.dataModel['restaurantName'].replace(' ', '-');
        this.restaurantLink = this.qrCode;
        this.restaurantForm.resetForm();
        this.dataModel = {};
        this.file = undefined;
        this.imgURL = ''
        this.loadCheckboxValue();
        this.openGenerateQRCode(this.dialog);
      }, (err: any) => {
        this.customService.hideSpinner();
        this.customService.showErrorToast("Oops! Something went wrong", "Error");
      }
    )
  }

  downloadCode() {
  }

  reset() {
    this.dialog = undefined;
    this.restaurantForm.resetForm();
    this.dataModel = {};
    this.file = undefined;
    this.imgURL = ''
    this.loadCheckboxValue();
  }

  getUsers() {

  }

}
