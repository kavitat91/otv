import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry} from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { CommonService } from './common.service'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private commonService: CommonService) { }

  options = { headers: new HttpHeaders ({ 'Content-Type': 'application/json' }) }

  contact(contactInfo: any): Observable<any> {
    return this.http.post<any>(environment.apiURL+"catalogs/5d47b9e2babd81099e00002f/items?region=IN&auth_token="+environment.authtoken, contactInfo, this.options)
    .pipe(
      retry(1),
      catchError(this.commonService.handleError)
     );
  }
  userDetails(sessionId: string): Observable<any> {
    return this.http.get<any>(environment.apiURL+"users/"+sessionId+"/account?region=IN&auth_token="+environment.authtoken)
    .pipe(
      retry(1),
      catchError(this.commonService.handleError)
     );
  }
  emailLogin(userLogin: any) {
    var signin_params = {};
    signin_params["user"] = {};
    signin_params["user"]["email_id"] = userLogin.login_email;
    signin_params["user"]["mobile_no"] = "";
    signin_params["user"]["type"] = "email";
    signin_params["user"]["password"] = userLogin.login_email_password;
    signin_params["user"]["region"] = "IN";

    return this.http.post<any>(environment.apiURL+"users/sign_in?region=IN&auth_token="+environment.authtoken, JSON.stringify(signin_params), this.options)
    .pipe(
      retry(1),
      catchError(this.commonService.handleError)
     );
  }
  mobileLogin(userLogin: any) {
    console.log(userLogin);
    var signin_params = {};
    signin_params["user"] = {};
    signin_params["user"]["email_id"] = "";
    signin_params["user"]["user_id"] = "91"+userLogin.login_mobile;
    signin_params["user"]["type"] = "msisdn";
    signin_params["user"]["password"] = userLogin.user_mob_password;
    signin_params["user"]["region"] = "IN";
    return this.http.post<any>(environment.apiURL+"users/sign_in?region=IN&auth_token="+environment.authtoken, JSON.stringify(signin_params), this.options)
    .pipe(
      retry(1),
      catchError(this.commonService.handleError)
     );
  }

  emailRegister(userRegister: any) {
    var signup_params = {};
    signup_params["user"] = {};
    signup_params["user"]["firstname"] = userRegister.register_name;
    signup_params["user"]["password"] = userRegister.register_password;
    signup_params["user"]["region"] = "IN";
    signup_params["user"]["email_id"] = userRegister.user_register_email;

    return this.http.post<any>(environment.apiURL+"users?region=IN&auth_token="+environment.authtoken, JSON.stringify(signup_params), this.options)
    .pipe(
      retry(1),
      catchError(this.commonService.handleError)
     );
  }
  mobileRegister1(userRegister: any) {
    var signup_params = {};
    signup_params["user"] = {};
    signup_params["user"]["firstname"] = userRegister.mob_register_name;
    signup_params["user"]["password"] = userRegister.mob_register_password;
    signup_params["user"]["region"] = "IN";
    signup_params["user"]["user_id"] = "91"+userRegister.user_register_mobile;
    signup_params["user"]["type"] = "msisdn";
    console.log(JSON.stringify(signup_params));
    return this.http.post<any>(environment.apiURL+"users?region=IN&auth_token="+environment.authtoken, JSON.stringify(signup_params), this.options)
    .pipe(
      retry(1),
      catchError(this.commonService.handleError)
     );
  }

  mobileRegister2(userRegister: any) {
    return this.http.get<any>(environment.apiURL+"users/verification/"+userRegister.registerMobileOTP+"?type=msisdn&mobile_number=91"+userRegister.user_register_mobile+"&region=IN&auth_token="+environment.authtoken)
    .pipe(
      retry(1),
      catchError(this.commonService.handleError)
     );
  }

  mobileRegisterResendOTP(userRegister: any, type: string) {
    var resend_params = {};
    resend_params["user"] = {};
    if(type == 'forgotpassotp') {
      resend_params["user"]["email_id"] = "91"+userRegister.frgt_pwd_mobile_no;
    } 
    else {
      resend_params["user"]["email_id"] = "91"+userRegister.user_register_mobile;  
    }    
    resend_params["user"]["type"] = "msisdn";
    console.log(JSON.stringify(resend_params));
    return this.http.post<any>(environment.apiURL+"users/resend_verification_link?region=IN&auth_token="+environment.authtoken, JSON.stringify(resend_params), this.options)
    .pipe(
      retry(1),
      catchError(this.commonService.handleError)
     );
  }

  userSignout(sessionId: any): Observable<any> {
    return this.http.post<any>(environment.apiURL+"users/"+sessionId+"/sign_out?region=IN&auth_token="+environment.authtoken, {}, this.options)
    .pipe(
      retry(1),
      catchError(this.commonService.handleError)
     );
  }

  updateUser(updateUser: any, sessionId: string) {
    var user_params = {};
    user_params["user"] = {};
    user_params["user"]["firstname"] = updateUser.user_profile_name;
    user_params["user"]["birthdate"] = updateUser.datepicker;
    user_params["user"]["user_email_id"] = updateUser.user_email_address;
    user_params["user"]["mobile_number"] = updateUser.user_mobile_number;    
    console.log(user_params);
    return this.http.put<any>(environment.apiURL+"users/"+sessionId+"/account?region=IN&auth_token="+environment.authtoken, JSON.stringify(user_params), this.options)
    .pipe(
      retry(1),
      catchError(this.commonService.handleError)
     );
  }

  changePassword(changePassword: any, sessionId: string) {
    var password_params = {};
    password_params["user"] = {};
    password_params["user"]["current_password"] = changePassword.old_change_password;
    password_params["user"]["password"] = changePassword.new_change_password;
    password_params["user"]["confirm_password"] = changePassword.new_change_confirm_password;
    password_params["user"]["region"] = "IN";    

    return this.http.post<any>(environment.apiURL+"users/"+sessionId+"/change_password?region=IN&auth_token="+environment.authtoken, JSON.stringify(password_params), this.options)
    .pipe(
      retry(1),
      catchError(this.commonService.handleError)
     );
  }

  mobileForgotPassword1(userMobileForgot: any) {
    var forgot_password_params = {};
    forgot_password_params["user"] = {};
    forgot_password_params["user"]["region"] = "IN";
    forgot_password_params["user"]["user_id"] = "91"+userMobileForgot.frgt_pwd_mobile_no;
    forgot_password_params["user"]["type"] = "msisdn";    
  
    return this.http.post<any>(environment.apiURL+"users/forgot_password?region=IN&auth_token="+environment.authtoken, JSON.stringify(forgot_password_params), this.options)
    .pipe(
      retry(1),
      catchError(this.commonService.handleError)
     );
  }

  mobileForgotPassword2(userMobileForgot: any) {
    var forgot_password_params = {};
    forgot_password_params["user"] = {};
    forgot_password_params["user"]["key"] = userMobileForgot.frgt_pwd_otp.toString();    
    forgot_password_params["user"]["region"] = "IN";
    forgot_password_params["user"]["mobile_number"] = "91"+userMobileForgot.frgt_pwd_mobile_no;    
  
    return this.http.post<any>(environment.apiURL+"users/otp_verification?region=IN&auth_token="+environment.authtoken, JSON.stringify(forgot_password_params), this.options)
    .pipe(
      retry(1),
      catchError(this.commonService.handleError)
     );
  }

  mobileResetPassword(resetPassword: any, otpval: any) {
    var reset_params = {};
    console.log("resetPassword"+resetPassword);
    reset_params["user"] = {};
    reset_params["user"]["key"] = otpval.toString();    
    reset_params["user"]["password"] = resetPassword.reset_pwd;    
    reset_params["user"]["confirm_password"] = resetPassword.reset_con_pwd;        
    reset_params["user"]["region"] = "IN";
      
    return this.http.post<any>(environment.apiURL+"users/reset_password?region=IN&auth_token="+environment.authtoken, JSON.stringify(reset_params), this.options)
    .pipe(
      retry(1),
      catchError(this.commonService.handleError)
     );
  }

  emailForgotPassword(userMobileForgot: any) {
    var forgot_password_params = {};
    forgot_password_params["user"] = {};
    forgot_password_params["user"]["region"] = "IN";
    forgot_password_params["user"]["user_id"] = userMobileForgot.frgt_pwd_email_id;
    forgot_password_params["user"]["type"] = "email";  
  
    return this.http.post<any>(environment.apiURL+"users/forgot_password?region=IN&auth_token="+environment.authtoken, JSON.stringify(forgot_password_params), this.options)
    .pipe(
      retry(1),
      catchError(this.commonService.handleError)
     );
  }

  emaillResetPassword(resetPassword: any, forgot_key: any) {
    var reset_params = {};
    console.log("resetPassword"+resetPassword);
    reset_params["user"] = {};
    reset_params["user"]["key"] = forgot_key;    
    reset_params["user"]["password"] = resetPassword.reset_pwd;    
    reset_params["user"]["confirm_password"] = resetPassword.reset_con_pwd;        
    reset_params["user"]["region"] = "IN";
      
    return this.http.post<any>(environment.apiURL+"users/reset_password?region=IN&auth_token="+environment.authtoken, JSON.stringify(reset_params), this.options)
    .pipe(
      retry(1),
      catchError(this.commonService.handleError)
     );
  }

  watchlist(sessionId: string) {
    return this.http.get<any>(environment.apiURL+"users/"+sessionId+"/playlists/watchlater/listitems?region=IN&auth_token="+environment.authtoken)
    .pipe(
      retry(1),
      catchError(this.commonService.handleError)
     );
  }


  favourites(sessionId: string) {
    //https://prod.api.tarangplus.in/users/7f7d0fd0040ce500e61bc84bbb29aa5f/playlists/favourite?region=IN&auth_token=3zZmzoHg8z6SM3wpDoyw
    return this.http.get<any>(environment.apiURL+"users/"+sessionId+"/playlists/favourite/listitems?region=IN&auth_token="+environment.authtoken)
    .pipe(
      retry(1),
      catchError(this.commonService.handleError)
     );
  }

  addWatchLater(sessionId: string, watchLaterParams: any) {    
    console.log(watchLaterParams)
    return this.http.post<any>(environment.apiURL+"users/"+sessionId+"/playlists/watchlater?region=IN&auth_token="+environment.authtoken, JSON.stringify(watchLaterParams), this.options)
    .pipe(
      retry(1),
      catchError(this.commonService.handleError)
     );
  }
  
  removeWatchlist(sessionId: string, itemId: any) {
    console.log(itemId);    
    return this.http.delete<any>(environment.apiURL+"users/"+sessionId+"/playlists/watchlater/listitems/"+itemId+"?region=IN&auth_token="+environment.authtoken)
    .pipe(
      retry(1),
      catchError(this.commonService.handleError)
     );
  }

  addToFavourites(sessionId: string, favouritesParam: any){
    console.log("Add To Favourites");
    return this.http.post<any>(environment.apiURL+"users/"+sessionId+"/playlists/favourite?region=IN&auth_token="+environment.authtoken, JSON.stringify(favouritesParam), this.options)
    .pipe(
      retry(1),
      catchError(this.commonService.handleError)
     );
  }

  removeFavourite(sessionId: string, itemId: any) {
    console.log(itemId);    
    return this.http.delete<any>(environment.apiURL+"users/"+sessionId+"/playlists/favourite/listitems/"+itemId+"?region=IN&auth_token="+environment.authtoken)
    .pipe(
      retry(1),
      catchError(this.commonService.handleError)
     );
  }

  userVideoStatus(catalogId: string, contentId: any) {
    //http://localhost:3000/users/user_all_lists?catalog_id=5d79d1f6babd81589500024e&content_id=5de751fdbabd8149bc0004fd&item_category=
    return this.http.get<any>(environment.apiURL+"users/user_all_lists?catalog_id="+catalogId+"&content_id="+contentId+"&item_category=")
    .pipe(
      retry(1),
      catchError(this.commonService.handleError)
     );
  }

  userVideoSubStatus(sessionId: string, catalogId: string, contentId: any) {
    //http://13.233.16.182/users/05b0db73039c1e35361c3926da3804e9/get_all_details?catalog_id=5d301a74babd8131f6000019&content_id=5defab87babd816cef000090&category=&region=IN&auth_token=3zZmzoHg8z6SM3wpDoyw
    return this.http.get<any>(environment.apiURL+"users/"+sessionId+"/get_all_details?catalog_id="+catalogId+"&content_id="+contentId+"&category="+"?region=IN&auth_token="+environment.authtoken)
    .pipe(
      retry(1),
      catchError(this.commonService.handleError)
     );
  }

  getContinueWatching(sessionId: string): Observable<any> {
    return this.http.get<any>(environment.apiURL+"users/"+sessionId+"/playlists/watchhistory/listitems?region=IN&auth_token="+environment.authtoken)
    .pipe(
      retry(1),
      catchError(this.commonService.handleError)
     );
  }
  removeContinueWatching(sessionId: string, playListId: string): Observable<any> {
    return this.http.delete<any>(environment.apiURL+"users/"+sessionId+"/playlists/watchhistory/listitems/"+playListId+"?region=IN&auth_token="+environment.authtoken)
    .pipe(
      retry(1),
      catchError(this.commonService.handleError)
     );
  }  

  deleteWatchHistory(sessionId: string): Observable<any> {
    return this.http.delete<any>(environment.apiURL+"users/"+sessionId+"/playlists/watchhistory/clear_all?region=IN&auth_token="+environment.authtoken)
    .pipe(
      retry(1),
      catchError(this.commonService.handleError)
     );
  }  
}
