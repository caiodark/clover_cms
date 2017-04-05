import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import React, {PropTypes} from 'react'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import {Link} from 'react-router'

const AppMenu = ({open, language, onCloseClick, onDashboardClick, onFormsClick, onLanguagesClick}) => {
  const menuLanguage = language ? <MenuItem primaryText="Lingue" onClick={() => onLanguagesClick()}/> : undefined
  
  return (
    <Drawer open = {open }>
      <Subheader>CMS</Subheader>
      <MenuItem primaryText="Dashboard" onClick={() => onDashboardClick()}/>
      <MenuItem primaryText="Forms" onClick={() => onFormsClick()}/>
      <Divider />
      {menuLanguage}
      <MenuItem primaryText="Chiudi" onClick={()=>onCloseClick()}/>
    </Drawer>
  )
}

AppMenu.propTypes = {
 open : PropTypes.bool.isRequired,
 language: PropTypes.bool.isRequired,
 onCloseClick: PropTypes.func.isRequired,
 onDashboardClick: PropTypes.func.isRequired,
 onFormsClick: PropTypes.func.isRequired,
 onLanguagesClick: PropTypes.func.isRequired
}

export default AppMenu
