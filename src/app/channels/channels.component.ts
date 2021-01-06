import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageService } from '../shared/services/page.service';
import { CommonService } from '../shared/services/common.service';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css']
})
export class ChannelsComponent implements OnInit {
  contentHeight: number;
  contentHeight1: number;
  statusMessage: any;
  errorStatus: boolean = false;
  loadingIndicator: boolean = false;
  liveTVData: any;
  bannerContents: any;
  otherContents: any;
  language: any;

  constructor(private router: Router, private route: ActivatedRoute, private commonService: CommonService,
    private pageService: PageService) { }

  ngOnInit() {
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

}
