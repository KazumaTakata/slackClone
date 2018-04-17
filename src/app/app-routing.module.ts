import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router"
import { SidebarComponent } from "./sidebar/sidebar.component"
import { MainchatComponent } from "./mainchat/mainchat.component"
import { DetailComponent } from "./detail/detail.component"

const routes: Routes = [
  { path: ':topicId',
    component: MainchatComponent,
    children: [
      {
      path: "detail",
      component: DetailComponent
      }
    ]
  }
]

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }
