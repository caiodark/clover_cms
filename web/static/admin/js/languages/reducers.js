import * as types from './actionTypes'

const initialState = {
  languages: {
    isFetching: false,
    list: []
  },
  language: {
    id: undefined,
    url: '',
    name: '',
    errors : [
      {
	name: 'name',
	error: 'Campo obbligatorio'
      },
      {
	name: 'url',
	error: 'Campo obbligatorio'
      }
    ],
    isSaving : false
  }
}

const validate = (language) => {
  let errors = []
  if (!language.url){
    errors.push({name:'url', error:'Campo obbligatorio'})
  }
  if (!language.name){
    errors.push({name:'name', error:'Campo obbligatorio'})
  }
  return errors
}

export function languageModule(state = initialState, action)
{
  switch (action.type)
  {
    case types.LANGUAGES_REQUEST:
      return Object.assign({}, state, {
	languages: {
	  isFetching: true,
	  list: []
	}
      })
    case types.LANGUAGES_OK:
      return Object.assign({}, state, {
        languages: {
	  isFetching: false,
	  list: action.languages
	}
      })
    case types.LANGUAGES_ERR:
      return Object.assign({}, state, {
	languages: {
	  isFetching: false,
	  list: [],
	  err: action.err
	}
      })
    case types.LANGUAGE_SAVE_REQUEST:
      const lang_req = Object.assign({}, state.language, {
	isSaving: true
      })
      return Object.assign({}, state, {
        language: lang_req
      })
    case types.LANGUAGE_SAVE_OK:
      const lang_ok = Object.assign({}, action.language, {
        isSaving: false,
	errors: []
      })
      return Object.assign({}, state, {
        language: lang_ok
      })
    case types.LANGUAGE_SAVE_ERR:
      const lang_err = Object.assign({}, state.language, {
        isSaving: false,
	err: action.err
      })
      return Object.assign({}, state, {
        language: lang_err
      })
    case types.LANGUAGE_NEW:
      return Object.assign({}, state, { language: {
        id: undefined,
        url: '',
        name: '',
        errors : [
          {
 	     name: 'name',
	     error: 'Campo obbligatorio'
          },
          {
	     name: 'url',
	     error: 'Campo obbligatorio'
          }
        ],
        isSaving : false
      }})
    case types.LANGUAGE_CHANGE:
      return Object.assign({}, state, { language: Object.assign({}, action.language, {
	isSaving:false, 
	errors:validate(action.language)
      })})
    case types.LANGUAGE_OPEN:
      let language_about_to_open = state.languages.list.filter(el => el.id === action.id)
      if (language_about_to_open.length > 0)
      {
        let language_loaded = Object.assign({}, language_about_to_open[0], {isSaving: false, errors:[]})
	return Object.assign({}, state, {language: language_loaded}) 
      } else {
        return state
      }


    default:
      return state
  }
}
