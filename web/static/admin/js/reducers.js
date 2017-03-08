import * as types  from './actionTypes'
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
    case types.LOGIN_OK:
      return Object.assign({}, state, {
        user: {
	  isFetching: false,
	  username: action.name,
	  permissions: action.permissions,
	  loggedIn: true
	}
      })
    case types.LOGIN_REDIRECT:
      hashHistory.push("/")
      return state
    case types.LOGIN_REQUEST:
      return Object.assign({}, state, {
        user: {
	  isFetching: true,
	  loggedIn: false
	}
      })
    case types.LOGIN_ERR:
      return Object.assign({}, state, {
        user: {
	  isFetching: false,
	  loggedIn: false
	}
      })
    case types.LOGOUT_REQUEST:
      return Object.assign({}, state, {
        logout: {
	  isFetching: true
	}
      })
    case types.LOGOUT_ERR:
      return Object.assign({}, state, {
        logout: {
	  isFetching: false
	}
      })
    case types.LOGOUT_OK:
      hashHistory.push("/login")
      return initialState
    case types.TOGGLE_DRAWER:
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
    case types.FORM_REQUEST:
      return Object.assign({}, state, {
        forms:{isFetching: true, list: state.forms.list}
      })
    case types.FORM_OK:
      return Object.assign({}, state, {
        forms:{isFetching: false, list: action.forms}
      })
    case types.FORM_ERR:
      return Object.assign({}, state, {
        forms:{isFetching: false, list:[]}
      })
    case types.FORMS_REDIRECT:
      hashHistory.push("/forms")
      return state
    case types.GOTO_DASHBOARD:
      hashHistory.push("/")
      return Object.assign({}, state, {
	ui:{drawer: false}
      })
    case types.CLOSE_DRAWER:
      return Object.assign({}, state, {
	ui:{drawer: false}
      })
    case types.FORM_NEW:
      hashHistory.push("/forms/new")
      return state
    default:
      return initialState
  }
}

