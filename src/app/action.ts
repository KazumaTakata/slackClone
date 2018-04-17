import {Action} from '@ngrx/store'


export class addTopic implements Action {
  type= "ADDTOPIC";
  constructor(public payload: any) {}
}

export class addChat implements Action {
  type= "ADDCHAT";
  constructor(public payload: any) {}
}

export class activeTopic implements Action {
  type= "ACTIVETOPIC";
  constructor(public payload: any) {}
}



export type All = addTopic
