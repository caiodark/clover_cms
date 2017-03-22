import * as types  from './actionTypes'
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
  },
  form_editing: {
    id: undefined,
    isSaving: false,
    errors : [
      {
	name: 'name',
	error: 'Campo obbligatorio'
      }
    ],
    name : '',
    defaultMessage: ''
  }
}

const validateFormEditing = (forms) => {
  let formErrs = []
  if (! forms.name || forms.name === '')
    formErrs.push({name: 'name', error:'Campo obbligatorio'})
  return formErrs
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
      return Object.assign({}, state, {
	logout: {
	  isFetching: false
	},
        user: {
	  isFetching: false,
	  loggedIn: false
	}
      })
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
      let form_req = Object.assign({}, state.forms, {isFetching: true, list: state.forms.list})
      return Object.assign({}, state, {
        forms:form_req
      })
    case types.FORM_OK:
      let form_okk = Object.assign({}, state.forms, {isFetching: false, list: action.forms})
      return Object.assign({}, state, {
	forms: form_okk,
	ui: {drawer: false}
      })
    case types.FORM_ERR:
      let form_err = Object.assign({}, state.forms, {isFetching: false, list: []})
      return Object.assign({}, state, {
        forms: form_err
      })
    case types.FORM_CHANGE:
      return Object.assign({}, state, {
	form_editing: Object.assign({}, action.forms, {isSaving: false, errors:validateFormEditing(action.forms)})
      })
    case types.GOTO_DASHBOARD:
      return Object.assign({}, state, {
	ui:{drawer: false}
      })
    case types.CLOSE_DRAWER:
      return Object.assign({}, state, {
	ui:{drawer: false}
      })
    default:
      return state
  }
}

