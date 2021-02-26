import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';
import { PageService } from '../shared/services/page.service';
import { UserService } from '../shared/services/user.service';
import { CommonService } from '../shared/services/common.service';
import { SEOService } from '../shared/services/seo.service';
import { Location } from "@angular/common";
import { globals } from '../globals/globals';
import { VideopopupComponent } from './../videopopup/videopopup.component';

@Component({
  selector: 'app-itemdetails',
  templateUrl: './itemdetails.component.html',
  styleUrls: ['./itemdetails.component.css']
})
export class ItemdetailsComponent implements OnInit {
  loadingIndicator: boolean = false;
  language: string;
  layoutScheme: any;
  itemDetails: any;
  allEpisodes: any;
  allEpisodesFirst: any;
  contentId: any;
  new_play_url: any;
  key: string;
  other_items: any;
  catalog_name: any;
  tvshow_name: any;
  theme_type: string;
  desc_show_more_icon: boolean = false;
  desc_show_less_icon: boolean = false;
  full_desc: boolean = false;
  short_desc: boolean = false;
  seasons: any;
  watchLaterPop: boolean = false;
  watchLaterRemovePop: boolean = false;
  shareEnable: boolean = false;
  copyLinkPop: boolean = false;
  catalogName: string;
  showName: string;
  theme: string;
  channels_response: any;
  more_item_response: any;
  genre_items: any;
  genre_layout_type: any;
  associated_video_resp: any
  associated_videos: any;
  videoLoginCheck: any;
  videoPremiumCheck: any;
  errorStatus: boolean = false;
  all_channel_items: any;
  desktopNav: boolean = false;
  mobileNav: boolean = false;
  videoPreview: any;
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
  contentHeight: number;
  addToFavouritesList: boolean = false;
  removeFromFavourites: boolean = false;
  showContentId: string;

  @ViewChild(VideopopupComponent, {static: false}) child: VideopopupComponent; 

  constructor(private pageService: PageService, private commonService: CommonService, private userService: UserService,
    private router: Router, private route: ActivatedRoute, location: Location, private titleService: Title, private metaService: Meta,
    private seoService: SEOService
    ) { 
    
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) { /* Your code goes here on every router change */
        let a = location.path().split("/");      
        this.catalogName = a[1]; 
        this.showName = a[2]; 
        this.getItemDetails();
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

    if(window.outerWidth < 1200) {
      this.mobileNav = true;
      console.log("mobileNav"+this.mobileNav);

    }
    else {
      this.desktopNav = true;
      console.log("mobileNav"+this.mobileNav);
    }         
  }
  
