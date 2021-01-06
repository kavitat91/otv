import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { environment } from '../../../environments/environment'
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AllitmesserviceService {

  constructor(private http: HttpClient, private commonService: CommonService) { }

  getItmesList(catalogname: string, lang: string): Observable<any> {
    if(lang == 'od') {
      lang = 'od'
    }
    else {
      lang = ''
    }
    return this.http.get<any>(environment.apiURL+"catalog_lists/"+catalogname+"?region=IN&page=0&page_size=100&item_language="+lang+"&auth_token="+environment.authtoken)
    .pipe(
      retry(1),
      catchError(this.commonService.handleError)
     );
  }

  getOtherTvShows(catalogname: string, lang: string): Observable<any> {
    if(lang == 'od') {
      lang = 'od'
    }
    else {
      lang = ''
    }
    return this.http.get<any>(environment.apiURL+"catalogs/"+catalogname+"/items?region=IN&page=0&page_size=100&item_language="+lang+"&auth_token="+environment.authtoken)
    .pipe(
      retry(1),
      catchError(this.commonService.handleError)
     );
  }
  
  getGenreAll(catalogname: string, genre: string, lang: string): Observable<any> {
    if(lang == 'od') {
      lang = 'od'
    }
    else {
      lang = ''
    }
    //catalogs/#{catalog_slug}/items?genre=#{genre}&region=#{$region}&page=0&page_size=100&item_language
    return this.http.get<any>(environment.apiURL+"catalogs/"+catalogname+"/items?genre="+genre+"&region=IN&page=0&page_size=100&item_language="+lang+"&auth_token="+environment.authtoken)
    .pipe(
      retry(1),
      catchError(this.commonService.handleError)
     );
  }
}
