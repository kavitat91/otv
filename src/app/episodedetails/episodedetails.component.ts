import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PageService } from '../shared/services/page.service';
import { UserService } from '../shared/services/user.service';
import { CommonService } from '../shared/services/common.service';
import { Location } from "@angular/common";
import { globals } from '../globals/globals';
import { VideopopupComponent } from './../videopopup/videopopup.component';

@Component({
  selector: 'app-episodedetails',
  templateUrl: './episodedetails.component.html',
  styleUrls: ['./episodedetails.component.css']
})
export class EpisodedetailsComponent implements OnInit {
  loadingIndicator: boolean = false;
  language: string;
  layoutScheme: any;
  episodeDetails: any;
  allEpisodes: any;
  allEpisodesFirst: any;
  contentId: any;
  videoPreview: any;
  new_play_url: any;
  key: string;
  other_items: any;
  catalog_name: any;
  tvshow_name: any;
  theme_type: string;
  desc_show_more_icon: boolean = false;
  desc_show_less_icon: boolean = false;
  desktopNav: boolean = false;
  mobileNav: boolean = false;
  full_desc: boolean = false;
  short_desc: boolean = false;
  seasons: any;
  watchLaterPop: boolean = false;
  watchLaterRemovePop: boolean = false;
  copyLinkPop: boolean = false;
  
  shareEnable: boolean = false;
  catalogName: string;
  showName: string;
  itemName: string;
  layoutType: any;
  theme: string;
  themeType: string;
  videoLoginCheck: any;
  videoPremiumCheck: any;
  appShareUrl: string;
  catalogId: string;
  application: string;
  itemCategory: string;
  language1: string;
  genre: string;
  titleCategory: string;
  videoDuration: string;
  title: string;
  userState: string;
  userPeriod: string;
  userPlanType: string;
  userPlan: string;
  analyticUserId: string;
  sessionId: string;
  playlistid: string;
  fbKey: number;
  site: string;
  displayPopStatus: string = 'none'; 
  selectedPop: string;
  videoURL: string;
  signed_url: any;
  contentHeight: number;

  @ViewChild(VideopopupComponent, {static: false}) child: VideopopupComponent; 

