import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PageService } from '../shared/services/page.service';
import { CommonService } from '../shared/services/common.service';
import { Location } from "@angular/common";

@Component({
  selector: 'app-all-episodes',
  templateUrl: './all-episodes.component.html',
  styleUrls: ['./all-episodes.component.css']
})
export class AllEpisodesComponent implements OnInit {
  loadingIndicator: boolean = false;
  language: string;
  layoutScheme: any;
  episodeDetails: any;
  imageUrl: string;
  allEpisodes: any;
  allEpisodesFirst: any;
  contentId: any;
  new_play_url: any;
  key: string;
  other_items: any;
  catalog_name: any;
  tvshow_name: any;
  theme_type: string;
  seasons: any;
  watchLaterPop: boolean = false;
  watchLaterRemovePop: boolean = false;
  copyLinkPop: boolean = false;
  catalogName: string;
  showName: string;
  constructor(private pageService: PageService, private commonService: CommonService, private router: Router, private route: ActivatedRoute, location: Location) {     
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) { /* Your code goes here on every router change */
        let a = location.path().split("/");      
        this.catalogName = a[1]; 
        this.showName = a[2]; 
        
        /* if($("#itemDetails").val() == 'itemDetails') {
          this.getEpisodeDetails();
        }      */           
      }
    });
  }
  ngOnInit() {
    this.getAllEpisodes();
  }

  getAllEpisodes() {
    this.loadingIndicator = true;
    this.language = localStorage.getItem('language');
    this.pageService.getAllEpisodes(this.language, this.catalogName, this.showName).subscribe(
      (tvshow_response) => {
        this.allEpisodes = tvshow_response["data"]["items"];
        console.log("this.allEpisodes"+this.allEpisodes);
      },
      (error) => {
        console.log(error);
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
  
}
