import {cmsApp} from '../js/reducers'
import * as actions from '../js/actions'
import * as types from '../js/actionTypes'
import {browserHistory} from 'react-router'

jest.dontMock('react-router')

describe('reducers', () => {
  it('should request logout when receive logout_request action', ()=>{
    const action = actions.logout_request()
    const state = {}
    const expected = {logout:{isFetching:true}} 
    expect(cmsApp(state, action).logout).toEqual(expected.logout)
  })
  it('should complete logout when receive logout_ok action', ()=>{
    const action = actions.logout_ok()
    const state = {}
    const expected = {logout:{isFetching:false}, user:{isFetching: false, loggedIn: false}} 
    const result = cmsApp(state, action)
    expect(result.logout).toEqual(expected.logout)
    expect(result.user).toEqual(expected.user)
  })
  it('should fail logout when receive logout_err action', ()=>{
    const action = actions.logout_err("errore")
    const state = {user:{isFetching:false, name:"admin", permissions:[], loggedIn: true}}
    const expected = {logout:{isFetching:false}, user:state.user} 
    const result = cmsApp(state, action)
    expect(result.logout).toEqual(expected.logout)
    expect(result.user).toEqual(expected.user)
  })
  it('should request a login when receive login_request action', ()=>{
    const action = actions.login_request("test","test")
    const state = {}
    const expected = {user:{isFetching: true, loggedIn:false}}
    expect(cmsApp(state, action).user).toEqual(expected.user)
  })
  it('should fail a login when receive login_err action', ()=>{
    const action = actions.login_err("test","error")
    const state = {}
    const expected = {user:{isFetching: false, loggedIn:false}}
    expect(cmsApp(state, action).user).toEqual(expected.user)
  })
  it('should populate the user when receive login_ok action', ()=>{
    const action = actions.login_ok("admin",[])
    const state = {}
    const expected = {user:{isFetching: false, username: "admin", permissions: [], loggedIn:true}}
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
  it('should deal with a form request', ()=>{
    const action = actions.form_request()
    const state = {forms:{isFetching:false, list:[]}}
    const expected = {forms:{isFetching:true, list:[]}}
    expect(cmsApp(state, action).forms).toEqual(expected.forms)
  })
  it('should deal with a received form', ()=>{
    const list = [{a:""}]
    const action = actions.form_ok(list)
    const state = {forms:{isFetching:true, list: []}}
    const expected = {forms:{isFetching:false, list}}
    expect(cmsApp(state, action).forms).toEqual(expected.forms)
  })
  it('should deal with an error while fetching form', ()=> {
    const error = "Unknowen error"
    const action = actions.form_err(error)
    const state = {forms:{isFetching:true, list: []}}
    const expected = {forms:{isFetching:false, list: []}}
    expect(cmsApp(state, action).forms).toEqual(expected.forms)
  })
  it('should close the drawer', () => {
    const action = actions.close_drawer()
    const state = {ui:{drawer:true}}
    const expected = {ui:{drawer:false}}
    expect(cmsApp(state,action).ui).toEqual(expected.ui)
  })
})
