import {languageModule} from '../../js/languages/reducers'
import * as actions from '../../js/languages/actions'
import * as types   from '../../js/languages/actionTypes'

describe('reducers', () => {
  it('should keep track a languages request is on going', () => {
    const action = actions.languages_request()
    const state = {}
    const expected = {languages:{isFetching: true, list: []}}
    expect(languageModule(state, action)).toEqual(expected)
  })
  it('should update state with languages list', () => {
    const action = actions.languages_ok([1,2,3])
    const state = {}
    const expected = {languages:{isFetching: false, list: [1,2,3]}}
    expect(languageModule(state, action)).toEqual(expected)
  })
  it('should keep track of errors too', () => {
    const action = actions.languages_err('blah')
    const state = {}
    const expected = {languages:{isFetching: false, list: [], err: 'blah'}}
    expect(languageModule(state, action)).toEqual(expected)
  })
  it('should keep track of saving requests', () => {
    const action = actions.language_save_request()
    const state = {}
    const expected = {language:{isSaving: true}}
    expect(languageModule(state, action)).toEqual(expected)
  })
  it('should update state with a freshly saved language', () => {
    const action = actions.language_save_ok({a: "b"})
    const state = {}
    const expected = {language:{isSaving: false, a: "b"}}
    expect(languageModule(state, action)).toEqual(expected)
  })
  it('should deal with errors from saving as well', () => {
    const action = actions.language_save_err('blah')
    const state = {}
    const expected = {language:{isSaving: false, err:'blah'}}
    expect(languageModule(state, action)).toEqual(expected)
  })
  it('should produce an empty validated language', () => {
    const action = actions.language_new()
    const expected = {
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
    expect(languageModule({}, action).language).toEqual(expected)
  })
  it('should produce a validated language object', () => {
    const action = actions.language_change({})
    const expected = {
      errors: [
          {
 	     name: 'url',
	     error: 'Campo obbligatorio'
          },
          {
	     name: 'name',
	     error: 'Campo obbligatorio'
          }
      ],
      isSaving: false
    }
    expect(languageModule({}, action).language).toEqual(expected)
  })
})
