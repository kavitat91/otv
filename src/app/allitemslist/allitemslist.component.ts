import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute }  from '@angular/router';
import { AllitmesserviceService } from '../shared/services/allitmesservice.service';
import { CommonService } from '../shared/services/common.service';

@Component({
  selector: 'app-allitemslist',
  templateUrl: './allitemslist.component.html',
  styleUrls: ['./allitemslist.component.css']
})
export class AllitemslistComponent implements OnInit {
  all_items: any;
  errorStatus: boolean = false;
  statusMessage: any;
  title: string;
  catalogname: string;
  loadingIndicator: boolean = false;
  contentHeight: number; 
  language: any;
  sub: any;
  page: string;
  allTvshows: any;
  layoutScheme: string;
  genreAll: any;
  allItemsData: any;

  constructor(private service: AllitmesserviceService, private commonService: CommonService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {    
    this.contentHeight = this.commonService.pageHeight();    
    //this.get_item_url();
    //console.log(this.router.url);
    this.catalogname = this.router.url;
    let a = this.catalogname.split("/");
    //console.log(a);
    //this.catalogname = a[a.length-1];
    this.catalogname = a[1];
    //console.log(this.catalogname);
    
    this.sub = this.route.data
    .subscribe((page) =>{
      //console.log(page);
      if(page['page'] == 'allitemlist') {
        this.page = "allitemlist";
        this.getList(this.catalogname);
      }
      else if(page['page'] == 'othertvshows') {
        this.page = "othertvshows";
        this.getOtherTvShows(this.catalogname);
      }
      else if(page['page'] == 'genreall') {
        this.page = "genreall";
        this.getGenreAll(this.catalogname);
      }
    }); 
  }

  getList(catalogname: string) {
    this.loadingIndicator = true;
    this.language = localStorage.getItem('language');
    this.service.getItmesList(catalogname, this.language).subscribe(
      (response: any) => {
        this.loadingIndicator = false;
        this.all_items = response.data.catalog_list_items;       
        this.allItemsData = response.data;
        this.title = response.data.display_title;
        for(var x=0; x < this.all_items.length; x++) {
          this.all_items[x]["itemUrl"] = this.commonService.getItemURL(this.all_items[x]);          
        }        
      },     
  	  (error: any) => {
        this.loadingIndicator = false;
  		  console.log(error);
  		  this.statusMessage = error;
  	  }
    );
  }

  getOtherTvShows(catalogname: string) {
    this.loadingIndicator = true;
    this.language = localStorage.getItem('language');
    this.service.getOtherTvShows(catalogname, this.language).subscribe(
      (items_response: any) => {
        this.loadingIndicator = false;        
        this.title = "Other  "+items_response["data"]["name"];
        this.allTvshows = items_response["data"]["items"];
        this.layoutScheme =  items_response["data"]["catalog_object"]["layout_scheme"];
        for(var x=0; x < this.allTvshows.length; x++) {
          this.allTvshows[x]["itemUrl"] = this.commonService.getItemURL(this.allTvshows[x]);          
        }        
      },     
  	  (error: any) => {
        this.loadingIndicator = false;
  		  console.log(error);
  		  this.statusMessage = error;
  	  }
    );
  }

  getGenreAll(catalogname: string) {
    this.loadingIndicator = true;
    this.language = localStorage.getItem('language');
    this.service.getGenreAll(catalogname, 'comedy', this.language).subscribe(
      (genre_response: any) => {
        this.loadingIndicator = false;        
        this.title = "Genre";
        this.genreAll = genre_response["data"]["items"];
        /* for(var x=0; x < this.allTvshows.length; x++) {
          this.allTvshows[x]["itemUrl"] = this.commonService.getItemURL(this.allTvshows[x]);          
        } */        
      },     
  	  (error: any) => {
        this.loadingIndicator = false;
  		  console.log(error);
  		  this.statusMessage = error.server_error_messsage;
  	  }
    );
  }
  
}
