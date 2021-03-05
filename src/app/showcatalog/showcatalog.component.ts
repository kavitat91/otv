import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PageService } from '../shared/services/page.service';
import { CommonService } from '../shared/services/common.service';
import { Location } from "@angular/common";
@Component({
  selector: 'app-showcatalog',
  templateUrl: './showcatalog.component.html',
  styleUrls: ['./showcatalog.component.css']
})
export class ShowcatalogComponent implements OnInit {
  itemsList: any;
  loadingIndicator: boolean = false;
  statusMessage: any;
  errorStatus: boolean = false;
  desktopNav: boolean = false;
  mobileNav: boolean = false;
  contentHeight: number; 
  bannerSliderContent: any
  language: any;
  catalogItems: any;
  metaTitle: string;
  metaKeywords: string;
  layoutScheme: string;
  det1: any;
  moreUrl: string;
  catalogName: string;
  showName: string;
  moreLayout: string;
  sub: any; 
  page: string;

  constructor(private pageservice: PageService, private commonService: CommonService,     
    private router: Router, private route: ActivatedRoute, private location: Location) { 
      
      this.router.events.subscribe((ev) => {
        if (ev instanceof NavigationEnd) { /* Your code goes here on every router change */
          //console.log("ev"+ev);
          let a = location.path().split("/");      
          this.catalogName = a[1]; 
          /* if($("#showCat").val() == 'showCat') {
            this.showCatalog();
          } */
          this.sub = this.route.data
          .subscribe((page) =>{
            if(page['page'] == 'cataloglist' && a[2] != 'all' && a[1] != undefined) {              
              if(this.catalogName != 'livetv' && this.catalogName != 'plans' ) {
                this.showCatalog();
              }
            }
          }); 
        }
      });
    }

  ngOnInit() {    
    //let currentUrl = this.route.snapshot.url[0].path;
    //this.showCatalog();
    this.contentHeight = this.commonService.pageHeight() + 81; 
    if(window.outerWidth < 1200) {      
      this.mobileNav = true;
      console.log("mobileNav"+this.mobileNav);

    }
    else {
      this.desktopNav = true;
      console.log("mobileNav"+this.mobileNav);
    }
  }
  /* ngAfterViewInit() {
    this.showCatalog();
  } */

  carouselOptions = {
    loop:true,
    margin: 0,
    nav: false,
    dot: true,
    navSpeed: 1000,
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
        nav: true,
        loop: false
      },
      1500: {
        items: 1,
        stagePadding: 100,
        margin: 10,
        nav: true,
        loop: false
      }
    }
  }

  showCatalog() {
    this.loadingIndicator = true;
    this.language = localStorage.getItem('language');   
    this.pageservice.getCatloagContent(this.catalogName, this.language).subscribe(
      (resp) => {
        this.itemsList = resp["data"]["catalog_list_items"];
        this.bannerSliderContent = this.itemsList[0]['catalog_list_items'];  
        //this.itemsList = resp["data"]["catalog_list_items"];
        //this.bannerSliderContent = this.itemsList;      
        for(var x=0; x < this.bannerSliderContent.length; x++)  {
          this.bannerSliderContent[x]["item_url"] = this.commonService.getItemURL(this.bannerSliderContent[x]);          
        }
        this.catalogItems = this.itemsList.slice(1, this.itemsList.length);
        //console.log("this.catalogItems"+this.catalogItems);

        this.metaTitle = resp["data"]["display_title"]
        this.metaKeywords = ""
        this.layoutScheme = resp["data"]["layout_scheme"]

        for(var y=0; y < this.catalogItems.length; y++) {
          this.det1 = this.catalogItems[y]["layout_type"]+"$"+this.catalogItems[y]["catalog_list_items"].length;
          if(this.catalogItems[y]["layout_type"] == 't_16_9_big' || this.catalogItems[y]["layout_type"] == 't_16_9_small' ||
          this.catalogItems[y]["layout_type"] == 't_16_9_big_meta' || this.catalogItems[y]["layout_type"] == 't_16_9_livebanner' ||
          this.catalogItems[y]["layout_type"] == 't_16_9_big_without_meta') {
            this.moreLayout = 'hlayout';
          }
          if(this.catalogItems[y]["layout_type"] == 't_2_3_big_meta') {
            this.moreLayout = 'vlayout';
          }
          if(this.catalogItems[y]["layout_type"] == 't_16_9_right_meta') {
            this.moreLayout = 'metalayout';
          }
          this.catalogItems[y]['more_url'] = this.commonService.getListAllUrl(this.catalogItems[y]['home_link'], this.language);
          for(var z=0; z < this.catalogItems[y]['catalog_list_items'].length; z++) {
            this.catalogItems[y]['catalog_list_items'][z]["item_url"] = this.commonService.getItemURL(this.catalogItems[y]['catalog_list_items'][z]);          
            this.catalogItems[y]['catalog_list_items'][z]["image_url"] = this.commonService.getImageUrl(this.catalogItems[y]['catalog_list_items'][z], this.catalogItems[y]["layout_type"]);          
          }
        }
        this.loadingIndicator = false;
        return this.det1;
        
      },
      (error) => {
        console.log(error);
        this.errorStatus = true;
        this.loadingIndicator = false;
        this.statusMessage = error.server_error_messsage;
      }
    )
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
