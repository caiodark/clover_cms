import { LOGIN, LOGOUT } from './actionTypes'
import {login, logout} from './actions'
import {browserHistory} from 'react-router'

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
      browserHistory.push("/admin")
      return Object.assign({}, state, {
        user: {
	  username: action.username,
	  loggedIn: true
	}
      })
    case LOGOUT:
      browserHistory.push("/admin/login")
      return initialState
    default:
      return initialState
  }
}

