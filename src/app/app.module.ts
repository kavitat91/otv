import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; /* this is not required to use, but for product and customer I have used, for employee created separate module and this is included in that modul */
import { OwlModule } from 'ngx-owl-carousel';
//import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from './approuting.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { StaticpageComponent } from './statics/staticpage/staticpage.component';
import { AllitemslistComponent } from './allitemslist/allitemslist.component';
import { SearchComponent } from './search/search.component';


import { PageService } from './shared/services/page.service';
import { AllitmesserviceService } from './shared/services/allitmesservice.service';
import { SearchService } from './shared/services/search.service';
import { UserService } from './shared/services/user.service';
import { PlansService } from './shared/services/plans.service';
import { CommonService } from './shared/services/common.service';
import { SEOService } from './shared/services/seo.service';
//import { NgxSpinnerService } from 'ngx-spinner';
import * as $ from 'jquery';
import * as bootstrap from 'bootstrap';
import { SafePipe } from './shared/pipes/safepipe';

import { PlansComponent } from './plans/plans.component';
import { UserComponent } from './users/user/user.component';
import { ClickElsewhereDirective } from './shared/directives/click-outside.directive.directive';
import { ItemdetailsComponent } from './itemdetails/itemdetails.component';
import { EpisodedetailsComponent } from './episodedetails/episodedetails.component';
import { ShowcatalogComponent } from './showcatalog/showcatalog.component';
import { LivetvComponent } from './livetv/livetv.component';
import { AllchannelsComponent } from './allchannels/allchannels.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ChannelsComponent } from './channels/channels.component';
import { AllEpisodesComponent } from './all-episodes/all-episodes.component';
import { PaymentresponseComponent } from './paymentresponse/paymentresponse.component';
import { VideopopupComponent } from './videopopup/videopopup.component';
import { PlanSummaryComponent } from './plan-summary/plan-summary.component';
import { RazorpayresponseComponent } from './razorpayresponse/razorpayresponse.component';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { BroadcastService } from './shared/services/broadcast.service';
//import {Md5} from 'ts-md5/dist/md5';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    StaticpageComponent,
    AllitemslistComponent,
    SearchComponent,
    PlansComponent,
    UserComponent,
    ClickElsewhereDirective,
    ItemdetailsComponent,
    EpisodedetailsComponent,
    ShowcatalogComponent,
    LivetvComponent,
    AllchannelsComponent,
    PagenotfoundComponent,
    ChannelsComponent,
    AllEpisodesComponent,
    SafePipe,
    PaymentresponseComponent,
    VideopopupComponent,
    PlanSummaryComponent,
    RazorpayresponseComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule, 
    ReactiveFormsModule, 
    HttpClientModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    OwlModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    //NgxSpinnerModule
  ],
  providers: [BroadcastService, PageService, AllitmesserviceService, SearchService, UserService, PlansService, CommonService, SEOService
    //NgxSpinnerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
