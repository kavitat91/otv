import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-razorpayresponse',
  templateUrl: './razorpayresponse.component.html',
  styleUrls: ['./razorpayresponse.component.css']
})
export class RazorpayresponseComponent implements OnInit {
  dataObj: any = {};
  msg: string = '';

  constructor(public route: ActivatedRoute, public router: Router) {
  }

  ngOnInit() {
    console.log("Razorpay Response : Order id - "+this.dataObj['order_id'])
    this.dataObj = this.route.snapshot.queryParams;
  }

  tellAndroidSuccess(msg) {
    console.log(msg);
  }

}
