import { LOGIN, LOGOUT } from './actionTypes'

export function login(username, password)
{
  return {type: LOGIN, username, password} 
}

export function logout()
{
  return {type: LOGOUT}
}
