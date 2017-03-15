import * as actions from '../js/actions'
import * as types   from '../js/actionTypes'

describe('actions', () => {
  it ('should create an action to request a Log In', () => {
    const username = "test"
    const password = "pass"
    const expected = {
      type: types.LOGIN_REQUEST,
      username,
      password
    }
    expect(actions.login_request(username, password)).toEqual(expected)
  })
  it ('should create an action to deal with login error', () => {
    const reason = ""
    const username = "admin"
    const expected = {
      type: types.LOGIN_ERR,
      username,
      reason
    }
    expect(actions.login_err(username, reason)).toEqual(expected)
  })
  it ('should create an action to deal with a successful login', () => {
    const name = "admin"
    const permissions = []
    const expected = {
      type: types.LOGIN_OK,
      name,
      permissions
    }
    expect(actions.login_ok(name, permissions)).toEqual(expected)
  })
  it ('should create an action to request a Log out', () => {
    const expected = {
      type: types.LOGOUT_REQUEST
    }
    expect(actions.logout_request()).toEqual(expected)
  })
  it ('should create an action to deal with Log out error', () => {
    const reason = ""
    const expected = {
      type: types.LOGOUT_ERR,
      reason
    }
    expect(actions.logout_err(reason)).toEqual(expected)
  })
  it ('should create an action to deal with Log out ok', () => {
    const reason = ""
    const expected = {
      type: types.LOGOUT_OK
    }
    expect(actions.logout_ok()).toEqual(expected)
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
  it ('should create an action to request forms'), () => {
    const expected = {
      type: types.FORM_REQUEST
    }
    expect(actions.form_request()).toEqual(expected)
  }
  it ('should create an action to process forms'), () => {
    const expected = {
      type: types.FORM_OK,
      forms: []
    }
    expect(actions.form_ok([])).toEqual(expected)
  }
  it ('should create an action to process forms error'), () => {
    const expected = {
      type: types.FORM_ERR,
      error: "error"
    }
    expect(actions.form_err("error")).toEqual(expected)
  }
  it ('should create an action to redirect to forms page', () => {
    const expected = {
      type: types.FORMS_REDIRECT
    }
    expect(actions.forms_redirect()).toEqual(expected)
  })
  it ('should create an action to close the drawer'), () => {
    const expected = {
      type: types.CLOSE_DRAWER
    }
    expect(actions.close_drawer()).toEqual(expected)
  }
  it ('should create an action to create a new form'), () => {
    const expected = {
      type: types.FORM_NEW
    }
    expect(actions.form_new()).toEqual(expected)
  }
})
