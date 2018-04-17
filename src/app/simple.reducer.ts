// import { Action } from '@ngrx/store';
import { visState } from "./visState.module"
import * as Actions from "./action"

export type Action = Actions.All

const initState: visState = {
  topicPanel: false,
  topicList: [{ name:"sport", id: 32}],
  talks: {},
  user: { name: "takata", profile: "" },
  topicId: ""
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
      let obj = {}
      obj[action.payload.id] = []
      return newState(state, {topicList: [...state.topicList, action.payload], talks: Object.assign(obj, state.talks) })
    case "ADDCHAT":
      let talks = state.talks[action.payload.id]
      let obj1 = {}
      obj1[action.payload.id] = [...talks, {talk:action.payload.talk, name: action.payload.userName}]
      return newState(state, {talks: obj1} )
    case "ACTIVETOPIC":
      return newState(state, {topicId: action.payload.topicId})

    default:
      return state
  }

}
