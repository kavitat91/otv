import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { UserService } from './../shared/services/user.service';
import { CommonService } from './../shared/services/common.service';
import { PlansService } from './../shared/services/plans.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {
  contentHeight: number;
  allPlans: any;
  loginUserId: any;
  activePlans: any;
  loadingIndicator: boolean = false;
  language: string;
  constructor(private titleService: Title, private metaService: Meta, private commonService: CommonService, private plansService: PlansService, private userService: UserService) { }

  ngOnInit() {
    this.contentHeight = this.commonService.pageHeight();        
    this.getAllPlans();
    this.language = localStorage.getItem('language');        

    this.titleService.setTitle('Tarang Plus Plans');
    this.metaService.updateTag({name: 'keywords', content: 'Tarang Plus Plans'});
    this.metaService.updateTag({name: 'description', content: 'Tarang Plus Plans'});
  }

  getAllPlans() {
    this.loadingIndicator = true;
    this.plansService.allPlans().subscribe(
      (plans_resp) => {
        this.allPlans = plans_resp["data"]["catalog_list_items"][0];
        this.loginUserId = localStorage.getItem('otv_user_id');
        if(this.loginUserId) {
          //user_plans_resp = User.user_plans(login_user_id)
          this.plansService.userPlans(this.loginUserId).subscribe(
            (user_plans_resp) => {
              this.loadingIndicator = false;
              this.activePlans = user_plans_resp['current_active_plans']  
            },
            (error) => {
              console.log(error);
              this.loadingIndicator = false;
            }
            );
          //this.activePlans = user_plans_resp['current_active_plans']
        }
          
        else{
          this.activePlans = []
        }
          
        
      },
      (error) => {
        console.log(error);
        this.loadingIndicator = false;
      }
    )
  }

  plansSubscribe() {
    this.loadingIndicator = true;
    var sePlan = $(".plan_selction:checked").data("plan-info");
    this.plansService.initTransaction(localStorage.getItem('otv_user_id'), sePlan).subscribe(
      (response) => {
        console.log("data"+response['data']);
        this.setCashfreeData(response['data']);
        this.loadingIndicator = false;
      },
      (error) => {
        console.log(error);
        this.loadingIndicator = false;
        alert(error.error_mesg);
        alert(error.server_error_messsage);
      }
    )
  }

  setCashfreeData(dt: any) {
    var payment_dt = dt
    console.log("payment_dt"+payment_dt);
    $("#cashfree_signature").val(payment_dt['signature'])
    $("#cashfree_appid").val(payment_dt['signature_data']['appId'])
    $("#cashfree_order_id").val(payment_dt['signature_data']['orderId'])
    $("#cashfree_order_note").val(payment_dt['signature_data']['orderNote'])
    $("#cashfree_order_currency").val(payment_dt['signature_data']['orderCurrency'])
    $("#cashfree_cust_name").val(payment_dt['signature_data']['customerName'])
    $("#cashfree_cust_email").val(payment_dt['signature_data']['customerEmail'])
    $("#cashfree_cust_phone").val(payment_dt['signature_data']['customerPhone'])
    $("#cashfree_order_amt").val(payment_dt['signature_data']['orderAmount'])
    $("#cashfree_notify_url").val(payment_dt['signature_data']['notifyUrl'])
    $("#cashfree_return_url").val(payment_dt['signature_data']['returnUrl'])
    $(".cashfree_form").attr('action',payment_dt['payment_url'])
    $(".cashfree_form").submit();
  }

}
