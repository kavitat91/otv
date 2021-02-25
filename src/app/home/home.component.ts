import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PageService } from '../shared/services/page.service';
import { CommonService } from '../shared/services/common.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewChecked {
  homeCon: any;
  errorStatus: boolean = false;
  statusMessage: any;
  bannerSliderContent: any;
  items: any;
  continueWatchItem: any;
  loadingIndicator: boolean = false;
  contentHeight: number; 
  resetPasswordToast: boolean = false;
  carouselStatus: boolean = false;
  continueDeleteToast: boolean = false;
  desktopNav: boolean = false;
  mobileNav: boolean = false;  
  det1: any;
  language: any;
  moreUrl: string;
  noOfItems: number;
  items0: number;
  items576: number;
  items768: number;
  items992: number;
  items1200: number;
  autoLoopStatus: boolean = false;
  moreLayout: string;
  sessionId: string; 
  continueItemId: string;

  constructor(private service: PageService, private commonService: CommonService, private userService: UserService,
    private router: Router, private route: ActivatedRoute, private titleService: Title, private metaService: Meta) { }

  ngOnInit() {
    this.sessionId = localStorage.getItem('otv_user_id')      
    this.getHomeList();
    this.getContinueWatching();
    this.contentHeight = this.commonService.pageHeight() + 81;    
    if(localStorage.getItem("resetPasswordToast") == "true") {
      this.resetPasswordToast = true;
    }
    console.log("window.outerWidth"+window.outerWidth);
    if(window.outerWidth < 1200) {
      this.mobileNav = true;
    }
    else {
      this.desktopNav = true;
    }

    this.titleService.setTitle('Tarang Plus Home');
    this.metaService.updateTag({name: 'keywords', content: 'Tarang Plus Home'});
    this.metaService.updateTag({name: 'description', content: 'Tarang Plus Home'});
  }
  ngAfterViewChecked(){
    
  }

  carouselOptions = {
    loop:true,
    margin: 0,
    nav: false,
    dot: true,
    navSpeed: 1000,
    autoplay: true,
    autoplayTimeout:5000,
    navText: ["<div class='nav-btn prev-slide'></div>", "<div class='nav-btn next-slide'></div>"],
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      600: {
        items: 1,
        nav: true
      },
      1000: {
        items: 1,
        loop: false
      },
      1500: {
        items: 1,
        stagePadding: 100,
        margin: 10,
        loop: false
      }
    }
  }

  getContinueWatching() {
    
    this.loadingIndicator = true;
    if(this.sessionId){
      this.userService.getContinueWatching(this.sessionId).subscribe(
        (data) => {
          this.continueWatchItem = data['data']['items'];
          localStorage.setItem('continueWatchItem', this.continueWatchItem.length);
          for(var x=0; x < this.continueWatchItem.length; x++) {
            this.continueWatchItem[x]['itemURL'] = this.commonService.getItemURL(this.continueWatchItem[x]);
            console.log(this.continueWatchItem[x]['itemURL']);
          }
          
        },
        (error) => {
          console.log(error);
        }
      )
    }
    
  }
  deleteContinueWatchPop(itemId: string) {
    $('#ctn_watch_delete_pop').modal('show');
    this.continueItemId = itemId;
  }

  closePop(popId: string) {
    $('#'+popId).modal('hide');
  }
  deleteContinueWatch() {
    this.userService.removeContinueWatching(this.sessionId, this.continueItemId).subscribe(
      (resp) => {
        $('#ctn_watch_delete_pop').modal('hide');
        this.continueDeleteToast = true;        
        $('#user_continue_watch_list_'+this.continueItemId).hide();
        console.log(resp);
        setTimeout(function() {
          this.continueDeleteToast = false;
          window.location.reload();
        }.bind(this), 1000);  
      },
      (error) => {
        console.log(error);
      }
    )
  }

  getHomeList() {
    this.loadingIndicator = true;
    this.language = localStorage.getItem('language');
  	this.service.getHomeContent(this.language).subscribe(
  	(response)=> {
      this.homeCon = response.data.catalog_list_items;      
      //console.log(this.homeCon);
        
      this.bannerSliderContent = this.homeCon[0]['catalog_list_items'];

      for(var x=0; x < this.bannerSliderContent.length; x++)  {
        this.bannerSliderContent[x]["item_url"] = this.commonService.getItemURL(this.bannerSliderContent[x]);          
      }
      this.items = this.homeCon.slice(1, this.homeCon.length);        
      
     //this.callSliderShow(this.items.length, this.det1);  
      
      /* if($("#tarang-carousel_"+y).data("item-det") != undefined) {
        let det: any = $("#tarang-carousel_"+y).data("item-det").split("$");
        this.callSliderShow(this.items.length, det);   
        
      } */
      
      for(var y=0; y < this.items.length; y++)  {
        if(this.items[y]["catalog_list_items"]){
          this.det1 = this.items[y]["layout_type"]+"$"+this.items[y]["catalog_list_items"].length;
          var total_item_cnt =  this.items[y]["catalog_list_items"].length;
          var layout_type = this.items[y]["layout_type"];
          
          if(this.items[y]["layout_type"] == 't_16_9_big' || this.items[y]["layout_type"] == 't_16_9_small' ||
            this.items[y]["layout_type"] == 't_16_9_big_meta' || this.items[y]["layout_type"] == 't_16_9_livebanner' ||
            this.items[y]["layout_type"] == 't_16_9_big_without_meta') {
              this.moreLayout = 'hlayout';
            }
            if(this.items[y]["layout_type"] == 't_2_3_big_meta') {
              this.moreLayout = 'vlayout';
            }
            if(this.items[y]["layout_type"] == 't_16_9_right_meta') {
              this.moreLayout = 'metalayout';
            }

          this.items[y]['more_url'] = this.commonService.getListUrl(this.items[y]['home_link'], this.language);
          for(var z=0; z < this.items[y]['catalog_list_items'].length; z++) {
            
            this.items[y]['catalog_list_items'][z]["item_url"] = this.commonService.getItemURL(this.items[y]['catalog_list_items'][z]);          
            this.items[y]['catalog_list_items'][z]["image_url"] = this.commonService.getImageUrl(this.items[y]['catalog_list_items'][z], this.items[y]["layout_type"]);          
          }
        }
      }
 
      this.carouselStatus = true;
      this.loadingIndicator = false;    
      return this.det1;
      
      //this.commonService.getImageUrl()
  	},
  	(error: any) => {
      this.loadingIndicator = false;
      //console.log(error);
      this.errorStatus = true;
      this.statusMessage = error.server_error_messsage;    
  	}
  	);
  }

  carouselOptions2 = {
    loop:false,
    margin: 12,
    nav: true,
    dot: false,
    navSpeed: 1000,
    stagePadding: 50,
    navText: [
      '<span aria-label="' + 'Previous' + '"><img src="./assets/images/left_arrow.svg" alt="" title="" /></span>',
    '<span aria-label="' + 'Next' + '"><img src="./assets/images/right_arrow.svg" alt="" title="" /></span>',
    '<div class="carousel-shadow">&nbsp;</div>'
    ],
    responsiveClass: true,
    responsive: {
      0: {
        items: 1
      },
      576: {
        items: 2
      },
      768: {
        items: 3
      },
      992:{
        items: 4
      },
      1200: {
        items: 4        
      },
      1500: {
        items: 5,
        dot: false,
      }
    }
  }

  carouselOptions3 = {
    loop:false,
    margin: 12,
    nav: true,
    dot: false,
    navSpeed: 1000,
    stagePadding: 50,
    navText: [
      '<span aria-label="' + 'Previous' + '"><img src="./assets/images/left_arrow.svg" alt="" title="" /></span>',
    '<span aria-label="' + 'Next' + '"><img src="./assets/images/right_arrow.svg" alt="" title="" /></span>',
    '<div class="carousel-shadow">&nbsp;</div>'
    ],
    responsiveClass: true,
    responsive: {
      0: {
        items: 1
      },
      576: {
        items: 1
      },
      768: {
        items: 1
      },
      992:{
        items: 1
      },
      1200: {
        items: 2       
      },
      1500: {
        items: 2,
        dot: false,
      }
    }
  }
  
  carouselOptions4 = {
    loop:false,
    margin: 12,
    nav: true,
    dot: false,
    navSpeed: 1000,
    stagePadding: 50,
    navText: [
      '<span aria-label="' + 'Previous' + '"><img src="./assets/images/left_arrow.svg" alt="" title="" /></span>',
    '<span aria-label="' + 'Next' + '"><img src="./assets/images/right_arrow.svg" alt="" title="" /></span>',
    '<div class="carousel-shadow">&nbsp;</div>'
    ],
    responsiveClass: true,
    responsive: {
      0: {
        items: 2
      },
      576: {
        items: 3
      },
      768: {
        items: 4
      },
      992:{
        items: 5
      },
      1200: {
        items: 6        
      },
      1500: {
        items: 7,
        dot: false,
      }
    }
  }
  
  
}
