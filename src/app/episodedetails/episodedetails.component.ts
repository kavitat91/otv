import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PageService } from '../shared/services/page.service';
import { UserService } from '../shared/services/user.service';
import { CommonService } from '../shared/services/common.service';
import { Location } from "@angular/common";
import { globals } from '../globals/globals';
import { VideopopupComponent } from './../videopopup/videopopup.component';
import { BroadcastService } from '../shared/services/broadcast.service';

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
  addToFavouritesList: boolean = false;
  removeFromFavourites: boolean = false;
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
  tvShowContentId: string;
  addedToFavouritesIcon: boolean = false;
  deleteWatchlist:boolean = false
  showContentId: string;
  favouritesList: any;
  currentItem_listitem_id: string;
  favourite_list_items: any = [];

  @ViewChild(VideopopupComponent, {static: false}) child: VideopopupComponent; 
  @Output() fireLogin = new EventEmitter<any>();
  @Output() fireWatchLogin = new EventEmitter<any>();

  constructor(private pageService: PageService, private commonService: CommonService, private userService: UserService,
    private router: Router, private route: ActivatedRoute, location: Location,
    private broadcastService: BroadcastService) { 
    
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) { /* Your code goes here on every router change */
        console.log(location.path());
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
    this.favouritesList = JSON.parse(localStorage.getItem('favouritesList'));
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
    //this.videoURL = "https://www.tarangplus.in/odiyatv_player/demo/embed.html?contenturl=ydUll0+UkrHTPrZCQ56A0P/E+JM3zdCJwgnp59m48R4yP4CkZCwmtn0mDVfOmagNfLk7QltalupeD6nYr971XSLDKRzbVCSY+6SzDFj4m2ALP6/PfYuwxS4N9hq7HC6J|key=uFNtbotlPCR7OlKdbtdaSg==|image=https://d18yh0jkm7grap.cloudfront.net/images/Agyan-Mind-Kale-Ki/5eb264b219521d5da6000013/large_16_9/1589262111.jpg?1589262111|title=Agyan%20Mind%20Kale%20Ki|theme_type=movie|channel_logo=|catalog_id=5d6789edbabd8163a0000016|content_id=5eb264bc3326af455e000090|genre=crime|language=hindi|category=bollywood%20classic|preview_avail=false|is_premium=false|pre_role_ad=https://pubads.g.doubleclick.net/gampad/ads?sz=640x360&iu=/6062/iab_vast_samples/skippable&ciu_szs=300x250,728x90&impl=s&gdfp_req=1&env=vp&output=xml_vast2&unviewed_position_start=1&url=[referrer_url]&correlator=[timestamp]|mid_role_ad=http://adex.adchakra.net/KIRTI/openx-2.8.9/www/delivery/fc.php?script=bannerTypeHtml:vastInlineBannerTypeHtml:vastInlineHtml&zones=pre-roll:0.0-0=1&nz=1&source=&r=1234&block=1&format=vast&charset=UTF-8&version=3.0|mid_role_pos="; 
    //this.videoURL = "http://instaott-videos.s3-ap-southeast-1.amazonaws.com/asianet_player/demo/embed.html?contenturl=kDsOUyP4l17bDz3kIA6Yp73j8DMg1SdVQClYjWdIsl+LNJtj3tF+VxAxChyEI+17ioXdV+FaX8kmTLTNXIcTJJhV+gYbwcD5dqhOsPGgvTaHaaYfB2c760y5ZnHpby5Y|key=cOfRBBPaW2kIZQWQ6NiFbw==|image="+this.episodeDetails['thumbnails']['xl_image_16_9']['url']+"|title="+this.title+"|theme_type=movie|channel_logo=|catalog_id="+this.catalogId+"|content_id="+this.contentId+"|genre=crime|language=hindi|category=bollywood classic|preview_avail=false|is_premium=false|pre_role_ad="+this.episodeDetails['access_control']['pre_role_settings']['mobile_ads_url']+"|mid_role_ad="+this.episodeDetails['access_control']['mid_role_settings']['mobile_ads_url']+"|mid_role_pos="+this.episodeDetails['access_control']['mid_role_settings']['midroll_position'].join("$")+"|app_user_id=";
  	this.pageService.getEpisodeDetails(this.language, this.catalogName, this.showName, this.itemName).subscribe(
  	(response) => {  
        this.episodeDetails = response["data"];
        this.contentId = this.episodeDetails["content_id"];
        this.videoPreview = this.episodeDetails["preview"];
        this.appShareUrl = this.episodeDetails['internal_share_url'].split("?")[1];
        this.catalogId = this.episodeDetails['catalog_id'];
        this.tvShowContentId = response.data.content_id;
        this.currentItem_listitem_id = response.data.listitem_id;
        
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
        let favList = JSON.parse(localStorage.getItem('favouritesList'));
        for(let i=0; i<favList.length; i++){
          if(favList[i].content_id == this.tvShowContentId){
            this.addedToFavouritesIcon = true;
          //  this.currentItem_listitem_id = favList[i].listitem_id;
            break;
          } 
        }
        /* this.new_play_url = this.commonService.getPlayUrlKey(this.episodeDetails);
        console.log("this.new_play_url"+this.new_play_url); */
        //this.videoURL = "https://www.tarangplus.in/odiyatv_player/demo/embed.html?contenturl=ydUll0+UkrHTPrZCQ56A0P/E+JM3zdCJwgnp59m48R4yP4CkZCwmtn0mDVfOmagNfLk7QltalupeD6nYr971XSLDKRzbVCSY+6SzDFj4m2ALP6/PfYuwxS4N9hq7HC6J|key=uFNtbotlPCR7OlKdbtdaSg==|image=https://d18yh0jkm7grap.cloudfront.net/images/Agyan-Mind-Kale-Ki/5eb264b219521d5da6000013/large_16_9/1589262111.jpg?1589262111|title=Agyan%20Mind%20Kale%20Ki|theme_type=movie|channel_logo=|catalog_id=5d6789edbabd8163a0000016|content_id=5eb264bc3326af455e000090|genre=crime|language=hindi|category=bollywood%20classic|preview_avail=false|is_premium=false|pre_role_ad=https://pubads.g.doubleclick.net/gampad/ads?sz=640x360&iu=/6062/iab_vast_samples/skippable&ciu_szs=300x250,728x90&impl=s&gdfp_req=1&env=vp&output=xml_vast2&unviewed_position_start=1&url=[referrer_url]&correlator=[timestamp]|mid_role_ad=http://adex.adchakra.net/KIRTI/openx-2.8.9/www/delivery/fc.php?script=bannerTypeHtml:vastInlineBannerTypeHtml:vastInlineHtml&zones=pre-roll:0.0-0=1&nz=1&source=&r=1234&block=1&format=vast&charset=UTF-8&version=3.0|mid_role_pos=";
        //workaroud 
        //this.videoURL = "http://instaott-videos.s3-ap-southeast-1.amazonaws.com/asianet_player/demo/embed.html?contenturl=kDsOUyP4l17bDz3kIA6Yp73j8DMg1SdVQClYjWdIsl+LNJtj3tF+VxAxChyEI+17ioXdV+FaX8kmTLTNXIcTJJhV+gYbwcD5dqhOsPGgvTaHaaYfB2c760y5ZnHpby5Y|key=cOfRBBPaW2kIZQWQ6NiFbw==|image="+this.episodeDetails['thumbnails']['xl_image_16_9']['url']+"|title="+this.title+"|theme_type=movie|channel_logo=|catalog_id="+this.catalogId+"|content_id="+this.contentId+"|genre=crime|language=hindi|category=bollywood classic|preview_avail=false|is_premium=false|pre_role_ad="+this.episodeDetails['access_control']['pre_role_settings']['mobile_ads_url']+"|mid_role_ad="+this.episodeDetails['access_control']['mid_role_settings']['mobile_ads_url']+"|mid_role_pos="+this.episodeDetails['access_control']['mid_role_settings']['midroll_position'].join("$")+"|app_user_id="; 
        this.videoURL ="https://www.tarangplus.in/odiyatv_player/demo/embed.html?contenturl=kDsOUyP4l17bDz3kIA6Yp73j8DMg1SdVQClYjWdIsl+LNJtj3tF+VxAxChyEI+17ioXdV+FaX8kmTLTNXIcTJJhV+gYbwcD5dqhOsPGgvTaHaaYfB2c760y5ZnHpby5Y|key=cOfRBBPaW2kIZQWQ6NiFbw==|image=https://d18yh0jkm7grap.cloudfront.net/images/Puni-Gadbad-%7C-Ep-296/5e73746719521d2685000012/xl_image_16_9/1584624792.jpg?1584624792|title=Puni%20Gadbad%20|%20Ep-296|theme_type=movie|channel_logo=|catalog_id=5d6789edbabd8163a0000016|content_id=5e737472babd8136e9000089|genre=crime|language=hindi|category=bollywood%20classic|preview_avail=false|is_premium=false|pre_role_ad=|mid_role_ad=|mid_role_pos=267$534$801$1068$1335|app_user_id=%20url";
        //this.videoURL="http://instaott-videos.s3-ap-southeast-1.amazonaws.com/asianet_player/demo/embed.html?contenturl=8HmcN1Lm5Cjr9tCAnFFVw4r6LOwZOVrTAiEa26fXLLtQQ1TNSYC4vt8mtNSvj4c9EMdbtMaPGswdQrtBxNNeQlj4Wpyrz7Pp4UUwXiIZtOP059L8UtjLYKwD5WeL8IUh|key=7zHFlC48y5hx2QR/+0vPhA==|image=https://d18yh0jkm7grap.cloudfront.net/images/A-Ki-Prema-Helare/5d6a02bc19521d7e8400006b/large_16_9/1584603678.jpg?1584603678|title=A Ki Prema Helare|theme_type=movie|channel_logo=|catalog_id=5d529839babd81605300004b|content_id=5d6a02bcbabd8163a00005a1|genre=crime|language=hindi|category=bollywood classic|preview_avail=false|is_premium=false|pre_role_ad=https://pubads.g.doubleclick.net/gampad/ads?sz=640x360&iu=/6062/iab_vast_samples/skippable&ciu_szs=300x250,728x90&impl=s&gdfp_req=1&env=vp&output=xml_vast2&unviewed_position_start=1&url=[referrer_url]&correlator=[timestamp]|mid_role_ad=http://adex.adchakra.net/KIRTI/openx-2.8.9/www/delivery/fc.php?script=bannerTypeHtml:vastInlineBannerTypeHtml:vastInlineHtml&zones=pre-roll:0.0-0=1&nz=1&source=&r=1234&block=1&format=vast&charset=UTF-8&version=3.0|mid_role_pos=|app_user_id=";


        

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
            this.addedToFavouritesIcon;
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
    if(!localStorage.getItem('otv_user_id')){
      $('.modal').modal('hide');
      $('#watch_login_confirm_pop').modal('show');
    }else{
      this.child.showVideoPopChild();
    }
  }

  showFavPop(popId){
    this.fireLogin.emit();
  }

  closePop(){
    this.displayPopStatus = 'none';
    $('.modal').modal('hide');
  }

  showWatchPop(popId){
    this.fireWatchLogin.emit();
    this.broadcastService.boradcast("EVENT",null);
  }

  addToFavourites(){
    let sId = localStorage.getItem('otv_user_id');
    if(!sId){
      $('.modal').modal('hide');
      $('#fav_login_confirm_pop').modal('show');
    } else {
      if(!this.addedToFavouritesIcon){
        var favouritesParams = {};
        favouritesParams["listitem"] = {};
        favouritesParams["listitem"]["catalog_id"] = this.catalogId;
        favouritesParams["listitem"]["content_id"] = this.tvShowContentId;
        this.userService.addToFavourites(this.sessionId, favouritesParams).subscribe(
          (res) => {
            this.addedToFavouritesIcon = true;
            this.addToFavouritesList = true;
            //this.removeFromFavourites = true;
            setTimeout(function(){
              this.addToFavouritesList = false;
              //this.removeFromFavourites = false;
            }.bind(this), 1200);

            this.getFavourites(sId);
          }, 
          (error) => {
            console.log(error);
          }
        ) 
      } else {
        this.removeFavourites(sId);
      }
    }
  }

  getFavourites(sId){
    this.userService.favourites(sId).subscribe(
      (res) => {
        this.favourite_list_items = res.data.items;
        console.log("favourites", this.favourite_list_items);
        localStorage.setItem('favouritesList' , JSON.stringify(this.favourite_list_items));
        this.addedToFavouritesIcon = false;
        for(let i=0; i<this.favourite_list_items.length; i++){
          if(this.favourite_list_items[i].content_id == this.tvShowContentId){
            this.addedToFavouritesIcon = true;
            break;
          }
        }
      },
      (error) => {
        console.log(error.server_error_messsage);
      }
    )
  }

  onItemRedirect(item){
    debugger;
    for(let i=0; i<this.favourite_list_items.length; i++){
      if(this.favourite_list_items[i].content_id == this.showContentId){
        this.addedToFavouritesIcon = true;
        this.currentItem_listitem_id = this.favourite_list_items[i].listitem_id;
        break;
      } else {
        this.addedToFavouritesIcon = false;
      }
    }
  }

  removeFavourites(sId) {
    this.userService.removeFavourite(this.sessionId, this.currentItem_listitem_id).subscribe(
      (response) => {   
        console.log(response);
        //$("#watch_list_delete_toast").show().fadeOut(4500);
        this.deleteWatchlist = true;
        this.addedToFavouritesIcon = false;
        setTimeout(function() {
          this.deleteWatchlist = false;
        }.bind(this), 4500);  
        this.getFavourites(sId);
      },
      (error) => {
        console.log(error.server_error_messsage);
      }
    )         
  }

  addWatchLater() {
    if(!localStorage.getItem('otv_user_id')){
      $('.modal').modal('hide');
      $('#watch_login_confirm_pop').modal('show');
    } else {
      var watchlaterParams = {};
      watchlaterParams["listitem"] = {};
      watchlaterParams["listitem"]["catalog_id"] = this.catalogId;
      watchlaterParams["listitem"]["content_id"] = this.tvShowContentId;
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
        items: 5,
        dot: false,
      }
    }
  }

}
