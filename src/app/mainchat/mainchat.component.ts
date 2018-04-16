import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mainchat',
  templateUrl: './mainchat.component.html',
  styleUrls: ['./mainchat.component.css']
})
export class MainchatComponent implements OnInit {

  private sub: any;

  constructor(private route: ActivatedRoute) {
    console.log("main")

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       params['topicId']; // (+) converts string 'id' to a number
       console.log(params['topicId'])
       // In a real app: dispatch action to load the details here.
    });

  }

}
