import { LOGIN, LOGOUT } from './actionTypes'
import {login, logout} from './actions'

const initialState = {
  user: {
    loggedIn: false
  }
}

export function cmsApp(state = initialState, action)
{
  switch (action.type)
  {
    case LOGIN:
      return Object.assign({}, state, {
        user: {
	  username: action.username,
	  loggedIn: true
	}
      })
    case LOGOUT:
      return initialState
    default:
      return initialState
  }
}

