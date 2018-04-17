import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TOPICS } from "../mock-topics"
import { Store } from '@ngrx/store';
import { visState } from "../visState.module"
import { Observable } from "rxjs/Observable";
import * as Actions from "../action"

interface AppState {
  visState: visState;
}


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  topics = TOPICS
  visState :Observable<visState>
  message: string = "hello"

  constructor(private store: Store<AppState>) {
    this.visState = this.store.select('visState')
  }

  ngOnInit() {
  }

  sendMessageToParent(){
    this.store.dispatch({type: 'OPEN'})
  }

  anchorClick(topicId){
    this.store.dispatch(new Actions.activeTopic({topicId: topicId}))
  }

}
