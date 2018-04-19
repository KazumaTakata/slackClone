import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TOPICS } from "../mock-topics"
import { Store } from '@ngrx/store';
import { visState } from "../visState.module"
import { Observable } from "rxjs/Observable";
import * as Actions from "../action"
import { AngularFirestore } from "angularfire2/firestore"
import { Router } from '@angular/router';

interface AppState {
  visState: visState;
}


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  // topics = TOPICS
  visState :Observable<visState>
  message: string = "hello"
  topics: Observable<any>;
  topicData: any;

  constructor(private store: Store<AppState>, private afs: AngularFirestore, private router: Router) {
    // this.visState = this.store.select('visState')

  //   this.afs.doc("talks/sports").valueChanges().subscribe(d=>{
  //     console.log(d)
  // })

    this.topics = this.afs.collection("topics").valueChanges()
    // this.topics.subscribe(d=>{
    //   this.topicData = d
    // })

  }

  ngOnInit() {
  }

  sendMessageToParent(){
    this.store.dispatch({type: 'OPEN'})
  }

  anchorClick(topicId, topicName){
    this.store.dispatch(new Actions.activeTopic({topicId: topicId, topicName: topicName}))

    this.router.navigate(['/', topicId])
  }

}
