import * as actions from '../js/actions'
import * as types   from '../js/actionTypes'

describe('actions', () => {
  it ('should create an action to Log In', () => {
    const username = "test"
    const password = "pass"
    const expected = {
      type: types.LOGIN,
      username,
      password
    }
    expect(actions.login(username, password)).toEqual(expected)
  })
  it ('should create an action to Log out', () => {
    const expected = {
      type: types.LOGOUT
    }
    expect(actions.logout()).toEqual(expected)
  })
  it ('should create an action to toggle the drawer', () => {
    const expected = {
      type: types.TOGGLE_DRAWER
    }
    expect(actions.toggle_drawer()).toEqual(expected)
  })
  it ('should create an action to go to dashboard', () => {
    const expected = {
      type: types.GOTO_DASHBOARD
    }
    expect(actions.goto_dashboard()).toEqual(expected)
  })
})
