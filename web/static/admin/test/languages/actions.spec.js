import * as actions from '../../js/languages/actions'
import * as types   from '../../js/languages/actionTypes'

describe ('actions', ()=> {
  it ('should create a request languages action', () => {
    const expected = {type: types.LANGUAGES_REQUEST}
    expect(actions.languages_request()).toEqual(expected)
  })
  it ('should create an action for retrieved languages', () => {
    const expected = {type: types.LANGUAGES_OK, languages: []}
    expect(actions.languages_ok([])).toEqual(expected)
  })
  it ('should create an action to deal with languages error', () => {
    const expected = {type: types.LANGUAGES_ERR, err: "blah"}
    expect(actions.languages_err("blah")).toEqual(expected)
  })
  it ('should create a request to save a language', () => {
    const expected = {type: types.LANGUAGE_SAVE_REQUEST}
    expect(actions.language_save_request()).toEqual(expected)
  })
  it ('should create an action for correctly saved language', () => {
    const language = {a: 'b'}
    const expected = {type: types.LANGUAGE_SAVE_OK, language}
    expect(actions.language_save_ok(language)).toEqual(expected)
  })
  it ('should create an action for errors during language saving', () => {
    const expected = {type: types.LANGUAGE_SAVE_ERR, err: "blah"}
    expect(actions.language_save_err("blah")).toEqual(expected)
  })
  it ('should create an action for a new language', () => {
    const expected = {type: types.LANGUAGE_NEW}
    expect(actions.language_new()).toEqual(expected)
  })
  it ('should create an action for a language change', () => {
    const language = {a: 'b'}
    const expected = {type: types.LANGUAGE_CHANGE, language}
    expect(actions.language_change(language)).toEqual(expected)
  })
  it ('should create an action to open a language', () => {
    const id = 12 
    const expected = {type: types.LANGUAGE_OPEN, id}
    expect(actions.language_open(id)).toEqual(expected)
  })
})