  constructor(private pageService: PageService, private commonService: CommonService, private userService: UserService,
    private router: Router, private route: ActivatedRoute, location: Location) { 
    
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) { /* Your code goes here on every router change */
        let a = location.path().split("/");      
        this.catalogName = a[1]; 
        this.showName = a[2]; 
        this.itemName = a[3]; 
        this.getEpisodeDetails();
      }
    });
  }

  ngOnInit() {
    this.short_desc = true;
    this.desc_show_more_icon = true;   
    this.sessionId = localStorage.getItem('otv_user_id');
    this.fbKey = globals.FACEBOOK_APP_KEY; 
    this.site = globals.site;
    this.contentHeight = this.commonService.pageHeight() + 81;        
    localStorage.removeItem('otv_user_sub_status');
    localStorage.removeItem('otv_user_played_time');
    localStorage.removeItem('loginPop');
    if(window.outerWidth < 1200) {
      this.mobileNav = true;
      console.log("mobileNav"+this.mobileNav);

    }
    else {
      this.desktopNav = true;
      console.log("mobileNav"+this.mobileNav);
    }  
    
    //this.getEpisodeDetails();
    
  }
  getEpisodeDetails() {
    this.loadingIndicator = true;
    this.language = localStorage.getItem('language');
  	this.pageService.getEpisodeDetails(this.language, this.catalogName, this.showName, this.itemName).subscribe(
  	(response) => {
      
        this.episodeDetails = response["data"];
        this.contentId = this.episodeDetails["content_id"];
        this.videoPreview = this.episodeDetails["preview"];
        this.appShareUrl = this.episodeDetails['internal_share_url'].split("?")[1];
        this.catalogId = this.episodeDetails['catalog_id'];
        
        this.application = "Tarangplus-web";
        this.language1 = this.episodeDetails['language'];
        this.itemCategory = "NA";
        this.genre = this.episodeDetails['genres'][0];
        this.contentId = this.episodeDetails['content_id'];
        this.titleCategory = this.episodeDetails['title']+"|"+this.episodeDetails['content_id']+"|"+this.episodeDetails['catalog_object']['plan_category_type']+"|"+this.episodeDetails['language']+"|"+this.episodeDetails['genres'][0].capitalize+"|"+"episode";
        this.videoDuration = this.episodeDetails['duration_string'];
        this.title = this.episodeDetails['title'];
        this.userState = "Ananymous";
        this.userPeriod  = "NA";
        this.userPlanType = "NA";
        this.userPlan = "NA";
        this.analyticUserId = "NA";
        /* this.new_play_url = this.commonService.getPlayUrlKey(this.episodeDetails);
        console.log("this.new_play_url"+this.new_play_url); */
        this.videoURL = "/odiyatv_player/demo/embed.html?contenturl=kDsOUyP4l17bDz3kIA6Yp73j8DMg1SdVQClYjWdIsl+LNJtj3tF+VxAxChyEI+17ioXdV+FaX8kmTLTNXIcTJJhV+gYbwcD5dqhOsPGgvTaHaaYfB2c760y5ZnHpby5Y|key=cOfRBBPaW2kIZQWQ6NiFbw==|image="+this.episodeDetails['thumbnails']['xl_image_16_9']['url']+"|title="+this.title+"|theme_type=movie|channel_logo=|catalog_id="+this.catalogId+"|content_id="+this.contentId+"|genre=crime|language=hindi|category=bollywood classic|preview_avail=false|is_premium=false|pre_role_ad="+this.episodeDetails['access_control']['pre_role_settings']['mobile_ads_url']+"|mid_role_ad="+this.episodeDetails['access_control']['mid_role_settings']['mobile_ads_url']+"|mid_role_pos="+this.episodeDetails['access_control']['mid_role_settings']['midroll_position'].join("$");
        

        this.pageService.getCatalogDetails(this.language, this.catalogName).subscribe(
          (catResponse) => {
            this.other_items = catResponse["data"]["items"];
            this.catalog_name = catResponse["data"]["name"];
            this.tvshow_name = response["data"]["show_name"];
            this.layoutType = catResponse["data"]["catalog_object"]["layout_type"];
            this.theme = "episode";
            this.theme_type = "episode";
            for(var x=0; x < this.other_items.length; x++) {
              this.other_items[x]['itemUrl'] = this.commonService.getItemURL(this.other_items[x]);
            }
          },
          (error) => {
            console.log(error);
          }
        )
        this.pageService.getAllEpisodes(this.language, this.catalogName, this.showName).subscribe(
          (tvshow_response) => {
            this.allEpisodes = tvshow_response["data"]["items"];
            this.allEpisodesFirst = this.allEpisodes[1];
            if(this.allEpisodes.length > 0) {
              //this.contentId = this.allEpisodes.first['content_id']
              //this.new_play_url = this.get_play_url_key(this.allEpisodes.first)
              //this.key =  this.get_play_url_key(this.allEpisodes.first)
            }
            else {
              this.new_play_url = "";
              this.key = "";
              //this.contentId = tvshow_response["data"]["content_id"]
            }           

            if(response["data"].hasOwnProperty("subcategory_flag") && response["data"]["subcategory_flag"] == "yes") {
              this.seasons = response["data"]["subcategories"];
            }
            else {
              this.seasons = [];
            }
          },
          (error) => {
            console.log(error);
          } 
        )
        this.videoLoginCheck = response["data"]["access_control"]["login_required"]
        this.videoPremiumCheck = response["data"]["access_control"]["is_free"];        
        this.loadingIndicator = false;
    },
    (error) => {
      console.log(error);
      this.loadingIndicator = false;
    }
    );
  }
  showVideoPop() {
    this.child.showVideoPopChild();  
  }

  addWatchLater() {
    var watchlaterParams = {};
    watchlaterParams["listitem"] = {};
    watchlaterParams["listitem"]["catalog_id"] = this.catalogId;
    watchlaterParams["listitem"]["content_id"] = this.contentId;
    watchlaterParams["listitem"]["playlist_id"] = "";
    console.log("this.playlistid"+this.playlistid);
    if(this.playlistid && this.playlistid.length != 0) {
      this.userService.removeWatchlist(this.sessionId, this.playlistid).subscribe(
        (res) => {
          if(this.playlistid.length != 0){
            this.playlistid = '';
            $(".watch_later_icon").attr("src","/assets/images/watchlater_add.svg");
            this.watchLaterPop = false;
            this.watchLaterRemovePop = true;
            setTimeout(function() {
              this.watchLaterPop = false;
              this.watchLaterRemovePop = false;
            }.bind(this), 1200);                     
          }
          
        },
        (error) => {
          console.log(error);
        }
      );
    }
    else {
      this.userService.addWatchLater(this.sessionId, watchlaterParams).subscribe(
        (res) => {
          this.playlistid = res["data"][0]["listitem_id"];
          $(".watch_later_icon").attr("src","/assets/images/watchlater_added.svg");
          this.watchLaterRemovePop = false;
          this.watchLaterPop = true;     
          setTimeout(function() {
            this.watchLaterRemovePop = false;
            this.watchLaterPop = false;            
          }.bind(this), 1200);        
        },
        (error) => {
          console.log(error);
        }
      );
   
    }
  }
  
  shareToggleVideo() {
    this.shareEnable = !this.shareEnable;
  }
  closeShareVideo() {
    this.shareEnable = false;
  }
  
  copyLink(id: string) {
    var statu = this.commonService.copyVideoURL(id);
    this.shareEnable = false;
    if(statu == true) {
      this.copyLinkPop = true;
      setTimeout(function() {
        this.copyLinkPop = false;
      }.bind(this), 1500)
    }
    
  }
  
  readMore() {
    this.desc_show_more_icon = false;
    this.desc_show_less_icon = true; 
    this.full_desc = true;
    this.short_desc = false;    
  }

  readLess() {
    this.desc_show_less_icon = false; 
    this.desc_show_more_icon = true;    
    this.full_desc = false;
    this.short_desc = true;    
  }
  carouselOptions2 = {
    loop:false,
    margin: 12,
    nav: true,
    dot: false,
    navSpeed: 1000,
    stagePadding: 50,
    navText: [
      '<span aria-label="' + 'Previous' + '"><img src="/assets/images/left_arrow.svg" alt="" title="" /></span>',
    '<span aria-label="' + 'Next' + '"><img src="/assets/images/right_arrow.svg" alt="" title="" /></span>',
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
