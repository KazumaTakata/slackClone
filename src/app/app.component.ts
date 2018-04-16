import { Component } from '@angular/core';
import { AngularFirestore } from "angularfire2/firestore"
import { Observable } from "rxjs/Observable";
import { Globals } from "./global"
import { visState } from "./visState.module"
import { Store } from '@ngrx/store';
import * as Actions from "./action"

interface AppState {
  visState: visState
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string;
  visState :Observable<visState>

  // items: Observable<any[]>;
  constructor(private globals: Globals, private store: Store<AppState>) {
  this.title = globals.role
  this.visState = this.store.select('visState')
  }

  closeButtonClick(){
    this.store.dispatch({type: "CLOSE"})
    // console.log(this.store.select('mes'))
  }

  addTopic(){
    this.store.dispatch(new Actions.addTopic({name:"soccer", id: guid()}))
  }



}
