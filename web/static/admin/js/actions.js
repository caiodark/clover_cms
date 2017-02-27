import fetch from 'isomorphic-fetch'
import { LOGIN_OK, 
         LOGIN_REQUEST, 
	 LOGIN_ERR, 
	 LOGOUT_REQUEST,
	 LOGOUT_OK,
	 LOGOUT_ERR, 
	 TOGGLE_DRAWER, 
	 GOTO_DASHBOARD } from './actionTypes'

export function login_request(username, password)
{
  return {type: LOGIN_REQUEST, username, password} 
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
    return fetch('https://localhost:3000/api/admin/users/authenticate', {
	method: 'POST',
        body: {username, password}	
	})
      .then(response => response.json())
      .then(json => dispatch(login_ok(json.data.name, json.data.permissions)))
      .catch(response => dispatch(login_err(username, response.body())))
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
