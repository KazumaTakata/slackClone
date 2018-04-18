import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { environment } from "../environments/environment"
import { AngularFireModule } from "angularfire2"
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { Globals } from "./global";
import { AppRoutingModule } from './/app-routing.module';
import { MainchatComponent } from './mainchat/mainchat.component'
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store'
import { simpleReducer } from './simple.reducer';
import { FormsModule } from '@angular/forms';
import { DetailComponent } from './detail/detail.component';
import { SignupLoginComponent } from './signup-login/signup-login.component';
import { AngularFireAuthModule } from 'angularfire2/auth';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MainchatComponent,
    DetailComponent,
    SignupLoginComponent,

  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AppRoutingModule,
    CommonModule,
    StoreModule.forRoot({visState: simpleReducer }),
    FormsModule
  ],
  providers: [Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
