import AppHeader from '../js/AppHeader'
import {shallow} from 'enzyme'
import React from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

const logged_user = {username:"test", loggedIn:true}
const unlogged_user = {loggedIn: false}

const logged_out_click = ()=>{
  console.log("Logged out")
}

const hamburger_menu_click = ()=>{
  console.log("Hamburger")
}

describe('App Header component', () => {
  const muiTheme = getMuiTheme()
  const shallowWithContest = (node) => shallow(node, {context:{muiTheme}})
  it('should render a app bar', () => {
    const appBar = shallowWithContest(<AppHeader user={logged_user} onLogOutClick={logged_out_click} onHamburgerMenuClick={hamburger_menu_click} />)
    expect(appBar.find('AppBar')).toBeDefined()
  })
})
