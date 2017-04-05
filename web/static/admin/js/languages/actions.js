import * as types from './actionTypes'
import {push} from 'react-router-redux'

export function languages_request(){
  return {
    type: types.LANGUAGES_REQUEST
  }
}

export function languages_ok(languages){
  return {
    type: types.LANGUAGES_OK,
    languages
  }
}

export function languages_err(err){
  return {
    type: types.LANGUAGES_ERR,
    err
  }
}

export function language_save_request(){
  return {
    type: types.LANGUAGE_SAVE_REQUEST
  }
}

export function language_save_ok(language){
  return {
    type: types.LANGUAGE_SAVE_OK,
    language
  }
}

export function language_save_err(err){
  return {
    type: types.LANGUAGE_SAVE_ERR,
    err
  }
}

export function language_new(){
  return {
    type: types.LANGUAGE_NEW
  }
}

export function language_create(){
  return dispatch => {
    dispatch(language_new)
    dispatch(push('/language/new'))
  }
}

export function languages_start()
{
  return dispatch => {
    dispatch(languages_request())
    return fetch('/api/admin/languages', {
	credentials: 'same-origin'
	})
    .then(response => response.json())
    .then(json => dispatch(languages_ok(json.data)))
    .then(() => dispatch(push('/languages')))
    .catch(error => dispatch(languages_err(`Unexpected error ${error}`)))
  }
}

export function language_change(language)
{
  return {
    type: types.LANGUAGE_CHANGE,
    language
  }
}

export function language_open(id)
{
  return {type: types.LANGUAGE_OPEN, id}
}

export function language_load(id)
{
  return dispatch => {
    dispatch(language_open(id))
    dispatch(push(`/language/${id}`))
  }
}

export function language_edit(language)
{
  return dispatch => {
    dispatch(language_save_ok(language))
    dispatch(push(`/language/${language.id}`))
  }
}

export function language_save_start(language)
{
  const req = language.id === undefined ? {url:'/api/admin/languages', method:'post'} : {url: `/api/admin/languages/${language.id}`, method: 'put'}
  return dispatch => {
    dispatch(language_save_request())
    return fetch(req.url, {
      headers: {
	'Accept': 'application/json',
	'Content-Type': 'application/json'
      },
      method: req.method,
      body: JSON.stringify({language}),
      credentials: 'same-origin'
      })
    .then(response => response.json())
    .then(json => dispatch(language_edit(json.data)))
    .catch(error => dispatch(language_save_err(`Unexpected error ${error}`)))
  }
}