  getItemDetails() {
    console.log("1111111")
    this.loadingIndicator = true;
    this.language = localStorage.getItem('language');
  	this.pageService.getItemDetails(this.language, this.catalogName, this.showName).subscribe(
  	(response) => {
      /* this.router.events.subscribe((ev) => {
        this.seoService.updateTitle(response['title']);
          this.seoService.updateKeywords(response['keywords']);
          this.seoService.updateDescription(response['description'])
        if (ev instanceof NavigationEnd) { 
          
        }
  
      });  */

      this.loadingIndicator = false;
      if(response["data"].hasOwnProperty("episode_flag")) {
        
        this.layoutScheme = response["data"]["catalog_object"]["layout_scheme"]
        this.itemDetails = response["data"]
        this.theme = this.itemDetails["theme"];
        this.showContentId = this.itemDetails["content_id"];
        this.contentId = this.itemDetails["content_id"];
        this.videoPreview = this.itemDetails["preview"];
        this.appShareUrl = this.itemDetails['internal_share_url'].split("?")[1];
        this.catalogId = this.itemDetails['catalog_id'];
        this.application = "Tarangplus-web";
        this.language1 = this.itemDetails['language'];
        this.itemCategory = "NA";
        this.genre = this.itemDetails['genres'][0];
        //this.contentId = this.itemDetails['content_id'];
        this.titleCategory = this.itemDetails['title']+"|"+this.itemDetails['content_id']+"|"+this.itemDetails['catalog_object']['plan_category_type']+"|"+this.itemDetails['language']+"|"+this.itemDetails['genres'][0]+"|"+"episode";
        this.videoDuration = this.itemDetails['duration_string'];
        this.title = this.itemDetails['title'];
        this.userState = "Ananymous";
        this.userPeriod  = "NA";
        this.userPlanType = "NA";
        this.userPlan = "NA";
        this.analyticUserId = "NA";
        this.loadingIndicator = true;
        
        this.pageService.getCatalogDetails(this.language, this.catalogName).subscribe(
          (catResponse) => {
            this.loadingIndicator = false;
            this.other_items = catResponse["data"]["items"];
            this.catalog_name = catResponse["data"]["name"];
            this.tvshow_name = response["data"]["title"];
            this.theme_type = "show"
            for(var x=0; x < this.other_items.length; x++) {
              this.other_items[x]['itemUrl'] = this.commonService.getItemURL(this.other_items[x]);
            }
          },
          (error) => {
            console.log(error);
            this.errorStatus = true;
          }
        )
        this.loadingIndicator = true;
        this.pageService.getAllEpisodes(this.language, this.catalogName, this.showName).subscribe(
          (tvshow_response) => {
            console.log("this.videoLoginCheck")
            this.loadingIndicator = false;
            this.allEpisodes = tvshow_response["data"]["items"];
            this.allEpisodesFirst = this.allEpisodes[1];
            if(this.allEpisodes.length > 0) {
              // dynamic video url 
              this.contentId = this.allEpisodes[0]['content_id']
              this.new_play_url = this.commonService.getPlayUrlKey(this.allEpisodes[0]);
              this.key =  this.new_play_url; 
              this.videoLoginCheck = this.allEpisodesFirst["access_control"]["login_required"]; 
              //console.log("this.videoLoginCheck"+this.videoLoginCheck);
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
            this.errorStatus = true;
          } 
        )
      } 
      else {
        console.log("abx");
        this.itemDetails = response['data'] 
        this.theme = response["data"]["theme"]
        this.theme_type =  this.theme;
        
        this.loadingIndicator = true;

        if(this.theme == "live") {
          this.pageService.getLiveTVContent(this.language).subscribe(
            (channels_response1) => {
              this.loadingIndicator = false;
              this.all_channel_items = channels_response1["data"]["catalog_list_items"][1]["catalog_list_items"];    
              console.log("this.all_channel_items"+this.all_channel_items);
              for(var x=0; x < this.all_channel_items.length; x++) {
                this.all_channel_items[x]['itemUrl'] = this.commonService.getItemURL(this.all_channel_items[x]);
              }
            },
            (error) => {
              console.log(error);
              this.loadingIndicator = false;
              this.errorStatus = true;
            }
          )
        }
          
        else {
          this.loadingIndicator = true;
          this.more_item_response = this.pageService.getItemGenre(this.language, this.catalogName, this.itemDetails['genres'][0]).subscribe(
            (more_item_response1) => {
              this.loadingIndicator = false;
              this.genre_items = more_item_response1['data']['items'];
              console.log("this.genre_items"+this.genre_items);
              this.genre_layout_type = this.itemDetails['catalog_object']['layout_type'].toString();
              for(var x=0; x < this.genre_items.length; x++) {
                this.genre_items[x]['itemUrl'] = this.commonService.getItemURL(this.genre_items[x]);
              }
            },
            (error) => {
              console.log(error);
              this.loadingIndicator = false;
              this.errorStatus = true;
            }
          ) 
                
        }
        if(this.itemDetails.hasOwnProperty("associated_videos") && this.itemDetails["associated_videos"] == true) {
          this.loadingIndicator = true;
          this.associated_video_resp = this.pageService.getAssociatedVideos(this.language, this.catalogName, this.itemDetails['friendly_id']).subscribe(
            (associated_video_resp1) => {
              this.loadingIndicator = false;
              this.associated_videos = associated_video_resp1["data"]["items"]
            },
            (error) => {
              console.log(error);
              this.loadingIndicator = false;
              this.errorStatus = true;
            }
          )
        }  
        else {
          this.associated_videos = [];
        }
        this.videoLoginCheck = response["data"]["access_control"]["login_required"];
        this.videoPremiumCheck = response["data"]["access_control"]["is_free"];     
      }
      this.videoURL = "https://instaott-videos.s3-ap-southeast-1.amazonaws.com/asianet_player/demo/embed.html?contenturl=kDsOUyP4l17bDz3kIA6Yp73j8DMg1SdVQClYjWdIsl+LNJtj3tF+VxAxChyEI+17ioXdV+FaX8kmTLTNXIcTJJhV+gYbwcD5dqhOsPGgvTaHaaYfB2c760y5ZnHpby5Y|key="+ +"==|image="+this.itemDetails['thumbnails']['large_16_9']['url']+"|title="+this.itemDetails['title']+"|theme_type="+this.theme_type+"|channel_logo=|catalog_id="+this.itemDetails['catalog_id']+"|content_id="+this.itemDetails['content_id']+"|genre=crime|language=hindi|category=bollywood classic|preview_avail=false|is_premium=false|pre_role_ad="+this.itemDetails['access_control']['pre_role_settings']['mobile_ads_url']+"|mid_role_ad="+this.itemDetails['access_control']['mid_role_settings']['mobile_ads_url']+"|mid_role_pos="+this.itemDetails['access_control']['mid_role_settings']['midroll_position'];
      
      console.log("this.videoLoginCheck"+this.videoLoginCheck+"this.videoPremiumCheck"+this.videoPremiumCheck); 
    },  
    (error) => {
      console.log(error);
    }
    );
  }

  showVideoPop() {
    this.child.showVideoPopChild(); 
  }
  closePop() {
    this.displayPopStatus = 'none';   
  }

  addToFavourites(){
    var favouritesParams = {};
    favouritesParams["listitem"] = {};
    favouritesParams["listitem"]["catalog_id"] = this.catalogId;
    favouritesParams["listitem"]["content_id"] = this.showContentId;
    this.userService.addToFavourites(this.sessionId, favouritesParams).subscribe(
      (res) => {
        this.addToFavouritesList = true;
        this.removeFromFavourites = true;
        setTimeout(function(){
          this.addToFavouritesList = false;
          this.removeFromFavourites = false;
        }.bind(this), 1200);
      }, 
      (error) => {
        console.log(error);
      }
    )
  }

  addWatchLater() {
    var watchlaterParams = {};
    watchlaterParams["listitem"] = {};
    watchlaterParams["listitem"]["catalog_id"] = this.catalogId;
    watchlaterParams["listitem"]["content_id"] = this.showContentId;
    watchlaterParams["listitem"]["playlist_id"] = "";
    console.log("this.playlistid"+this.playlistid);
    if(this.playlistid && this.playlistid.length != 0) {
      this.userService.removeWatchlist(this.sessionId, this.playlistid).subscribe(
        (res) => {
          if(this.playlistid.length != 0){
            this.playlistid = '';
            $(".watch_later_icon").attr("src","./assets/images/watchlater_add.svg");
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
          
          $(".watch_later_icon").attr("src","./assets/images/watchlater_added.svg");
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
        items: 4,
        dot: false,
      }
    }
  }
}
/* $(document).ready(function() {	
  var OtvIframeVideo = $('#otvIframeVideo');
  var video_playClass = $('.video_play');
  var otv_video_player_close_btn = $('#otv_video_player_close_btn');
  var desktop_otv_player = $('#desktop_otv_player');
  $(video_playClass).on("click", function(){
        OtvIframeVideo.html('<iframe src="/odiyatv_player/demo/embed.html?contenturl=<%=@new_play_url%>|key=<%=@key%>|image=<%=@episode_details['thumbnails']['large_16_9']['url']%>|title=<%=@episode_details['title']%>|theme_type=movie|channel_logo=|catalog_id=<%=@episode_details['catalog_id']%>|content_id=<%=@episode_details['content_id']%>|genre=crime|language=hindi|category=bollywood classic|preview_avail=false|is_premium=false|pre_role_ad=<%=@episode_details['access_control']['pre_role_settings']['mobile_ads_url']%>|mid_role_ad=<%=@episode_details['access_control']['mid_role_settings']['mobile_ads_url']%>|mid_role_pos=<%=@episode_details['access_control']['mid_role_settings']['midroll_position'].join("$") if @episode_details['access_control']['mid_role_settings'].has_key?("midroll_position") && @episode_details['access_control']['mid_role_settings']["midroll_position"].length > 0%>" width="1000" height="500"></iframe>')
});

$(otv_video_player_close_btn).on("click", function(){
          OtvIframeVideo.find('iframe').remove();
});
}); */