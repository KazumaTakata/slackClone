import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore } from "angularfire2/firestore"
import { ActivatedRoute, Router } from '@angular/router';
import { visState } from '../visState.module';
import { Store } from '@ngrx/store';
import * as Actions from "../action"
interface AppState {
  visState: visState;
}


@Component({
  selector: 'app-signup-login',
  templateUrl: './signup-login.component.html',
  styleUrls: ['./signup-login.component.css']
})
export class SignupLoginComponent implements OnInit {

  constructor(private store: Store<AppState>, public afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {

    // this.afAuth.authState.subscribe(d =>
    //     console.log(d)
    // )
    // this.afs.doc(``).valueChanges().subscribe(d => {
    //   console.log(d)
    // })
    this.afs.collection("users").valueChanges().subscribe(d=>{
      console.log(d)
  })
  }

  ngOnInit() {
  }
  login() {
   this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then( (user)=> {
      this.updateUserData(user)
    } )
 }

 updateUserData(user){
   let profile = user.user
   let obj = { name: profile.displayName, id: profile.uid }
   this.afs.doc(`users/${profile.uid}`).set(obj)
   this.store.dispatch(new Actions.setUser({userName: profile.displayName}))
   this.router.navigate(["default"])
 }


}
