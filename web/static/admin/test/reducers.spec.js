import {cmsApp} from '../js/reducers'
import * as actions from '../js/actions'
import * as types from '../js/actionTypes'
import {browserHistory} from 'react-router'

jest.dontMock('react-router')

describe('reducers', () => {
  it('should logout when receive logout action', ()=>{
    const action = actions.logout()
    const state = {}
    const expected = {user:{loggedIn:false}} 
    expect(cmsApp(state, action).user).toEqual(expected.user)
  })
  it('should login when receive login action', ()=>{
    const action = actions.login("test","test")
    const state = {}
    const expected = {user:{username:"test",loggedIn:true}}
    expect(cmsApp(state, action).user).toEqual(expected.user)
  })
  it('shouldn\'t toggle the drawer if a user isn\'t logged in', ()=>{
    const action = actions.toggle_drawer()
    const state = {user:{loggedIn:false}, ui:{drawer:false}}
    const expected = {ui:{drawer:false}}
    expect(cmsApp(state, action).ui).toEqual(expected.ui)
  })
  it('should toggle the drawer', ()=>{
    const action = actions.toggle_drawer()
    const state = {user:{loggedIn:true}, ui:{drawer:false}}
    const expected = {ui:{drawer:true}}
    expect(cmsApp(state, action).ui).toEqual(expected.ui)
  })
  it('going to dashboard should set drawer to false', ()=>{
    const action = actions.goto_dashboard()
    const state = {ui:{drawer:true}}
    const expected = {ui:{drawer:false}}
    expect(cmsApp(state,action).ui).toEqual(expected.ui)
  })
})
