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

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MainchatComponent,

  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AppRoutingModule,
    CommonModule,
    StoreModule.forRoot({visState: simpleReducer })
  ],
  providers: [Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }