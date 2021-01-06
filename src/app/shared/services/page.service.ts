import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { environment } from '../../../environments/environment'
import { CommonService } from './common.service';


@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(private http: HttpClient, private commonService: CommonService) { }

  getHomeContent(lang: string): Observable<any> {
    if(lang == 'od') {
      lang = 'od'
    }
    else {
      lang = ''
    }
    //return this.http.get<any>(environment.apiURL+"catalog_lists/home-list?region=IN&item_language="+lang+"&auth_token="+environment.authtoken)
    return this.http.get<any>(environment.apiURL+"catalog_lists/home-list?region=IN&item_language="+lang+"&auth_token="+environment.authtoken)
    .pipe(
      retry(1),
      catchError(this.commonService.handleError)
     );
  }

  getCatloagContent(catlogName: string, lang: string): Observable<any> {
    return this.http.get<any>(environment.apiURL+"catalog_lists/"+catlogName+"?region=IN&page=0&page_size=100&item_language="+lang+"&auth_token="+environment.authtoken)
    .pipe(
      retry(1),
      catchError(this.commonService.handleError)
     );
  }

  getLiveTVContent(lang: string): Observable<any> {
    if(lang == 'od') {
      lang = 'od'
    }
    else {
      lang = ''
    }
    return this.http.get<any>(environment.apiURL+"catalog_lists/all-channels?page_size=150&region=IN&item_language="+lang+"&auth_token="+environment.authtoken)
    .pipe(
      retry(1),
      catchError(this.commonService.handleError)
     );
  }
  
  getItemDetails(lang: string, catalog_slug: string, show_slug: string ): Observable<any> {
    if(lang == 'od') {
      lang = 'od'
    }
    else {
      lang = ''
    }
    console.log("catalog_slug"+catalog_slug+"show_slug"+catalog_slug);
    return this.http.get<any>(environment.apiURL+"catalogs/"+catalog_slug+"/items/"+show_slug+"?&region=IN&item_language="+lang+"&auth_token="+environment.authtoken)
    .pipe(
      retry(1),
      catchError(this.commonService.handleError)
     );
  }

  getEpisodeDetails(lang: string, catalog_slug: string, show_slug: string, item_slug: string ): Observable<any> {
    if(lang == 'od') {
      lang = 'od'
    }
    else {
      lang = ''
    }
    return this.http.get<any>(environment.apiURL+"catalogs/shows/"+show_slug+"/episodes/"+item_slug+"?&region=IN&item_language="+lang+"&auth_token="+environment.authtoken)
    .pipe(
      retry(1),
      catchError(this.commonService.handleError)
     );
  }

  getAllEpisodes(lang: string, catalog_slug: string, show_slug: string ): Observable<any> {
    if(lang == 'od') {
      lang = 'od'
    }
    else {
      lang = ''
    }
    return this.http.get<any>(environment.apiURL+"catalogs/"+catalog_slug+"/items/"+show_slug+"/episodes?order_by=desc&region=IN&item_language="+lang+"&auth_token="+environment.authtoken)
    .pipe(
      retry(1),
      catchError(this.commonService.handleError)
     );
  }

  getCatalogDetails(lang: string, catalog_slug: string) {
    return this.http.get<any>(environment.apiURL+"catalogs/"+catalog_slug+"/items?region=IN&item_language="+lang+"&auth_token="+environment.authtoken)
    .pipe(
      retry(1),
      catchError(this.commonService.handleError)
     );
  }

  getItemGenre(lang: string, catalog_slug: string, genre: any) {
    return this.http.get<any>(environment.apiURL+"catalogs/"+catalog_slug+"/items?genre="+genre+"region=IN&item_language="+lang+"&auth_token="+environment.authtoken)
    .pipe(
      retry(1),
      catchError(this.commonService.handleError)
     );
  }
  getAssociatedVideos(lang: string, catalog_slug: string, item_slug: any) {
    
    return this.http.get<any>(environment.apiURL+"catalogs/"+catalog_slug+"/items/"+item_slug+"videolists?region=IN&item_language="+lang+"&auth_token="+environment.authtoken)
    .pipe(
      retry(1),
      catchError(this.commonService.handleError)
     );
  }

}
