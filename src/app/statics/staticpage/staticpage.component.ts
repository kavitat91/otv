import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { CommonService } from '../../shared/services/common.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-staticpage',
  templateUrl: './staticpage.component.html',
  styleUrls: ['./staticpage.component.css']
})
export class StaticpageComponent implements OnInit {
  sub: any;
  page: string;
  contact: any = {
    contact_us_query: "Subscription",
    contact_mobile: null,
    contact_email: null,
    query_description: null
  }
  errorStatus: boolean = false;
  statusMessage: any;
  loadingIndicator: boolean = false;
  contentHeight: number; 
  contentHeight5: number; 
  contactToast: boolean = false;
  @ViewChild('contactForm', {static: false}) public contactForm: NgForm;
  constructor(private route: ActivatedRoute, private service: UserService, private commonService: CommonService) { }



  ngOnInit() {
    this.sub = this.route.data
    .subscribe((page) =>{
      console.log(page);
      if(page['page'] == 'about') {
        this.page = "about";
      }
      else if(page['page'] == 'pp') {
        this.page = "pp";
      }
      else if(page['page'] == 'tc') {
        this.page = "tc";
      }
      else if(page['page'] == 'faq') {
        this.page = "faq";
      }
      else if(page['page'] == 'contact') {
        this.page = "contact";
      }
      else if(page['page'] == 'coming_soon') {
        this.page = "coming_soon";
      }
    }); 
    this.contentHeight = this.commonService.pageHeight();
    this.contentHeight5 = this.commonService.pageHeight()+150;
    
}

onContactSubmit(contact: any) {
  console.log(contact);
  this.loadingIndicator = true;
  this.service.contact(contact).subscribe(
    (response: Response) => {
      this.loadingIndicator = false;
      this.contactToast = true;
    },
    (error: any) => {
      this.loadingIndicator = false;
      this.errorStatus = true;
      this.statusMessage = error.server_error_messsage;
    }
  )
}

ngOnDestroy() {
  this.sub.unsubscribe();
}

onContctInputFocusOut(e){
  // if(e.target.value.length > 0){
  //   e.target.setAttribute('class', 'actives');
  // }else{

  // }
  
}

}
