import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from "@angular/common";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment'
import * as CryptoJS from 'crypto-js';
import {Md5} from 'ts-md5/dist/md5';


@Injectable({
  providedIn: 'root'
})
export class CommonService {
  contentHeight: number;  
  error_message: any;
  url: any;
  urlArray: any = [];
  imageUrl: string = "";
  moreUrl: string = "";
  allUrl: string;
  private dom: Document;
  encrypted: any = "";
  decrypted: string;

  request: string;
  responce: string;
  new_play_url: string;
  obj: any; 

  constructor(private http: HttpClient, @Inject(DOCUMENT) dom: Document) {
    this.dom = dom;
   }
  pageHeight(): number {    
    let window_height = window.innerHeight;
    let x = $('.header').outerHeight() + $('.footer').outerHeight();
    this.contentHeight = window_height - x;
    return this.contentHeight;
  }

  setOtvUserLocalStorage(user: {}) {
    console.log(user);
    localStorage.setItem('otv_user_id', user['user_id']);
    localStorage.setItem('otv_user_name', user['user_name']);
    localStorage.setItem('otv_user_analytic_id', user['user_analy_id']);
    localStorage.setItem('otv_user_login_id', user['user_login_id']);
    localStorage.setItem('otv_user_login_type', user['user_login_type']);
    localStorage.setItem('otv_user_pack_status', user['user_sub_st']);
  }
  getOtvUserLocalStorage() {
    localStorage.getItem('otv_user_id');
    localStorage.getItem('otv_user_name');
    localStorage.getItem('otv_user_analytic_id');
    localStorage.getItem('otv_user_login_id');
    localStorage.getItem('otv_user_login_type');
    localStorage.getItem('otv_user_pack_status');
  }
  removeOtvUserLocalStorage() {
    console.log("2")
    localStorage.removeItem('otv_user_id');
    localStorage.removeItem('otv_user_name');
    localStorage.removeItem('otv_user_analytic_id');
    localStorage.removeItem('otv_user_login_id');
    localStorage.removeItem('otv_user_login_type');
    localStorage.removeItem('otv_user_pack_status');
    localStorage.removeItem('favouritesList');
    localStorage.removeItem('rzp_device_id');
    localStorage.removeItem('continueWatchItems');
  }
  getItemURL(i: any) {
    //console.log(i);
    /* console.log(Object.keys(i[x]['last_episode']).length == 0);
    console.log(Object.keys(i[x]['access_control']).length == 0); */
    
    if(i["theme"] == "show" && i["subcategory_flag"] == "no") {
      //console.log("1");
      if(i['last_episode'] && Object.keys(i['last_episode']).length != 0) {
        //console.log("2");
        this.url = "/"+i['catalog_object']['friendly_id']+'/'+i['last_episode']['show_object']['friendly_id'];
        //console.log("url"+this.url);
        //this.urlArray.push(this.url);
      }
      else {
        //console.log("3");
        this.url = "/"+i['catalog_object']['friendly_id']+"/"+i['friendly_id'];
        //console.log("url"+this.url)
        //this.urlArray.push(this.url);
      }
    }
    else if(i["theme"] == "show_episode" || i["theme"] == "episode") {
      //console.log("4");
      this.url = "/"+i['catalog_object']['friendly_id']+"/"+i['show_object']['friendly_id']+"/"+i['friendly_id'];
      //console.log("url"+this.url)
      //this.urlArray.push(this.url);
    }
    else {
      //console.log("5");
      this.url = "/"+i['catalog_object']['friendly_id']+"/"+i['friendly_id'];
      //console.log("url"+this.url)
    }
    return this.url;
      
  }

  getImageUrl(i: any, layout_type: string) {
    if(layout_type == "t_16_9_banner") {
      this.imageUrl = i["thumbnails"]["xl_image_16_5"]["url"];
    }
    else if(layout_type == "t_2_3_movie" || layout_type == "t_2_3_movie_static" || layout_type == "movies" || layout_type == "t_2_3_big_meta") {
      this.imageUrl = i["thumbnails"]["medium_2_3"]["url"]; 
    }
    else if(layout_type == "t_16_9_big" || layout_type == "t_16_9_epg" || layout_type == "t_1_1_play" || layout_type == "videos" ||  layout_type == "t_16_9_livebanner" || layout_type == "t_16_9_big_without_meta") {
      if(i["thumbnails"].hasOwnProperty("medium_16_9")) {
        this.imageUrl = i["thumbnails"]["medium_16_9"]["url"]; 
      }      
    }
    else if(layout_type == "t_16_9_small"  || layout_type == "t_16_9_small_meta" || layout_type == "video" || layout_type == "shows" ) {
      if(i["thumbnails"].hasOwnProperty("small_16_9")) {
        this.imageUrl = i["thumbnails"]["medium_16_9"]["url"];
      }
    }
    else if(layout_type == "t_1_1_plain") {
      if(i["thumbnails"].hasOwnProperty("xl_image_1_1")) {
        this.imageUrl = i["thumbnails"]["xl_image_1_1"]["url"]; 	
      }      
    }
    else if(layout_type == "t_comb_16_9_list" || layout_type == "t_16_9_big_meta" || layout_type == "t_16_9_right_meta") {
      if(i["thumbnails"].hasOwnProperty("large_16_9")) {
        this.imageUrl = i["thumbnails"]["large_16_9"]["url"];
      }      
    }
    else if(layout_type == "t_comb_1_1_image") {
      if(i["thumbnails"].hasOwnProperty("small_16_9")) {
        this.imageUrl = i["thumbnails"]["small_16_9"]["url"];
      }      
    }
    else if(layout_type == "t_1_1_album" || layout_type == "t_1_1_album_meta") {    
      this.imageUrl = i["thumbnails"]["medium_1_1"]["url"];      
    }
    return this.imageUrl
  }

