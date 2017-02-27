import fetch from 'isomorphic-fetch'
import { LOGIN_OK, 
         LOGIN_REQUEST, 
	 LOGIN_ERR, 
	 LOGIN_REDIRECT,
	 LOGOUT_REQUEST,
	 LOGOUT_OK,
	 LOGOUT_ERR, 
	 TOGGLE_DRAWER, 
	 GOTO_DASHBOARD } from './actionTypes'

export function login_request(username, password)
{
  return {type: LOGIN_REQUEST, username, password} 
}

export function login_redirect()
{
  return {type: LOGIN_REDIRECT}
}

export function login_ok(name, permissions)
{
  return {type: LOGIN_OK, name, permissions}
}

export function login_err(username, reason)
{
  return {type: LOGIN_ERR, username, reason}
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
        body: dataForm
	})
      .then(response => response.json())
      .then(json => dispatch(login_ok(json.data.name, json.data.permissions)))
      .then(() => dispatch(login_redirect()))
      .catch(error => dispatch(login_err(username, error)))
  }
}

export function logout_start()
{
  return dispatch => {
    dispatch(logout_request())
    return fetch('http://localhost:4000/api/admin/users/logout')
    .then(response => response.text())
    .then(text => dispatch(logout_ok()))
    .catch(error => dispatch(logout_err("Unexpected error")))
  }
}

export function logout_request()
{
  return {type: LOGOUT_REQUEST}
}

export function logout_ok()
{
  return {type: LOGOUT_OK}
}

export function logout_err(reason)
{
  return {type: LOGOUT_ERR, reason}
}

export function toggle_drawer()
{
  return {type: TOGGLE_DRAWER}
}

export function goto_dashboard()
{
  return {type: GOTO_DASHBOARD}
}
