import {Injectable} from '@angular/core'; 
import { Meta, Title } from '@angular/platform-browser';

@Injectable()
export class SEOService {
  constructor(private title: Title, private meta: Meta) { }


  updateTitle(title: string) {
    console.log("title"+title)
    this.title.setTitle(title);
  }

  updateKeywords(keywords: string) {
    console.log("keywords"+keywords)
    this.meta.updateTag({ name: 'keywords', content: keywords })
  }

  updateDescription(desc: string) {
    console.log("desc"+desc)
    this.meta.updateTag({ name: 'description', content: desc })
  }
}  