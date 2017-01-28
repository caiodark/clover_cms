import { LOGIN, LOGOUT, TOGGLE_DRAWER, GOTO_DASHBOARD } from './actionTypes'

export function login(username, password)
{
  return {type: LOGIN, username, password} 
}

export function logout()
{
  return {type: LOGOUT}
}

export function toggle_drawer()
{
  return {type: TOGGLE_DRAWER}
}

export function goto_dashboard()
{
  return {type: GOTO_DASHBOARD}
}
