import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageService } from '../shared/services/page.service';
import { CommonService } from '../shared/services/common.service';

@Component({
  selector: 'app-livetv',
  templateUrl: './livetv.component.html',
  styleUrls: ['./livetv.component.css']
})
export class LivetvComponent implements OnInit {
  contentHeight: number;
  contentHeight1: number;
  statusMessage: any;
  errorStatus: boolean = false;
  loadingIndicator: boolean = false;
  liveTVData: any;
  bannerContents: any;
  otherContents: any;
  language: any;
  sub: any;
  page: any;
  desktopNav: boolean = false;
  mobileNav: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private commonService: CommonService,
    private pageService: PageService) { }

  ngOnInit() {
    this.getLiveTVContent();
    this.contentHeight = this.commonService.pageHeight() + 81;
 
    this.sub = this.route.data
    .subscribe((page) =>{
      if(page['page'] == 'livetv') {
        this.page = "livetv";        
      }
      else if(page['page'] == 'channels') {
        this.page = "channels";        
      } 
    }); 
    if(window.outerWidth < 1200) {
      this.mobileNav = true;
      //console.log("mobileNav"+this.mobileNav);

    }
    else {
      this.desktopNav = true;
      //console.log("mobileNav"+this.mobileNav);
    }     
  }

  getLiveTVContent() {
    this.loadingIndicator = true;
    this.language = localStorage.getItem('language');
    this.pageService.getLiveTVContent(this.language).subscribe(
      (resp) => {
        this.loadingIndicator = false;
        this.liveTVData = resp["data"]["catalog_list_items"]; 
        this.bannerContents = this.liveTVData[0]['catalog_list_items'];
        this.otherContents = this.liveTVData[1]['catalog_list_items'];             
        for(var x=0; x < this.bannerContents.length; x++)  {
          this.bannerContents[x]["itemUrl"] = this.commonService.getItemURL(this.bannerContents[x]);                    
        }   
        for(var y=0; y < this.otherContents.length; y++)  {
          this.otherContents[y]["itemUrl"] = this.commonService.getItemURL(this.otherContents[y]);                              
        } 
        
      },
      (error: any) => {
        this.loadingIndicator = false;
        console.log(error);
        this.statusMessage = error.server_error_messsage;
      }
    )
  }

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
        loop: false
      },
      1500: {
        items: 1,
        loop: false
      }
    }
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
      0:{
			  items:1
		  },
		  576:{
			  items:2
		  },
		  992:{
        items: 4
      },
      1200: {
        items: 4        
      },
      1500: {
        items: 4,
        dot: false,
      }
    }
  }
  
}
