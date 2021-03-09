import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment'
import { CommonService } from './common.service';
import {Md5} from 'ts-md5/dist/md5';
import { isPlatformBrowser } from '@angular/common';


function _window(): any {
  // return the global native browser window object
  return window;
}

@Injectable({
  providedIn: 'root'
})

export class PlansService {
  platformId(platformId: any) {
    throw new Error('Method not implemented.');
  }
  plan_init_params = {};
  promo_cod_dt = {};
  constructor(private http: HttpClient, private commonService: CommonService) { }
  
  options = { headers: new HttpHeaders ({ 'Content-Type': 'application/json' }) }

  allPlans() {
    //"catalog_lists/subscription?region=#{$region}","catalog"
    return this.http.get<any>(environment.apiURL+"catalog_lists/subscription?region=IN&auth_token="+environment.authtoken)
    .pipe(
      retry(1),
      catchError(this.commonService.handleError)
     );
  }
  userPlans(sessionId: string) {
    //"users/#{user_session}/user_plans?region=#{$region}","catalog"
    return this.http.get<any>(environment.apiURL+"users/"+sessionId+"/user_plans?region=IN&auth_token="+environment.authtoken)
    .pipe(
      retry(1),
      catchError(this.commonService.handleError)
     );
  }

  get nativeWindow(): any {
    return _window();
  }

  initTransaction(sessionId: string, sePlan: string, paymentGt: string) {
    console.log("service.ts : inside initTransaction...")
    console.log("service.ts : paymentGt : " + paymentGt)

    var planDet = sePlan.split("|");
    var all_packs = [];
    var pack_data = {}
		pack_data['plan_categories'] = planDet[3];
    pack_data['category_type'] = "individual";
    pack_data['category_pack_id'] = planDet[0];
    pack_data['subscription_catalog_id'] = planDet[1];
    pack_data['plan_id'] = planDet[2];
    all_packs.push(pack_data);
    var secret_key = "93038e8c2664cc5b149d"
    var sec_key = secret_key+sessionId+"IN"+planDet[2]; 
    const md5 = new Md5();
    var md5_sign = md5.appendStr(sec_key).end(); 
    console.log(md5_sign);
    this.plan_init_params["us"] = md5_sign;
    //this.plan_init_params["payment_gateway"] = "cashfree"
    this.plan_init_params["payment_gateway"] = paymentGt
    this.plan_init_params["platform"] = "WEB";
    this.plan_init_params["payment_info"] = {};
    this.plan_init_params["transaction_info"] = {};
    this.plan_init_params["user_info"] = {};
    this.plan_init_params["miscellaneous"] = {}; 
    this.plan_init_params["payment_info"]["net_amount"] = planDet[5].toString();
    this.plan_init_params["payment_info"]["price_charged"] = planDet[4].toString();
    this.plan_init_params["payment_info"]["currency"] = planDet[6];
    this.plan_init_params["payment_info"]["packs"] = all_packs;
    this.plan_init_params["transaction_info"]["txn_message"] = "All access pack";
    this.plan_init_params["transaction_info"]["txn_status"] = "init";
    this.plan_init_params["user_info"]["email"] = sessionId;
    this.plan_init_params["user_info"]["mobile_number"] = "";
    this.plan_init_params["miscellaneous"]["browser"] = "Generic_Browser";
    if(localStorage.getItem("otv_promo_code") != undefined){
      this.plan_init_params["payment_info"]["coupon_code"] = localStorage.getItem("otv_promo_code");
      this.plan_init_params["payment_info"]["coupon_code_id"] = localStorage.getItem("otv_promo_code_id")
      this.plan_init_params["payment_info"]["price_charged"] = localStorage.getItem("otv_promo_amt")
    }
    console.log("12"+JSON.stringify(this.plan_init_params));
    console.log("service.ts : sessionId " + sessionId)
    console.log("service.ts : environment.authtoken "+ environment.authtoken)
    console.log("service.ts : JSON.stringify(this.plan_init_params) "+ JSON.stringify(this.plan_init_params))
    console.log(this.options)
    console.log("service.ts : environment.apiURL "+ environment.apiURL)
    
    return this.http.post<any>(environment.apiURL+"users/"+sessionId+"/transactions?region=IN&auth_token="+environment.authtoken, JSON.stringify(this.plan_init_params), this.options)
    .pipe(
      retry(1),
      catchError(this.commonService.handleError)
     );
  }

  securePayment(paymentType: string) {
    return this.http.post<any>(environment.apiURL+"/payment_complete/"+paymentType+"/transactions?region=IN&auth_token="+environment.authtoken, JSON.stringify(this.plan_init_params), this.options)
    .pipe(
      retry(1),
      catchError(this.commonService.handleError)
     );
  }

 ValidateCouponCode(sessionId: string, sePlan: string, promo_code: string){
  let promo_cod_dt = {}
  let planDet = sePlan.split("|");
  let pln_sig = ""
  var all_packs = [];
  var pack_data = {}
  pack_data['plan_categories'] = planDet[3];
  pack_data['category_type'] = "individual";
  pack_data['category_pack_id'] = planDet[0];
  pack_data['subscription_catalog_id'] = planDet[1];
  pack_data['plan_id'] = planDet[2];
  all_packs.push(pack_data);
  var secret_key = "93038e8c2664cc5b149d"
  var sec_key = secret_key+sessionId+"IN"+planDet[2]; 
  const md5 = new Md5();
  var md5_sign = md5.appendStr(sec_key).end(); 
  console.log(md5_sign);
  this.promo_cod_dt['us'] = md5_sign
  this.promo_cod_dt['packs'] = all_packs
  this.promo_cod_dt['coupon_code'] = promo_code
  this.promo_cod_dt['region'] = "IN"
  console.log("promo code data");
  console.log(this.promo_cod_dt);
  return this.http.post<any>(environment.apiURL+"v2/users/"+sessionId+"/apply_coupon_code?region=IN&auth_token="+environment.authtoken, JSON.stringify(this.promo_cod_dt), this.options)
    .pipe(
      retry(1),
      catchError(this.commonService.handleError)
     );
 }
  
}
