import React, {PropTypes} from 'react'
import {Row, Col} from 'react-flexbox-grid'
import AppBar from 'material-ui/AppBar'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import MenuItem from 'material-ui/MenuItem'



const AppHeader = ({user, onLogOutClick}) => {

  const Logged = (props) => (
    <IconMenu
      {...props}
      iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
      anchorOrigin={{horizontal:'right', vertical:'top'}}
      targetOrigin={{horizontal:'right', vertical:'top'}}
    >
      <MenuItem primaryText="Log out" onClick={()=> onLogOutClick()}/>
    </IconMenu> 
  )

  return (
    <Row>
      <Col xs={12}>
        <AppBar title="CloverLab CMS" iconElementRight={user.loggedIn === true ? <Logged /> : <span/>}/>
      </Col>
    </Row>
  )
}

AppHeader.propTypes = {
  user : PropTypes.shape({
    username: PropTypes.string,
    loggedIn: PropTypes.bool.isRequired
  }),
  onLogOutClick : PropTypes.func.isRequired
}

export default AppHeader
