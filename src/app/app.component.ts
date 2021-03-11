import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, Event, NavigationStart, NavigationCancel, NavigationEnd, NavigationError, RouterOutlet } from '@angular/router';
import {
  transition,
  trigger,
  query,
  style,
  animate,
  group,
  animateChild
} from '@angular/animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Tarang Plus';
  loadingIndicator: boolean = false;
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
  constructor(private router: Router, private titleService: Title, private metaService: Meta) {
  	this.router.events.subscribe(
  		(routerEvent: Event) => {
				if(routerEvent instanceof NavigationStart) {
					this.loadingIndicator = false;
				}  			
				if(routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationCancel || routerEvent instanceof NavigationError) {
					this.loadingIndicator = false;
				}
  		}
  	);
  }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.metaService.addTags([
      {name: 'keywords', content: 'Tarang Plus'},
      {name: 'description', content: 'Tarang Plus'},
      {name: 'twitter:card', content: 'summary_large_image'},
      {name: 'twitter:site', content: '@tarangplus'},
      {name: 'twitter:creator', content: '@tarangplus'},
      {name: 'twitter:title', content: 'Tarang Plus'},
      {name: 'twitter:description', content: 'Tarang Plus'},
      {name: 'twitter:image', content: 'http://54.221.118.191:3008/assets/logo.png'},
      {name: 'og:type', content: 'article'},
      {name: 'og:title', content: 'Tarang Plus'},
      {name: 'og:url', content: 'http://54.221.118.191:3008/plans'},
      {name: 'og:image', content: 'http://54.221.118.191:3008/assets/logo.png'},
      {name: 'robots', content: 'index, follow'}
    ]);
  }

}
