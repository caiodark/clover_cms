import fetch from 'isomorphic-fetch'
import * as types from './actionTypes'
import {push} from 'react-router-redux'

export function login_request(username, password)
{
  return {type: types.LOGIN_REQUEST, username, password} 
}

export function login_redirect()
{
  return {type: types.LOGIN_REDIRECT}
}

export function login_ok(name, permissions)
{
  return {type: types.LOGIN_OK, name, permissions}
}

export function login_err(username, reason)
{
  return {type: types.LOGIN_ERR, username, reason}
}

export function login_start(username, password)
{
  return dispatch => {
    dispatch(login_request(username, password))
    let dataForm = new FormData()
    dataForm.append("username", username);
    dataForm.append("password", password);
    return fetch('http://localhost:4000/api/admin/users/authenticate', {
	method: 'POST',
        body: dataForm,
	credentials: 'same-origin'
	})
      .then(response => response.json())
      .then(json => dispatch(login_ok(json.data.name, json.data.permissions)))
      .then(() => dispatch(push('/')))
      .catch(error => dispatch(login_err(username, error)))
  }
}

export function logout_start()
{
  return dispatch => {
    dispatch(logout_request())
    return fetch('/api/admin/users/logout',{credentials: 'same-origin'})
    .then(response => response.text())
    .then(text => dispatch(logout_success()))
    .catch(error => dispatch(logout_err("Unexpected error")))
  }
}

export function logout_request()
{
  return {type: types.LOGOUT_REQUEST}
}

export function logout_ok()
{
  return {type: types.LOGOUT_OK}
}

export function logout_success()
{
  return dispatch => {
    dispatch(logout_ok())
    dispatch(push('/login'))
  }
}

export function logout_err(reason)
{
  return {type: types.LOGOUT_ERR, reason}
}

export function toggle_drawer()
{
  return {type: types.TOGGLE_DRAWER}
}

export function goto_dashboard()
{
  return {type: types.GOTO_DASHBOARD}
}

function test()
{
  return push('/')
}

export function redirect_dashboard(){
  return dispatch => {
    dispatch(goto_dashboard())
    dispatch(push('/'))
  }
}

export function form_start()
{
  return dispatch => {
    dispatch(form_request())
    return fetch('/api/admin/forms', {
	credentials: 'same-origin'
	})
    .then(response => response.json())
    .then(json => dispatch(form_ok(json.data)))
    .then(() => dispatch(push('/forms?view=list')))
    .catch(error => dispatch(form_err(`Unexpected error ${error}`)))
  }
}

export function form_request()
{
  return {type: types.FORM_REQUEST}
}

export function form_ok(forms)
{
  return {type: types.FORM_OK, forms}
}

export function form_err(reason)
{
  return {type: types.FORM_ERR, reason}
}

export function forms_redirect()
{
  return {type: types.FORMS_REDIRECT}
}

export function form_change(forms)
{
  return {type: types.FORM_CHANGE, forms}
}

export function close_drawer()
{
  return {type: types.CLOSE_DRAWER}
}

export function form_renew()
{
  return {type: types.FORM_NEW}
}

export function form_new()
{
  return dispatch => {
    dispatch(form_renew())
    dispatch(push('/forms?view=new'))
  }
}

export function form_save_request()
{
  return {type: types.FORM_SAVE_REQUEST}
}

export function form_save_ok(form)
{
  return {type: types.FORM_SAVE_OK, form}
}

export function form_save_err(reason)
{
  return {type: types.FORM_SAVE_ERR, reason }
}

export function form_open(id)
{
  return {type: types.FORM_OPEN, id}
}

export function form_load(id)
{
  return dispatch => {
    dispatch(form_open(id))
    dispatch(push(`/forms?view=detail&id=${id}`))
  }
}

export function form_edit(form)
{
  return dispatch => {
    dispatch(form_save_ok(form))
    dispatch(push(`/forms?view=detail&id=${form.id}`))
  }
}

export function form_save_start(form)
{
  const req = form.id === undefined ? {url:'/api/admin/forms', method:'post'} : {url: `/api/admin/forms/${form.id}`, method: 'put'}
  return dispatch => {
    dispatch(form_save_request())
    return fetch(req.url, {
      headers: {
	'Accept': 'application/json',
	'Content-Type': 'application/json'
      },
      method: req.method,
      body: JSON.stringify({form}),
      credentials: 'same-origin'
      })
    .then(response => response.json())
    .then(json => dispatch(form_edit(json.data)))
    .catch(error => dispatch(form_save_err(`Unexpected error ${error}`)))
  }
}

export function session_inject(session)
{
  return {type: types.SESSION_INJECT, session}
}

export function get_session_from_server()
{
  return dispatch => {
    return fetch('/api/admin/users/session', {credentials: 'same-origin'})
             .then(response => response.json())
             .then(json => dispatch(session_inject(json.data)))
	     .then(() => dispatch(redirect_dashboard()))
  }
}
