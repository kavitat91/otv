import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { CommonService } from '../../shared/services/common.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  sessionId: string;
  user: any;
  sub: any;
  page: string;
  contentHeight: number;
  contentHeight1: number;
  statusMessage: any;
  errorStatus: boolean = false;
  backendMessage: string;
  backendMessageStatus: boolean = false;
  loadingIndicator: boolean = false;
  loginType: string;
  isEmailReadOnly: boolean;
  isMobileReadOnly: boolean;
  showPassword1: boolean = false;
  showPassword2: boolean = false;
  showPassword3: boolean = false;
  showPassword4: boolean = false;
  showPassword5: boolean = false;
  countryCodeStatus: boolean = false;
  updateUserToast: boolean = false;
  updatePasswordToast: boolean = false;
  changePasswordToast: boolean = false;
  resetPasswordToast: boolean = false;
  watch_list_items: any;
  deleteWatchlist: boolean = false;
  watch_list_items_count: number;
  favourite_list_items: any;
  favourite_list_items_count: number;
  itemURL: any;
  updateUser: any = {
    user_profile_name: null,
    user_mobile_number: null,
    user_email_address: null,
    user_address: null,
    user_status: null,
    user_country: null,
    datepicker: null
  }
  changePassword: any = {
    old_change_password: null,
    new_change_password: null,
    new_change_confirm_password: null
  }
  resetPassword: any = {
    reset_pwd: null,
    reset_con_pwd: null
  }
  inavlid_changePasswordForm: any = {};
  constructor(private userService: UserService, private commonService: CommonService, private route: ActivatedRoute, private router: Router) { 
  }

  ngOnInit() {
    this.backendMessageStatus = false;
    this.loginType = localStorage.getItem('otv_user_login_type');
    this.sessionId = localStorage.getItem('otv_user_id');
    if(this.loginType == 'mobileno') {
      this.isMobileReadOnly = true;
    }
    if(this.loginType == 'email') {
      this.isEmailReadOnly = true;
    }
    this.sub = this.route.data
    .subscribe((page) =>{
      //console.log(page);
      if(page['page'] == 'accountdetails') {
        this.page = "accountdetails";
        this.userDetails();
      }
      else if(page['page'] == 'updatepersonaldetails') {
        this.page = "updatepersonaldetails";
        this.userDetails();
      }
      else if(page['page'] == 'changepassword') {
        this.page = "changepassword";
      }
      else if(page['page'] == 'resetpassword') {
        this.page = "resetpassword";
      }
      else if(page['page'] == 'watchlist') {
        this.page = "watchlist";
        this.watchlist();
      }else if(page['page'] == 'favourites'){
        this.page = "favourites";
        this.favourites();
      }
    }); 
    this.contentHeight = this.commonService.pageHeight();
    this.contentHeight1 = this.commonService.pageHeight() - 10;
    
  }

  focusCountryLogin() { /* Show country code when mobile number is focused and mobile number */
    this.countryCodeStatus = true;
  }

  focusOutCountryLogin(event: any) { /* Show country code when mobile number is focused and mobile number and hide when mobile number value is not more than zero */
    if(event.target.value.length > 0) {
      this.countryCodeStatus = true;  
    } 
    else {
      this.countryCodeStatus = false;
    }  
  }
 
  togglePassword1() { /* toggle attribute(text, password) and change the image */
    this.showPassword1 = !this.showPassword1;    
  }

  togglePassword2() { /* toggle attribute(text, password) and change the image */
    this.showPassword2 = !this.showPassword2;    
  }

  togglePassword3() { /* toggle attribute(text, password) and change the image */
    this.showPassword3 = !this.showPassword3;    
  }

  togglePassword4() { /* toggle attribute(text, password) and change the image */
    this.showPassword4 = !this.showPassword4;    
  }
  togglePassword5() { /* toggle attribute(text, password) and change the image */
    this.showPassword5 = !this.showPassword5;    
  }

  userDetails() {
    this.userService.userDetails(this.sessionId).subscribe(
      (user) => {
        this.user = user.data;  
        //console.log(this.user);   
        this.updateUser = {
          user_profile_name: this.user.firstname,
          user_mobile_number: this.user.mobile_number,
          user_email_address: this.user.user_email_id,
          user_address: this.user.address,
          user_status: this.user.status,
          user_country: this.user.country,
          datepicker: this.user.birthdate
        }   
      },
      (error) => {
        this.errorStatus = true;
        this.statusMessage = error.server_error_messsage;
      }
    );
  }

  onUpdateUser(updateUser: any) {
    //console.log(updateUser);
    this.userService.updateUser(updateUser, this.sessionId).subscribe(
      (user) => {
        this.updateUserToast = true;
        setTimeout(() => {
          this.router.navigate(['/users/account_details']);
        }, 2500);
      },
      (error) => {
        console.log(error);
        this.updateUserToast = true;
        this.statusMessage = error.server_error_messsage;
        setTimeout(() => {
          this.updateUserToast = false;
        }, 2500);
      }
    )
  }

  onChangePassword(changePassword: any) {
    if(!changePassword.old_change_password){
      this.inavlid_changePasswordForm.old_change_password = true;
    } else if(!changePassword.new_change_password){
      this.inavlid_changePasswordForm.old_change_password = false;
      this.inavlid_changePasswordForm.new_change_password = true;
    } else if(!changePassword.new_change_confirm_password){
      this.inavlid_changePasswordForm.new_change_password = false;
      this.inavlid_changePasswordForm.new_change_confirm_password = true;
    } else {
      this.inavlid_changePasswordForm.new_change_confirm_password = false;
      this.userService.changePassword(changePassword, this.sessionId).subscribe(
        (user) => {
          //this.updatePasswordToast = true;
          this.changePasswordToast = true;
          this.statusMessage = user['data']['message'];
          setTimeout(() => {
            this.router.navigate(['/users/account_details']);
          }, 2500);
        },
        (error) => {
          console.log(error);
          this.changePasswordToast = true;
          setTimeout(() => {
            this.changePasswordToast = false;
          }, 2500);
          this.statusMessage = error.server_error_messsage;
        }
      )
    }
  }

  onResetPassword(resetPassword: any) {
    var forgot_key: any = window.location.href.split("?forgot_pin_secret_key=")[1].replace(/%2F/g,"/");
    console.log("forgot_key"+forgot_key);
    
    this.userService.emaillResetPassword(resetPassword, forgot_key).subscribe(
      (user) => {
        this.resetPasswordToast = true;
        this.statusMessage = user['data']['message']
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2500);
      },
      (error) => {
        console.log(error);
        this.resetPasswordToast = true;
        setTimeout(() => {
          this.resetPasswordToast = false;
        }, 2500);
        this.statusMessage = error.server_error_messsage;
      }
    )
  }

  watchlist() {
    
    this.loadingIndicator = true;
    this.userService.watchlist(this.sessionId).subscribe(
      (res) => {
        
        this.watch_list_items = res.data.items;
        this.watch_list_items_count = res.data.total_items_count;
        console.log(res.data);
        for(var x=0; x < this.watch_list_items.length; x++)  {
          this.watch_list_items[x]["item_url"] = this.commonService.getItemURL(this.watch_list_items[x]);
          //this.watch_list_items[x]["item_url"].push(this.itemURL);
          //this.watch_list_items[x].push({item_url,this.itemURL});
        }
        //console.log("this.itemURL"+this.itemURL);
        //console.log("this.watch_list_items"+this.watch_list_items);
        this.loadingIndicator = false;
      },
      (error) => {
        this.loadingIndicator = false;
        console.log(error);
        this.statusMessage = error.server_error_messsage;
      }
    )
  }

  removeWatchList(itemId: any) {
    this.loadingIndicator = true;
    this.userService.removeWatchlist(this.sessionId, itemId).subscribe(
      (response) => {
        this.loadingIndicator = false;
        console.log(response);
        $("#item_"+itemId).hide();
        $("html, body").animate({ scrollTop: $(document).height()-$(window).height() });
        //$("#watch_list_delete_toast").show().fadeOut(4500);
        this.deleteWatchlist = true;
        setTimeout(function() {
          this.deleteWatchlist = false;
        }.bind(this), 4500);  
        var item_cnt = response.items_count;
        if(item_cnt == 0){
          window.location.reload();
        }
      },
      (error) => {
        console.log(error);      
        this.loadingIndicator = false;  
        this.statusMessage = error.server_error_messsage;
      }
    )      
  }

  favourites(){
    this.loadingIndicator = true;
    this.userService.favourites(this.sessionId).subscribe(
      (res) => {
        this.favourite_list_items = res.data.items;
        this.favourite_list_items_count = res.data.items.length;
        console.log(res.data);
        for(var x=0; x < this.favourite_list_items.length; x++)  {
          this.favourite_list_items[x]["item_url"] = this.commonService.getItemURL(this.favourite_list_items[x]);
          //this.watch_list_items[x]["item_url"].push(this.itemURL);
          //this.watch_list_items[x].push({item_url,this.itemURL});
        }
        //console.log("this.itemURL"+this.itemURL);
        //console.log("this.watch_list_items"+this.watch_list_items);
        this.loadingIndicator = false;
      },
      (error) => {
        this.loadingIndicator = false;
        console.log(error);
        this.statusMessage = error.server_error_messsage;
      }
    )
  }

  removeFavourite(itemId: any) {
    this.loadingIndicator = true;
    this.userService.removeFavourite(this.sessionId, itemId).subscribe(
      (response) => {
        this.loadingIndicator = false;
        console.log(response);
        $("#item_"+itemId).hide();
        $("html, body").animate({ scrollTop: $(document).height()-$(window).height() });
        //$("#watch_list_delete_toast").show().fadeOut(4500);
        this.deleteWatchlist = true;
        setTimeout(function() {
          this.deleteWatchlist = false;
        }.bind(this), 4500);  
        var item_cnt = response.items_count;
        if(item_cnt == 0){
          window.location.reload();
        }
      },
      (error) => {
        console.log(error);      
        this.loadingIndicator = false;  
        this.statusMessage = error.server_error_messsage;
      }
    )      
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}