  getListUrl(url: string, lang: string) {
    this.moreUrl = url;
    /* if(lang && lang != "en") {
      this.moreUrl = this.moreUrl+"?lang="+lang;
    } */
    return this.moreUrl;
  }
  getListAllUrl(url: string, lang: string) {
    this.allUrl = url;
    if(lang && lang != "en") {
      this.allUrl = "/"+this.allUrl+"/all?lang="+lang;
  }
    else {
      this.allUrl = "/"+this.allUrl+"/all";
    }
    return this.allUrl;
  }
  
  getPlayUrlKey(response: any) {
    console.log(response);    
    let url;
    if(response['play_url_type'] == 'youtube' ) {
      url = this.signSmarturl(response['play_url']['youtube']['url']);
    }else{
      url = this.signSmarturl(response['play_url']['saranyu']['url']);
    }    
    console.log("urlurl"+url);
    //sign_smarturl(response['play_url']['saranyu']['url'])
    console.log(response);
    let play_url = '';
    /* var url = response['play_url']['saranyu']['url'];
    console.log("url"+url); */
    if(response["theme"] == "live" || response["theme"] == "linear") {
      play_url = url["playback_urls"][0]['playback_url']
    }       
    else {
      play_url = url["playback_urls"][0]["playback_url"]
      console.log("play_url"+play_url);
      // play_url = url["adaptive_urls"].collect{|x|x["playback_url"] if x["label"] == "laptop_free_#{$region.downcase}_logo"}.compact.first
      //play_url = url["adaptive_urls"].collect{|x|x["playback_url"] if x["label"] == "laptop_free_in"}.compact.first if play_url.nil?
    }
    if(play_url = '') {
      this.new_play_url = ""
    }      
    else {
      this.new_play_url = this.encryptPlayUrl(play_url)
    }
      
    return this.new_play_url;
    //return url;
  }
  encryptPlayUrl(url: string): string {
    var new_url = ""
    let _key =  CryptoJS.AES.random_key;
    let _iv = CryptoJS.enc.Utf8.parse(url);
    var e_key = '';
    var a11 =  CryptoJS.AES.encrypt(_key).toString();
    var encrypted = CryptoJS.AES.update(url) + CryptoJS.AES.final
    new_url = CryptoJS.AES.encrypt(encrypted).gsub(/\n/, '');
    console.log("new_url"+new_url+"a11"+a11);
    return new_url;
  }    
  signSmarturl(smarturl: string) {
    var smart_url_key = "ywVXaTzycwZ8agEs3ujx";
    var serv_id = "1"
    var url = smarturl + "?service_id="+serv_id+"&protocol=hls&play_url=yes";
    var base_url = url+"&play_url=yes&us=";
    
    const md5 = new Md5();
    var signature = md5.appendStr(smart_url_key+base_url).end()

    var signed_url =  base_url+signature;    
    console.log("signature"+signature)
    //var header = {"Accept" : "application/json", "Cache-Control" : "no-cache"}
    
    /*var obj = JSON.parse(this.a11.body);
    console.log(JSON.parse(this.a11.body));
    return obj; */

    //return signed_url  ;  
    /* var a11 = this.getSignedURL(signed_url);
      console.log("a11"+a11['body']); */

      return this.getSignedURL(signed_url).subscribe(
        (resp) => {
          console.log("resp"+resp);
          this.obj = JSON.parse(resp.body);
        },
        (error) => {
          console.log(error);
        }
      )
  }

  getSignedURL(signed_url: any) {
    console.log("signed_url"+signed_url);
    // let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    // let options = new RequestOptions({ headers: headers }); 

    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
   });
   let options = {
      headers: headers
   }

    return this.http.get<any>(signed_url, options)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getMenuList(lang: string) {
    //http://13.233.16.182/catalog_lists/catalog-tabs?region=IN&item_language=od&auth_token=3zZmzoHg8z6SM3wpDoyw
    if(lang == 'od') {
      lang = 'od'
    }
    else {
      lang = ''
    }
    return this.http.get<any>(environment.apiURL+"catalog_lists/catalog-tabs?region=IN&item_language="+lang+"&auth_token="+environment.authtoken)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  
  copyVideoURL(id: string) {
    var element = null; // Should be <textarea> or <input>
    var st: boolean = false;
    try {
      element = this.dom.getElementById(id);
      element.select();
      this.dom.execCommand("copy");
      st = true;
    }    
    finally {
      //this.dom.getSelection().removeAllRanges;
    }
    /* window.getSelection().selectAllChildren(document.getElementById(id));
    document.execCommand("Copy"); */
    return st;
  }
  
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    console.log(error);
    
    if (error.error instanceof ErrorEvent) {
       console.log('client-side error')
      errorMessage = `Error: ${error.error.message}`;
    } else {
      console.log('server-side error');
      console.log(error);
      if(error.error.error) {
        console.log("error.error"+error.error.error.code)
        this.error_message = {
          server_error_code: error.error.error.code,          
          server_error_messsage: error.error.error.message
        }  
      }
      else {
        console.log("no:");
        this.error_message = {
          server_error_code: error.status,
          server_error_messsage: error.message
        }
      }
      
      //errorMessage = `server_error message: ${error.error.error.message}+Error Code: ${error.status}+Message: ${error.message}`;
      errorMessage = this.error_message;
    }   
    return throwError(errorMessage);
  }
}
