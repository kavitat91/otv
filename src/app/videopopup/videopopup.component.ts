import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { CommonService } from '../shared/services/common.service';

@Component({
  selector: 'app-videopopup',
  templateUrl: './videopopup.component.html',
  styleUrls: ['./videopopup.component.css']
})
export class VideopopupComponent implements OnInit {
  sessionId: string;
  displayPopStatus: string = 'none'; 
  @Input() videoPremiumCheck: any;
  @Input() videoLoginCheck: any;
  @Input() catalogId: any;
  @Input() contentId: any;
  @Input() videoURL: string;  
  @Input() episodeDetails: string;
  subVideoPop: boolean = false;
  videoWatchLoginPop: boolean = false;
  videoPop: boolean = false;
  videoClickStatus: boolean = false;
  watchlaterWithoutLoginPop: boolean = false;

  constructor(private commonService: CommonService, private userService: UserService) { }

  ngOnInit() {
    this.sessionId = localStorage.getItem('otv_user_id');
    if(this.sessionId) {
      setTimeout(function() {
        //this.userVideoStatus();
        this.userVideoSubStatus();
        //console.log(": "+this.catalogId+": "+this.contentId)
        
      }.bind(this), 2000);
        
    } 
    console.log("videoURL"+this.videoURL);
  }

  showVideoPopChild() {
    this.videoClickStatus = true;
    this.displayPopStatus = 'block';   
    var videoPremiumSt = this.videoPremiumCheck;
    var videoLoginSt = this.videoLoginCheck;
    console.log('this.videoLoginSt'+videoLoginSt);
    if(localStorage.getItem('otv_user_id')) {
      var sub_st: any = localStorage.getItem('otv_user_sub_status');
      if(String(videoPremiumSt) == 'false' && String(sub_st) == 'false') {
        //console.log("0")
        //$("#sub_video_pop").modal("show");
        this.subVideoPop = true;
      }
      else {
        //console.log("1")
       //$("#otv_video_player").modal("show") 
       this.videoPop = true;
      }
    }
    else {
      if(videoLoginSt == "true" || videoLoginSt == true) {
        //console.log("2")
        //$("#video_watch_login_pop").modal("show");
        this.videoWatchLoginPop = true;
      }
      else {
        console.log("3")
        //$("#otv_video_player").modal("show");
        this.videoPop = true;
      }
    }
  }
  loginPop(popId: string) {
    this.displayPopStatus = 'none'; 
    this.videoWatchLoginPop = false;
    localStorage.setItem('loginPop', 'true');
    $('#signin_pop').modal('show');
    //$('.modal-backdrop.show').show();
    //window.location.reload();
  }
  closePop() {
    this.displayPopStatus = 'none'; 
    this.videoClickStatus = false;
  }

  userVideoStatus() {
    this.userService.userVideoStatus(this.catalogId, this.contentId).subscribe(
      (resp) => {
        console.log(resp);
        localStorage.setItem("otv_user_sub_status", resp.user_sub_status);
        localStorage.setItem("otv_user_played_time", resp.user_play_back_time);
        if(resp.list_id != undefined && resp.list_id.length != 0){
          $(".watch_later_icon").attr("src","./assets/images/watchlater_added.svg")
          $('.add_watch_later').data('listitemid',resp.list_id);
          console.log(resp.user_sub_status);          
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }

  userVideoSubStatus() {
    this.userService.userVideoSubStatus(this.sessionId, this.catalogId, this.contentId).subscribe(
      (resp) => {
        console.log(resp.data.is_subscribed);
        localStorage.setItem('otv_user_sub_status', resp.data.is_subscribed);
        //localStorage.setItem("otv_user_played_time", resp.user_play_back_time);
        
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
