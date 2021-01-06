import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { CommonService } from './common.service';
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient, private commonService: CommonService) { }

  getTrendingSearch(lang: string): Observable<any> {
    return this.http.get<any>(environment.apiURL+"catalog_lists/trending-search?region=IN&item_language="+lang+"&auth_token="+environment.authtoken)
    .pipe(
      retry(1),
      catchError(this.commonService.handleError)
     );
  }
  getSearchResults(params: string, lang: string): Observable<any> {
    if(lang == 'od') {
      lang = 'od'
    }
    else {
      lang = ''
    }
    return this.http.get<any>(environment.apiURL+"search?filters=category,all&q="+params+"&region=IN&item_language="+lang+"&auth_token="+environment.authtoken)
    .pipe(
      retry(1),
      catchError(this.commonService.handleError)
     );
  }
 
}
