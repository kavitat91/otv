import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { StaticpageComponent } from './statics/staticpage/staticpage.component';
import { AllitemslistComponent } from './allitemslist/allitemslist.component';
import { SearchComponent } from './search/search.component';
import { PlansComponent } from './plans/plans.component';
import { UserComponent } from './users/user/user.component';
import { ItemdetailsComponent } from './itemdetails/itemdetails.component';
import { EpisodedetailsComponent } from './episodedetails/episodedetails.component';
import { ShowcatalogComponent } from './showcatalog/showcatalog.component';
import { LivetvComponent } from './livetv/livetv.component';
import { ChannelsComponent } from './channels/channels.component';
import { AllEpisodesComponent } from './all-episodes/all-episodes.component';
import { PlanSummaryComponent } from '../app/plan-summary/plan-summary.component';
import { RazorpayresponseComponent } from './razorpayresponse/razorpayresponse.component';

const appRoutes: Routes = [
  { 'path': '', component: HomeComponent, data: { page: 'homepage'}  },
  { 'path': 'home', component: HomeComponent, data: { page: 'homepage'}  },
  { 'path': 'livetv', component: LivetvComponent, data: { page: 'livetv'}  },
  { 'path': 'channels', component: LivetvComponent, data: { page: 'channels'}  },

  { 'path': 'search', component: SearchComponent },
  { 'path': 'plans', component: PlansComponent },
  { 'path': 'plans/plans_summary', component: PlanSummaryComponent },
  { 'path': 'payments/payment_response', component: RazorpayresponseComponent },
  { 'path': 'users/account_details', component: UserComponent, data: { page: 'accountdetails'} },
  { 'path': 'users/update_personal_details', component: UserComponent, data: { page: 'updatepersonaldetails'} },
  { 'path': 'users/change_password', component: UserComponent, data: { page: 'changepassword'} },
  { 'path': 'users/reset_password_email', component: UserComponent, data: { page: 'resetpassword'} },
  { 'path': 'users/watchlist', component: UserComponent, data: { page: 'watchlist'} },
  { 'path': 'users/continue_watching', component: UserComponent, data: { page: 'continue_watching'} },
  { 'path': 'about-us', component: StaticpageComponent, data: { page: 'about'} },
  { 'path': 'privacy-policy', component: StaticpageComponent, data: { page: 'pp'} },
  { 'path': 'terms-and-conditions', component: StaticpageComponent, data: { page: 'tc'} },
  { 'path': 'faq', component: StaticpageComponent, data: { page: 'faq'} },
  { 'path': 'contact-us', component: StaticpageComponent, data: { page: 'contact'} },
  { 'path': 'comingsoon', component: StaticpageComponent, data: { page: 'coming_soon'} },


  /* { 'path': 'shows-list', component: ShowcatalogComponent, data: { page: 'showslist'}  },
  { 'path': 'music-list', component: ShowcatalogComponent, data: { page: 'musiclist'}  },
  { 'path': 'serial-list', component: ShowcatalogComponent, data: { page: 'seriallist'}  },
  { 'path': 'devotional-list', component: ShowcatalogComponent, data: { page: 'devotionallist'}  }, */
  { 'path': ':catalogname', component: ShowcatalogComponent, data: { page: 'cataloglist'}  }, 
  
  
  { path: ':catalogname/all', component: AllitemslistComponent, data: { page: 'allitemlist'} },
  { path: ':catalogname/others/all', component: AllitemslistComponent, data: { page: 'othertvshows'} },
  { path: ':catalogname/:genre/all', component: AllitemslistComponent, data: { page: 'genreall'} },
  { path: ':catalogname/:showname/episodes', component: AllEpisodesComponent, data: { page: 'allepisdoes'} },
  { path: ':catalogname/:itemname', component: ItemdetailsComponent, data: { page: 'itemdetailspage'} },
  { path: 'all-channels/:videoname', component: ItemdetailsComponent, data: { page: 'itemdetailspage'} },
  { path: ':catalog_name/:show_name/:episode_name', component: EpisodedetailsComponent, data: { page: 'episodedetailspage'} }
  // { 'path': 'list', component: AllitemslistComponent, data: { page: 'listpage'} },
  
  
  
  
  ];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule  {
  
}
