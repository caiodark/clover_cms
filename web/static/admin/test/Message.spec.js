import Message from '../js/Message'
import {mount} from 'enzyme'
import React from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

const message = "Ciao!"

describe ('Simple message component', () => {
  const muiTheme = getMuiTheme()  
  const mountWithCtx = (node) => mount(node, {context: {muiTheme}})
  it('should render a div with a p tag and text inside', ()=>{
    const msg = mountWithCtx(<Message text={message} />)
    expect(msg.find('div')).toBeDefined()
    expect(msg.find('p')).toBeDefined()
    expect(msg.text()).toEqual(message)
  })  
})
