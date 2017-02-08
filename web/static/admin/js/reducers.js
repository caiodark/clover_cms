import { LOGIN, LOGOUT, TOGGLE_DRAWER, GOTO_DASHBOARD } from './actionTypes'
import {hashHistory} from 'react-router'

const initialState = {
  user: {
    loggedIn: false
  },
  users: [],
  userTypes: [],
  categories: [],
  pages: [],
  ui: {
    drawer : false
  }
}

export function cmsApp(state = initialState, action)
{
  switch (action.type)
  {
    case LOGIN:
      hashHistory.push("/")
      return Object.assign({}, state, {
        user: {
	  username: action.username,
	  loggedIn: true
	}
      })
    case LOGOUT:
      hashHistory.push("/login")
      return initialState
    case TOGGLE_DRAWER:
      if (state.user.loggedIn === true)
      {
        return Object.assign({}, state, {
	  ui:{drawer: !state.ui.drawer}
        })
      }
      else
      {
	return state
      }
    case GOTO_DASHBOARD:
      hashHistory.push("/")
      return Object.assign({}, state, {
	ui:{drawer: false}
      })
    default:
      return initialState
  }
}

