import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { visState } from "../visState.module"
import { Observable } from "rxjs/Observable";
import * as Actions from "../action"

interface AppState {
  visState: visState;
}



@Component({
  selector: 'app-mainchat',
  templateUrl: './mainchat.component.html',
  styleUrls: ['./mainchat.component.css']
})
export class MainchatComponent implements OnInit {

  private sub: any;
  topicId: string;
  topicName: string;

  visState :Observable<visState>

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
    console.log("main")
    this.visState = this.store.select('visState')

    // this.topicName = ""
    // const that = this
    this.visState.subscribe(d => {
      console.log(d)
      if (d.topicId != ""){
          this.topicName = d.topicList.find( topic => topic.id === d.topicId).name
      }
    })
  }

  onEnter(value: string) {
     console.log(value)
     this.store.dispatch(new Actions.addChat({id: this.topicId ,talk: value}))

   }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       params['topicId']; // (+) converts string 'id' to a number
       console.log(params['topicId'])
       this.topicId = params["topicId"]

       // In a real app: dispatch action to load the details here.
    });

  }

}
