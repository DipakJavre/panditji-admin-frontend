import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(
    private commonService: CommonService
  ) { }

  addRestaurant(data) {
    return this.commonService.post('restaurant/addRestaurant', data)
  }

  getRestaurantList() {
    return this.commonService.get('restaurant/restaurantList');
  }
}
