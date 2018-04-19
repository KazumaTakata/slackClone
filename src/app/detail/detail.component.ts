import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {style, state, animate, transition, trigger, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { visState } from "../visState.module";
import { Store } from '@ngrx/store';

interface AppState {
  visState: visState;
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
//   animations: [
//   trigger('fadeInOut', [
//     transition(':enter', [   // :enter is alias to 'void => *'
//       style({opacity:0}),
//       animate(500, style({opacity:1}))
//     ]),
//     transition(':leave', [   // :leave is alias to '* => void'
//       animate(500, style({opacity:0}))
//     ])
//   ])
// ]
})
export class DetailComponent implements OnInit {

  detaildetail:boolean;
  sub: Observable<any>;
  visState :Observable<visState>
  topicName: string;

  constructor(private _location: Location, private route: ActivatedRoute, private store: Store<AppState>) {
    this.detaildetail = false;

    this.visState = this.store.select('visState')
    this.visState.subscribe(d => {
        console.log(d.topic.name)
        this.topicName = d.topic.name
    })

   }

  ngOnInit() {
    this.route.params.subscribe(params => {
        console.log(params)
    })

  }

  backClicked(){
    this._location.back();
  }

  detailClick(){
    // this.detaildetail = !this.detaildetail
  }

}
