import React, {PropTypes} from 'react'
import AppBar from 'material-ui/AppBar'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import AccountCircleIcon from 'material-ui/svg-icons/action/account-circle'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import Subheader from 'material-ui/Subheader'

const AppHeader = ({user, onLogOutClick, onHamburgerMenuClick}) => {

  const Logged = (props) => (
    <IconMenu
      {...props}
      iconButtonElement={<IconButton><AccountCircleIcon /></IconButton>}
      anchorOrigin={{horizontal:'right', vertical:'top'}}
      targetOrigin={{horizontal:'right', vertical:'top'}}
    >
      <Subheader>Salve {user.username}!</Subheader>
      <Divider inset={ true } />
      <MenuItem primaryText="Log out" onClick={()=> onLogOutClick()}/>
    </IconMenu> 
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
