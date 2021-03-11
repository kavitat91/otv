import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(private spinner: NgxSpinnerService) { }

  showLoader() {
    this.spinner.show();
  }

  hideLoader() {
    this.spinner.hide();
  }
}
