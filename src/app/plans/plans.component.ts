import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { UserService } from './../shared/services/user.service';
import { CommonService } from './../shared/services/common.service';
import { PlansService } from './../shared/services/plans.service';
import { Router, RouterModule } from '@angular/router';
import { BroadcastService } from '../shared/services/broadcast.service';
import { Message } from '../message';

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
  constructor(private titleService: Title, private metaService: Meta, private commonService: CommonService, 
    private plansService: PlansService, private userService: UserService, private router: Router,
    private broadcastService: BroadcastService) { }

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
    $('.modal').modal('hide');
    this.loadingIndicator = true;
    var sePlan = $(".plan_selction:checked").data("plan-info");
    console.log("Plans componenet : sePlan - "+sePlan);
    // this.plansService.initTransaction(localStorage.getItem('otv_user_id'), sePlan).subscribe(
    //   (response) => {
    //     console.log("data"+response['data']);
    //     this.setCashfreeData(response['data']);
    //     this.loadingIndicator = false;
    //   },
    //   (error) => {
    //     console.log(error);
    //     this.loadingIndicator = false;
    //     alert(error.error_mesg);
    //     alert(error.server_error_messsage);
    //   }
    // )
    //this.router.navigate(['./plans/plans_summary', { 'sePlan': sePlan}]);
    this.router.navigate(['/plans/plans_summary'], {state: {sePlan}})
  }

  showPlansSubscribePop(){
    if(!localStorage.getItem('otv_user_id')){
      $('.modal').modal('hide');
      $('#login_confirm_pop').modal('show');
    }else{
      $('.modal').modal('hide');
      $('#plans_subscribe_pop').modal('show');
    }    
  }

  closePop() {
    $('.modal').modal('hide');
  }

  showLoginPop() {
    this.closePop();
    this.broadcastService.dispatch(new Message('login', null));
  }
}
