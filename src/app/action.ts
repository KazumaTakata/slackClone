import {Action} from '@ngrx/store'


export class addTopic implements Action {
  type= "ADDTOPIC";

  constructor(public payload: object) {}
}



export type All = addTopic
