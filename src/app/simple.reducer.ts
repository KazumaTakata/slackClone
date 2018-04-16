// import { Action } from '@ngrx/store';
import { visState } from "./visState.module"
import * as Actions from "./action"

export type Action = Actions.All

const initState: visState = {
  topicPanel: true,
  topicList: [{ name:"sport", id: 32}]
}


const newState = (state, newData) => {
  return Object.assign({}, state, newData)
}

export function simpleReducer(state: visState = initState , action: Action){

  console.log(action.type, state)

  switch ( action.type ){

    case 'OPEN':
      return newState(state, { topicPanel: true })
    case "CLOSE":
      return newState(state, { topicPanel: false })
    case "ADDTOPIC":
      return newState(state, {topicList: [...state.topicList, action.payload]})

    default:
      return state
  }

}
