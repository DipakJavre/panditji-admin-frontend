import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(
    private commonService: CommonService
  ) { }

  public addPooja(data) {
    return this.commonService.post('Pooja/Create', data)
  }
  public updatePooja(id, data) {
    return this.commonService.post(`Pooja/Update/${id}`, data)
  }
  public getPoojaList() {
    return this.commonService.get('Pooja/List');
  }
  public deletePooja(id) {
    return this.commonService.post(`Pooja/RemovePooja/${id}`);
  }

  public addAbout(data) {
    return this.commonService.post('AboutUs/Create', data);
  }
  public getAbout() {
    return this.commonService.get('AboutUs/GetAboutUs')
  }
  public addArticle(data) {
    return this.commonService.post('Article/Create', data)
  }
  public getArticle() {
    return this.commonService.get('Article/List');
  }
  public updateArticle(id, data) {
    return this.commonService.post(`Article/Update/${id}`, data);
  }
  public deleteArticle(id) {
    return this.commonService.post(`Article/Removearticle/${id}`);
  }
}
