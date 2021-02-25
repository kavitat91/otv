import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchService } from '../shared/services/search.service';
import { CommonService } from '../shared/services/common.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  search_results: any;
  statusMessage: any;
  private _searchNameTerm: string;
  loadingIndicator: boolean = false;
  contentHeight: number;
  searchError: boolean = false;
  search_results1: boolean = false;
  language: any;
  closeIcon: boolean = false;

  constructor(private service: SearchService, private commonService: CommonService, private router: Router, private route: ActivatedRoute, 
    //private spinner: NgxSpinnerService
    ) { }

  ngOnInit() {
    this.getTrendingSearch();
    this.contentHeight = this.commonService.pageHeight();
  }

  getTrendingSearch() {
    this.search_results1 = false;
    this.loadingIndicator = true;
    this.language = localStorage.getItem('language');
    this.service.getTrendingSearch(this.language).subscribe(
      (response) => {
        this.loadingIndicator = false;
        this.search_results = response.data.catalog_list_items;
        console.log(this.search_results);
      },     
  	  (error: any) => {
        this.loadingIndicator = false;
  		  console.log(error);
  		  this.statusMessage = error;
  	  }
      );
  }


  onSearch(val: string) {
    this.language = localStorage.getItem('language');
    if(val.length != 0) {
      this.closeIcon = true;
      this.searchError = false;
      this.loadingIndicator = true;
      this.service.getSearchResults(val, this.language).subscribe(
        (response) => {
          this.loadingIndicator = false;
          this.search_results1 = true;
          this.search_results = response.data.items;
          
          //console.log(this.search_results);
        },     
        (error: any) => {
          this.loadingIndicator = false;
          //console.log(error);
          this.statusMessage = error;
          this.search_results1 = true;
          this.search_results.length = 0;
        }
        );   
    } 
    else {
      //$('.search-box-wrap .fa-times').css('display', 'none');
      //this.searchError = true;
      //console.log("yes")
      // this.search_results.length = 0;
      // this.search_results = []; 
      this.closeIcon = false;
      this.getTrendingSearch();
      //console.log(this.search_results);
    }
  }

  clearSearch(){
    $('#search').val('');
    this.closeIcon =false;
    this.getTrendingSearch();
    
  }
}
