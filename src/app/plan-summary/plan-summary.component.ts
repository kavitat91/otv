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
  promo_code: any;
  keysToRemove: any;

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

    let keysToRemove = ["otv_promo_code_id","otv_promo_amt","otv_promo_code"];
    keysToRemove.forEach(k => localStorage.removeItem(k))
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

  CouponCode(){
    console.log("hello");
    var promo_code = $("#promo_code").val();
    let plan_dt =  this.data2;
    this.promo_code = promo_code
    if(this.promo_code.length != 0){
     $("#plan_apply_promo").text("Apply...");
     console.log("coupon code"+ promo_code);
      this.plansService.ValidateCouponCode(localStorage.getItem('otv_user_id'),plan_dt,this.promo_code).subscribe(
        (response) => {
         this.set_promo_localstorage(response)
        },
        (error) => {
          console.log(error);
          this.loadingIndicator = false;
          this.delete_promo_dt();
          $("#promo_error_msg").text("Sorry, this Promo Code is Invalid").show().fadeOut(4000);
          $("#plan_apply_promo").text("Apply");
          $("#pln_fin_prc").text($("#pln_ac_prc").text());
        }
      )
    }
    else{
      $("#promo_error_msg").text("Please enter the promocode").show().fadeOut(4000);
    }
  }

  set_promo_localstorage(promo_res){
    console.log(promo_res)
    console.log("promo code data");
    var dt = promo_res['data']['payment']
    localStorage.setItem("otv_promo_code_id",dt['coupon_id'])
    localStorage.setItem("otv_promo_amt",dt['net_amount']);
    localStorage.setItem("otv_promo_code",dt['coupon_code'])
    $("#pln_fin_prc").text(dt['net_amount']);
    $(".promo_sec").hide();
    $("#user_promo_code").text(dt['coupon_code']);
    $("#promo_suc_pop").show();
    $("#plan_apply_promo").text("Apply");
  }

  RemoveCouponCode(){
    $("#promo_code").val("");
    this.delete_promo_dt();
    console.log("remove coupon code is clicked");
    $("#promo_suc_pop").hide();
    $(".promo_sec").show();
    $("#pln_fin_prc").text($("#pln_ac_prc").text());
  }

  delete_promo_dt(){
   let keysToRemove = ["otv_promo_code_id","otv_promo_amt","otv_promo_code"];
   keysToRemove.forEach(k => localStorage.removeItem(k))
  }
}
