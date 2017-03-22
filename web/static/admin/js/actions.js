import fetch from 'isomorphic-fetch'
import * as types from './actionTypes'
import {push} from 'react-router-redux'
import {batchActions} from 'redux-batched-actions'

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
    dispatch(batchActions([dispatch(push('/login')), dispatch(logout_ok())]))
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

export function redirect_dashboard(){
  return (dispatch)=> {
    dispatch(batchActions([dispatch(push('/')), dispatch(goto_dashboard())]))
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
    .catch(error => dispatch(form_err("Unexpected error")))
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

export function form_new()
{
  return push('/forms?view=new')
}
