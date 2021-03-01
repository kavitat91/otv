import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from './../../shared/services/user.service';
import { CommonService } from '../../shared/services/common.service';
import { FormBuilder, Validators, FormGroup  } from '@angular/forms'
//import { ClickElsewhereDirective } from '../../shared/directives/click-outside.directive.directive';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {
  showLoginPopStatus: boolean = false;
  displayPopStatus: string = 'none'; 
  selectedPop: string;
  userlocal: any;
  loginStatus: boolean = false;
  errorStatus: boolean = false;
  statusMessage: any;
  backendErrorStatus: boolean = true;
  loadingIndicator: boolean = false;
  userEmailLogin = this.fb.group({
    login_email: ['', [Validators.required, Validators.email]],
    login_email_password: ['', Validators.required]
  });
  userMobileLogin: any = {
    login_mobile: null,
    user_mob_password: null
  }
  userEmailRegister: any = {
    register_name: null,
    register_password: null,
    email_agree_terms: null    
  }
  userMobileRegister: any = {
    user_register_mobile: null,
    mob_register_password: null,    
    phone_agree_terms: null,
    registerMobileOTP: null
  }
  emailForgotPassword: any = {
    frgt_pwd_email_id: null
  }
  userMobileForgot: any = {
    frgt_pwd_mobile_no: null,
    frgt_pwd_otp: null
  }
  resetPassword: any = {
    reset_otp: null,
    reset_pwd: null,
    reset_con_pwd: null
  }

  user_det: any;
  userAccountMenu: any = false;
  langOptions: any = false;
  showPassword: boolean = false;
  countryCodeStatus: boolean = false;
  otpStep2: boolean = false;
  registerStep2: boolean = false;
  otpval: any;
  header_tabs: any;
  language: any;
  langToast: boolean = false;
  watchHistoryToast: boolean = false;
  languageOptions: any = [
    {
    value: "en",
    name: "English"
  },
  {
    value: "od",
    name: "Odia"
  }
  
];
radioSelected: any = '';
mobileMenu: boolean = false;
profileMenu: boolean = false;
langMenu: boolean = false;
mobileMenuOpen: boolean = true;
loginPop: string;
continueWatchLength: any

