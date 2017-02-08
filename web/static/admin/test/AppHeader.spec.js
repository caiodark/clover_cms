import AppHeader from '../js/AppHeader'
import {shallow} from 'enzyme'
import React from 'react'

const logged_user = {username:"test", loggedIn:true}
const unlogged_user = {loggedIn: false}

const logged_out_click = ()=>{
  console.log("Logged out")
}

const hamburger_menu_click = ()=>{
  console.log("Hamburger")
}

describe('App Header component', () => {
  it('should render a app bar', () => {
    const appBar = shallow(<AppHeader user={logged_user} onLogOutClick={logged_out_click} onHamburgerMenuClick={hamburger_menu_click} />)
    expect(appBar.find('AppBar')).toBeDefined()
  })
})
