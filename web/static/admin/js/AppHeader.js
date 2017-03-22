import React, {PropTypes} from 'react'
import AppBar from 'material-ui/AppBar'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import AccountCircleIcon from 'material-ui/svg-icons/action/account-circle'
import MenuItem from 'material-ui/MenuItem'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'

const AppHeader = ({user, onLogOutClick, onHamburgerMenuClick}) => {
  const iconStyler = {
    color: "#ffffff",
    fill: "#ffffff"
  }

  const greetStyle = {
    color: "#ffffff",
    fontSize: "12px"
  }

  const Logged = (props) => (
    <div>
    <span style={greetStyle}>{user.username}</span>
    <IconMenu
      {...props}
      iconButtonElement={<IconButton iconStyle={iconStyler}><AccountCircleIcon /></IconButton>}
      anchorOrigin={{horizontal:'right', vertical:'top'}}
      targetOrigin={{horizontal:'right', vertical:'top'}}
    >
      <MenuItem primaryText="Log out" onClick={()=> onLogOutClick()}/>
    </IconMenu>
    </div>
  )

  return (
    <AppBar title="CloverLab CMS" 
            iconElementLeft={<IconButton onClick={() => onHamburgerMenuClick()}><NavigationMenu /></IconButton>} 
            iconElementRight={user.loggedIn === true ? <Logged /> : <span/>}/>
  )
}

AppHeader.propTypes = {
  user : PropTypes.shape({
    username: PropTypes.string,
    loggedIn: PropTypes.bool.isRequired
  }),
  onLogOutClick : PropTypes.func.isRequired,
  onHamburgerMenuClick : PropTypes.func.isRequired
}

export default AppHeader