public resetPasswordToast: boolean = false;
  
  @ViewChild('emailLoginForm', {static: false}) public emailLoginForm: NgForm;
  @ViewChild('mobileNoLoginForm', {static: false}) public mobileNoLoginForm: NgForm;
  @ViewChild('emailRegisterForm', {static: false}) public emailRegisterForm: NgForm;
  @ViewChild('mobileRegisterForm', {static: false}) public mobileRegisterForm: NgForm;
  @ViewChild('emailForgotForm', {static: false}) public emailForgotForm: NgForm;
  @ViewChild('mobileForgotForm', {static: false}) public mobileForgotForm: NgForm;
  constructor(private userService: UserService, private commonService: CommonService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) { 
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) { /* Your code goes here on every router change */
        this.mobileMenu = false;
        this.profileMenu = false;
        this.langMenu = false;
        this.mobileMenuOpen = true;     
      }
    });
  }

  ngOnInit() {
    if(localStorage.getItem('otv_user_id')) {
      this.loginStatus = true
    } 
    localStorage.removeItem("resetPasswordToast");
    this.getMenu();
    this.language = 'en';
    localStorage.setItem('language', 'en');
    this.radioSelected = this.language;    
    /* console.log("this.language"+localStorage.getItem('language'));
    console.log("this.radioSelected"+localStorage.getItem('language')); */
    this.loginPop = localStorage.getItem('loginPop');      
    this.continueWatchLength = localStorage.getItem('continueWatchItem');
    console.log("continueWatchLength: ", this.continueWatchLength)
  }
  ngOnChanges() {
    
  }

  showPop(popId: string, prev_popup_type: string) { /* Show Pop up */
    console.log("popId"+popId);
    $('.modal').modal('hide');
    $('#'+popId).modal('show');
    if(prev_popup_type == 'loginform') {
      this.emailLoginForm.reset();
      this.mobileNoLoginForm.reset();
      this.countryCodeStatus = false;
      $('#signin_pop').modal('hide');
    }
    if(prev_popup_type == 'registerform') {
      this.emailRegisterForm.reset();
      this.mobileRegisterForm.reset();
      this.countryCodeStatus = false;
      $('#register_pop').modal('hide');
    }
    if(prev_popup_type == 'forgotpasswordform') {
      this.emailForgotForm.reset();
      this.mobileForgotForm.reset();
      this.countryCodeStatus = false;
      $('#forgot_password_pop').modal('hide');
    }    
    //this.selectedPop = popId;
    //this.displayPopStatus = 'block';    
  }

  closePop(popupType: string) { /* Close Pop up */
    this.displayPopStatus = 'none';
    $('.modal').modal('hide');
    if(popupType == 'loginform') {
      this.emailLoginForm.reset();
      this.mobileNoLoginForm.reset();
      this.countryCodeStatus = false;
    }
    if(popupType == 'registerform') {
      this.emailRegisterForm.reset();
      this.mobileRegisterForm.reset();
      this.countryCodeStatus = false;
    }
    if(popupType == 'forgotpasswordform') {
      this.emailForgotForm.reset();
      this.mobileForgotForm.reset();
      this.otpStep2 = false;
      this.countryCodeStatus = false;
    } 
    if(popupType == 'logoutform'){
      this.countryCodeStatus = false;
    }
    if(popupType == 'deleteWatchHistory'){
      this.countryCodeStatus = false;
    }
    
    $('.modal-backdrop.show').hide();
  }

  tabChange(prevtabType: string) {
    if(prevtabType == 'emaillogin') {
      this.emailLoginForm.reset();   
      this.statusMessage = '';  
      this.errorStatus = false; 
    }
    if(prevtabType == 'mobilelogin') {
      this.mobileNoLoginForm.reset();   
      this.countryCodeStatus = false; 
      this.errorStatus = false;  
    }
    if(prevtabType == 'emaillregister') {
      this.emailRegisterForm.reset();  
      this.errorStatus = false;    
    }
    if(prevtabType == 'mobileregister') {
      this.mobileRegisterForm.reset();   
      this.countryCodeStatus = false;  
      this.errorStatus = false; 
    }
    if(prevtabType == 'emailforgot') {
      this.mobileForgotForm.reset(); 
      this.otpStep2 = false;

    }
    if(prevtabType == 'mobileforgot') {
      this.emailForgotForm.reset();   
      this.countryCodeStatus = false;   
    }
  }
  
  toggleUserAccountMenu(event: any) { /* Toggle user account menu and hide when language menu clicked */
    this.langOptions = false;
    this.userAccountMenu = !this.userAccountMenu;    
  }

  closeLangMenu() {
    this.langOptions = false;    
  }  

  closeAccountMenu() {
    this.userAccountMenu = false;
  } 
 
  toggleLangOptions() { /* Toggle language options and hide when user account menu clicked */
    this.userAccountMenu = false;
    this.langOptions = !this.langOptions;
  }
  onLangChange(val: string) {
    localStorage.removeItem('language');
    localStorage.setItem('language', val);
    this.language = localStorage.getItem('language');
    this.radioSelected = "";
    this.radioSelected = localStorage.getItem('language');    
    //alert(this.language+" Language selected successfully");
    this.langToast = true;
    setTimeout(function() {
      this.langOptions = false;
    }.bind(this), 500);          
    setTimeout(function() {
      //window.location.reload();
    }.bind(this), 2000);        
  }

  mobileToggle(type: string) {
    if(type == 'mobileMenu') {
      this.mobileMenu = true;
      this.profileMenu = false;
      this.langMenu = false;
      this.mobileMenuOpen = false;
    }
    if(type == 'profileMenu') {
      this.mobileMenu = false;
      this.profileMenu = true;
      this.langMenu = false;
      this.mobileMenuOpen = false;
    }
    if(type == 'langMenu') {
      this.mobileMenu = false;
      this.profileMenu = false;
      this.langMenu = true;
      this.mobileMenuOpen = false;
    }
  }  
  closeMobileMenu() {
    this.mobileMenu = false;
    this.profileMenu = false;
    this.langMenu = false;
    this.mobileMenuOpen = true;
  }

  focusEmailLogin() { /* Hide the backend emaile login error message when one of email form input is focused in */
    this.backendErrorStatus = true;
  }

  focusMobileLogin() { /* Hide the backend mobile login error message when one of mobile form input is focused */
    this.backendErrorStatus = true;
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

  togglePassword() { /* toggle attribute(text, password) and change the image */
    this.showPassword = !this.showPassword;    
  }
  
  getMenu() {
    this.commonService.getMenuList(this.language).subscribe(
      (resp) => {
        this.header_tabs = resp["data"]["catalog_list_items"];
        /*  for(var i=0; i < this.header_tabs.length; i++) {
          console.log(this.header_tabs[i]['display_title']);
        } */
      },
      (error) => {
        console.log(error);
      }
    )
  }

  logoutConfirm() {    
    this.loadingIndicator = true;
    this.userService.userSignout(localStorage.getItem('otv_user_id')).subscribe(
      (res: Response) => {
        this.loadingIndicator = false;
        this.commonService.removeOtvUserLocalStorage();
        this.closePop('logoutform');
        this.loginStatus = false;
        this.router.navigate(['/']);
        
      },
      (error: any) => {
        this.loadingIndicator = false;
        this.errorStatus = true;
        this.statusMessage = error.server_error_messsage;
        setTimeout(function() {
          this.errorStatus = false;
        }.bind(this), 4500);
      }
    )
  }

  deleteWatchHistory() {
    this.loadingIndicator = true;
    this.userService.deleteWatchHistory(localStorage.getItem('otv_user_id')).subscribe(
      (response) => {
        console.log(response);
        this.continueWatchLength = localStorage.removeItem('continueWatchItem');
        $('#delete_watch').modal('hide');
        this.watchHistoryToast = true;        
        setTimeout(function() {
          this.watchHistoryToast = false;
          window.location.reload();
        }.bind(this), 1000);  
      },
      (error) => {
        console.log(error)
      }
    )
  }

  onUserEmailLogin(userLogin: any) { /* user login by email */
    this.loadingIndicator = true;
    this.userService.emailLogin(userLogin).subscribe(
      (response) => {
        var userId = response['data']['session'];
        
      this.userService.userDetails(response['data']['session']).subscribe(
        (user) => {
          this.loadingIndicator = false;
          if(user["data"]["login_type"] == "msisdn") {
            var type = "mobileno";
          }
          else {
            var type = "email";
          }
          this.user_det = {
            status: true,
            user_id: userId,
            user_login_type: type,
            user_login_id: user["data"]["primary_id"],
            user_analy_id: user['data']['user_id'],
            user_sub_st: user['data']['is_subscribed']
          }
          this.commonService.setOtvUserLocalStorage(this.user_det);
          window.location.reload();
        },
        (error: any) => {
          this.loadingIndicator = false;
          this.errorStatus = true;
          this.statusMessage = error.server_error_messsage;       
          // setTimeout(function() {
          //   this.errorStatus = false;
          // }.bind(this), 4500);
        }
      )
        
      },
      (error: any) => {
        this.loadingIndicator = false;
        this.errorStatus = true;
        this.statusMessage = error.server_error_messsage;
        // setTimeout(function() {
        //   this.errorStatus = false;
        // }.bind(this), 4500);
      }
    );
  }

  onUserMobileLogin(userLogin: any) { /* user login by mobile number */
    console.log(userLogin);
    this.loadingIndicator = true;
    this.userService.mobileLogin(userLogin).subscribe(
      (response: Response) => {
        var userId = response['data']['session'];
        this.userService.userDetails(response['data']['session']).subscribe(
          (user) => {
            console.log("user:"+user);
            this.loadingIndicator = false;
            if(user["data"]["login_type"] == "msisdn") {
              var type = "mobileno";
            }
            else {
              var type = "email";
            }
            this.user_det = {
              status: true,
              user_id: userId,
              user_login_type: type,
              user_login_id: user["data"]["primary_id"],
              user_analy_id: user['data']['user_id'],
              user_sub_st: user['data']['is_subscribed']
            }
            this.commonService.setOtvUserLocalStorage(this.user_det);
            window.location.reload();
          },
          (error: any) => {
            this.loadingIndicator = false;
            this.errorStatus = true;
            this.statusMessage = error.server_error_messsage;
            setTimeout(function() {
              this.errorStatus = false;
            }.bind(this), 4500);
          }
        )

      },
      (error: any) => {
        this.loadingIndicator = false;
        this.errorStatus = true;
        this.statusMessage = error.server_error_messsage;
        setTimeout(function() {
          this.errorStatus = false;
        }.bind(this), 4500);
      }
    )
  }

  showLogin(){
    this.showPop('signin_pop', null);
  }

  onUserEmailRegister(userEmailRegister: any) { /* user login by email */
    console.log(userEmailRegister);
    this.loadingIndicator = true;
    this.userService.emailRegister(userEmailRegister).subscribe(
      (response) => {
        console.log(response);
        this.errorStatus = true;
        this.statusMessage = "Confirmation email is sent to your email address";
        setTimeout(function() {
          this.errorStatus = false;
        }.bind(this), 4500);
      },
      (error) => {
        console.log(error);
        this.loadingIndicator = false;
        this.errorStatus = true;
        this.statusMessage = error.server_error_messsage;
        setTimeout(function() {
          this.errorStatus = false;
        }.bind(this), 4500);
      }
      );
  }   
  onUserMobileRegister(userMobileRegister: any) { 
    console.log(userMobileRegister);
    this.loadingIndicator = true;
    this.userService.mobileRegister1(userMobileRegister).subscribe(
      (response) => {
        this.loadingIndicator = false;
        console.log(response);
        this.registerStep2 = true;
        this.errorStatus = true;
        this.statusMessage = "Otp sent successfully";
      },
      (error) => {
        console.log(error);
        this.loadingIndicator = false;
        this.errorStatus = true;
        this.statusMessage = error.server_error_messsage;
      }
      );
  }   

  onUserMobileResendOTP(userMobileRegister: any) {
    this.loadingIndicator = true;
    this.userService.mobileRegisterResendOTP(userMobileRegister, "registerotp").subscribe(
      (response) => {
        this.loadingIndicator = false;
        console.log(response);
        this.errorStatus = true;
        this.statusMessage = "Otp has been sent again successfully";
        setTimeout(function() {
          this.errorStatus = false;
        }.bind(this), 4500);
      },
      (error) => {
        console.log(error);
        this.loadingIndicator = false;
        this.errorStatus = true;
        this.statusMessage = "Sorry something went wrong";
        setTimeout(function() {
          this.errorStatus = false;
        }.bind(this), 4500);
      }
      );
  }

  onUserMobileRegister2(userMobileRegister: any) {
    console.log(userMobileRegister);
    this.loadingIndicator = true;
    this.userService.mobileRegister2(userMobileRegister).subscribe(
      (response) => {
        this.loadingIndicator = false;
        console.log(response);
        this.registerStep2 = true;
        var userId = response['data']['session_id'];
        this.userService.userDetails(response['data']['session_id']).subscribe(
          (user) => {
            console.log("user:"+user);
            this.loadingIndicator = false;
            if(user["data"]["login_type"] == "msisdn") {
              var type = "mobileno";
            }
            else {
              var type = "email";
            }
            this.user_det = {
              status: true,
              user_id: userId,
              user_login_type: type,
              user_login_id: user["data"]["primary_id"],
              user_analy_id: user['data']['user_id'],
              user_sub_st: user['data']['is_subscribed']
            }
            this.commonService.setOtvUserLocalStorage(this.user_det);
            window.location.reload();
          },
          (error: any) => {
            this.loadingIndicator = false;
            this.errorStatus = true;
            this.statusMessage = error.server_error_messsage;
            setTimeout(function() {
              this.errorStatus = false;
            }.bind(this), 4500);
          }
        )
      },
      (error) => {
        console.log(error);
        this.loadingIndicator = false;
        this.errorStatus = true;
        this.statusMessage = error.server_error_messsage;
        setTimeout(function() {
          this.errorStatus = false;
        }.bind(this), 4500);
      }
      );
  }   


  onUserMobileForgotPassword(userMobileForgot: any) {
    this.loadingIndicator = true;
    this.userService.mobileForgotPassword1(userMobileForgot).subscribe(
      (resp: any) => {
        this.loadingIndicator = false;
        console.log(resp);
        this.otpStep2 = true;
        this.errorStatus = true;
        this.statusMessage = "Otp sent successfully";
        setTimeout(function() {
          this.errorStatus = false;
        }.bind(this), 4500);
      },
      (error: any) => {
        console.log(error);
        this.loadingIndicator = false;
        this.otpStep2 = false;
        this.errorStatus = true;
        this.statusMessage = error.server_error_messsage;
        setTimeout(function() {
          this.errorStatus = false;
        }.bind(this), 4500);
      }
    )
  }


  onMobileForgotPasswordResendOTP(userMobileForgot: any) {
    this.loadingIndicator = true;
    this.userService.mobileRegisterResendOTP(userMobileForgot, "forgotpassotp").subscribe(
      (resp: any) => {
        this.loadingIndicator = false;
        console.log(resp);
        this.errorStatus = true;
        this.statusMessage = "Otp has been sent again successfully";
        setTimeout(function() {
          this.errorStatus = false;
        }.bind(this), 4500);
      },
      (error) => {
        console.log(error);
        this.loadingIndicator = false;
        this.errorStatus = true;
        this.statusMessage = "Sorry something went wrong";
        setTimeout(function() {
          this.errorStatus = false;
        }.bind(this), 4500);      
      }
    )
  }

  onMobileForgotPassword2(userMobileForgot: any) {
    this.loadingIndicator = true;
    this.userService.mobileForgotPassword2(userMobileForgot).subscribe(
      (resp: any) => {
        this.loadingIndicator = false;
        this.errorStatus = true;
        this.statusMessage = "Success";
        setTimeout(function() {
          this.errorStatus = false;
        }.bind(this), 4500);  
        this.selectedPop = "reset_password_pop";
        this.displayPopStatus = 'block';
        this.otpval = userMobileForgot.frgt_pwd_otp;        
      },
      (error: any) => {
        console.log(error);
        this.loadingIndicator = false;
        this.errorStatus = true;
        this.statusMessage = error.server_error_messsage;
        setTimeout(function() {
          this.errorStatus = false;
        }.bind(this), 4500);
      }
    )
  }

  onResetPassword(resetPassword: any) {
    this.loadingIndicator = true;    
    this.userService.mobileResetPassword(resetPassword, this.otpval).subscribe(
      (resp) => {
        this.loadingIndicator = false;    
        this.resetPasswordToast = true;  
        localStorage.setItem("resetPasswordToast", "true");
        this.errorStatus = true;
        this.statusMessage = "Password reset successfully";
        setTimeout(function() {
          this.errorStatus = false;
        }.bind(this), 4500);
        window.location.reload();
      },
      (error: any) =>  {
        this.loadingIndicator = false;
          this.errorStatus = true;
          this.statusMessage = error.server_error_messsage;
          setTimeout(function() {
            this.errorStatus = false;
          }.bind(this), 4500);
      }          
             
    )
  }

  onUserEmailForgotPassword(emailForgotPassword: any) {
    this.loadingIndicator = true;    
    this.userService.emailForgotPassword(emailForgotPassword).subscribe(
      (resp) => {
        this.loadingIndicator = false; 
        this.errorStatus = true;
        this.statusMessage = "Email has been sent to your registered email address"
      },
      (error) => {
        this.loadingIndicator = false; 
        this.errorStatus = true;
        this.statusMessage = error.server_error_messsage;
      }
    )
  }

  redirectToTermsAndConditions(){
    this.router.navigate(['/terms_and_conditions']);
    this.closePop('registerform');
    
  }

  redirectToPrivacyPolicy(){
    this.router.navigate(['/privacy_policy']);
    this.closePop('registerform');
  }

  
 
}
