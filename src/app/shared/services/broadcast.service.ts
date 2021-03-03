import { Injectable } from '@angular/core';

import { Message } from 'src/app/message';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';
import { filter,map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BroadcastService {

  constructor() { }
  private _handler: Subject<Message> = new Subject<Message>();

  boradcast(type: string, payload: any = null) {
    this._handler.next({ type, payload });
  }

  subscribe(type: string, callback: (payload: any) => void): Subscription {
    //TODO filter is not loding
    return this._handler
      //.filter(message => message.type === type)
      //.map(message => message.payload)
      .subscribe(callback);
  }
}
