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
})
