import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlansService } from '../shared/services/plans.service';

@Component({
  selector: 'app-plan-summary',
  templateUrl: './plan-summary.component.html',
  styleUrls: ['./plan-summary.component.css']
})
export class PlanSummaryComponent implements OnInit {
  loadingIndicator: boolean = false;
  data2: any;
  paymentGateway: any;
  rzp: any;
  price: any;
  discountPrice: any;
  currency: any;

  constructor(public router: Router, public route: ActivatedRoute, private plansService: PlansService){
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
      };
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      //this.data2 = params['sePlan']
      console.log("Plan-Summary component : sePlan - "+history.state['sePlan'])
      this.data2 = history.state['sePlan']
    });
    console.log(this.data2);    
    if(this.data2 != undefined) {
      this.price = this.data2.split("|")[4]
      this.discountPrice = this.data2.split("|")[5]
      this.currency = this.data2.split("|")[6]
    }
    console.log("Price : "+this.price+", Discount Price :"+this.discountPrice+", Currency : "+this.currency)
  }

  paymentGatewayType(e) {
    this.paymentGateway = e.target.value;
    console.log("Inside paymentGatewayType() : " + this.paymentGateway);
    this.loadingIndicator = true;
    var sePlan = this.data2;
    this.plansService.initTransaction(localStorage.getItem('otv_user_id'), sePlan, this.paymentGateway).subscribe(
      (response) => {
        console.log("init response ..............")
        console.log(response['data']);
        console.log("Payment Mode : "+this.paymentGateway)
        if (this.paymentGateway == "cashfree"){
          this.setCashfreeData(response['data']);
        }else
        {
          this.setRazorpayData(response['data']);
        } 
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
    console.log("cashfree payment_dt"+payment_dt);
    //alert(payment_dt['signature_data']['returnUrl'])
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

  setRazorpayData(dt: any){
    console.log("Script for razorpay pop.................")
    console.log(dt);
    //var ret_url = "http://localhost:3000/payments/razorpay_response";
    var ret_url = "https://staging.tarangplus.in/payments/razorpay_resp"
    const options: any = {
      key: dt['data_key'],
      amount: dt['data_amount'], 
      currency: dt['data_currency'],
      name: 'TarangPlus', 
      description: 'Tarang Plus Transaction', 
      image: 'https://www.tarangplus.in/assets/main_logo.png', 
      order_id: dt['data_order_id'], 
      callback_url: ret_url,
      redirect: true,
      modal: {
        escape: false,
      },
      notes: {
        "address": "Tarang plus"
      },
      theme: {
        "color": "#F1950E"
      }
    };
    this.rzp = new this.plansService.nativeWindow.Razorpay(options);
    this.rzp.open();
  }

}
