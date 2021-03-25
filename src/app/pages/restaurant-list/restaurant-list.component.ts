import { Component, OnInit } from '@angular/core';
import { CustomService } from '../../services/custom.service';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'ngx-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit {

  restaurantList: any[] = [];

  constructor(
    private customService: CustomService,
    private restaurantService: RestaurantService
  ) { }

  ngOnInit(): void {
    this.getRestaurantList();
  }

  getRestaurantList() {
    this.customService.showSpinner();
    this.restaurantService.getRestaurantList().subscribe(
      (res: any) => {
        this.customService.hideSpinner();
        this.restaurantList = res['data'];
      }, (err) => {
        this.customService.hideSpinner();
        this.customService.showErrorToast('Oops! something went wrong', 'Error');
      }
    )
  }

}
