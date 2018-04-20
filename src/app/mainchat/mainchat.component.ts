import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { visState } from "../visState.module"
import { Observable } from "rxjs/Observable";
import * as Actions from "../action"
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
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
  userName: string;
  talks: Observable<any>;
  emojiContainerStyle: object;
  activeChat: any;

  visState :Observable<visState>

  constructor(private router: Router, private route: ActivatedRoute, private store: Store<AppState>, private afs: AngularFirestore) {
    console.log("main")
    this.visState = this.store.select('visState')

    // this.topicName = ""
    // const that = this
    this.visState.subscribe(d => {
      console.log(d)
      // if (d.topicId != ""){
      //     this.topicName = d.topicList.find( topic => topic.id === d.topicId).name
      // }
      this.userName = d.user.name
    })
    this.emojiContainerStyle = { top: '0px' , left: '0px', visibility: "hidden" }
  }
  gotoDetail(){
    console.log("detail")
    this.router.navigate([this.topicId ,"detail"])
  }

  onEnter(value: string) {
     console.log(value)
     // this.store.dispatch(new Actions.addChat({id: this.topicId ,talk: value, userName: this.userName}))
     this.afs.collection(`talks/${this.topicId}/talk`).add({id: this.topicId ,talk: value, userName: this.userName, createdAt: firebase.firestore.FieldValue.serverTimestamp(), star: 0, pin: false, emoji:{happy: 0, smiling: 0, sad: 0, confused: 0, mad: 0}})
   }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       params['topicId']; // (+) converts string 'id' to a number
       console.log(params['topicId'])
       this.topicId = params["topicId"]
       if (this.topicId !="default"){
       this.talks = this.afs.collection(`talks/${this.topicId}/talk`, ref => ref.orderBy("createdAt")).snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() ;
        const documentId = action.payload.doc.id;
        return { documentId, ...data };
      });
    });
       // In a real app: dispatch action to load the details here.

        let tmpAfs: any = this.afs.collection("topics").valueChanges()
        tmpAfs.subscribe((d)=>{this.topicName = d.find( o => o.id == this.topicId ).name})
      }

    });
  }

  emojiPopup(e, obj) {
    e.stopPropagation()
    let posx = (e.clientX - 100 ) + 'px'
    let posy = (e.clientY - 120 ) + 'px'
    console.log(posy, posx)
    this.emojiContainerStyle = { top: posy , left: posx, visibility: "visible" }
    this.activeChat = obj
  }

  emojiClick(e, kind){
    // e.stopPropagation()
    console.log(kind)
    let updateObj = {emoji: this.activeChat.emoji}
    updateObj.emoji[kind] = this.activeChat.emoji[kind] + 1
    this.emojiContainerStyle = { visibility: "hidden" }
    this.afs.collection(`talks/${this.topicId}/talk`, ref => ref.orderBy("createdAt")).doc(this.activeChat.documentId).update(updateObj)
  }

  bodyClick(){
    console.log("body click")
    this.emojiContainerStyle = { visibility: "hidden" }

  }

  starClick(obj){
    console.log(obj.documentId)
    this.afs.collection(`talks/${this.topicId}/talk`, ref => ref.orderBy("createdAt")).doc(obj.documentId).update({star: obj.star + 1})
  }
  pinClick(obj){
    console.log(obj.documentId)
    this.afs.collection(`talks/${this.topicId}/talk`, ref => ref.orderBy("createdAt")).doc(obj.documentId).update({pin:  !obj.pin})
  }

}
