import { LOGIN_REQUEST, 
         LOGIN_OK, 
	 LOGIN_ERR,
	 LOGIN_REDIRECT, 
	 LOGOUT_REQUEST, 
	 LOGOUT_OK, 
	 LOGOUT_ERR, 
	 TOGGLE_DRAWER, 
	 GOTO_DASHBOARD } from './actionTypes'
import {hashHistory} from 'react-router'
import { combineReducers} from 'redux'

const initialState = {
  user: {
    isFetching: false,
    loggedIn: false
  },
  logout: {
    isFetching: false
  },
  users: [],
  userTypes: [],
  categories: [],
  pages: [],
  ui: {
    drawer : false
  },
  forms : {
    isFetching: false,
    list: []
  }
}

export function cmsApp(state = initialState, action)
{
  switch (action.type)
  {
    case LOGIN_OK:
      return Object.assign({}, state, {
        user: {
	  isFetching: false,
	  username: action.name,
	  permissions: action.permissions,
	  loggedIn: true
	}
      })
    case LOGIN_REDIRECT:
      hashHistory.push("/")
      return state
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        user: {
	  isFetching: true,
	  loggedIn: false
	}
      })
    case LOGIN_ERR:
      return Object.assign({}, state, {
        user: {
	  isFetching: false,
	  loggedIn: false
	}
      })
    case LOGOUT_REQUEST:
      return Object.assign({}, state, {
        logout: {
	  isFetching: true
	}
      })
    case LOGOUT_ERR:
      return Object.assign({}, state, {
        logout: {
	  isFetching: false
	}
      })
    case LOGOUT_OK:
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
    case FORM_REQUEST:
      return Object.assign({}, state, {
        forms:{isFetching: true, list: state.forms.list
      })
    case FORM_OK:
      return Object.assign({}, state, {
        forms:{isFetching: false, list: action.forms}
      })
    case FORM_ERR:
      return Object.assign({}, state, {
        forms:{isFetching: false, list:[]}
      })
    case GOTO_DASHBOARD:
      hashHistory.push("/")
      return Object.assign({}, state, {
	ui:{drawer: false}
      })
    default:
      return initialState
  }
}

