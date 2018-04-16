import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router"
import { SidebarComponent } from "./sidebar/sidebar.component"
import { MainchatComponent } from "./mainchat/mainchat.component"

const routes: Routes = [
  { path: ':topicId', component: MainchatComponent }
]

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }
