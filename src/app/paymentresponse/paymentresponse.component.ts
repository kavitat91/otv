import { Component, OnInit } from '@angular/core';
import { UserService } from './../shared/services/user.service';
import { CommonService } from './../shared/services/common.service';
import { PlansService } from './../shared/services/plans.service';

@Component({
  selector: 'app-paymentresponse',
  templateUrl: './paymentresponse.component.html',
  styleUrls: ['./paymentresponse.component.css']
})
export class PaymentresponseComponent implements OnInit {
  contentHeight: number;
  loginUserId: any;
  loadingIndicator: boolean = false;
  
  constructor(private commonService: CommonService, private plansService: PlansService, private userService: UserService) { }

  ngOnInit() {
    this.securePayement();
  }
  securePayement() {
    this.loadingIndicator = true;
    this.plansService.securePayment('cashfree').subscribe(
      (plans_resp) => {
      },
      (error) => {
        console.log(error);
      }
    );  
  }
  tellAndroidSuccess() {

  }
}
