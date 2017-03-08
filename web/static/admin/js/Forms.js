import React, {PropTypes} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Grid, Row, Col} from 'react-flexbox-grid'
import CAppHeader from './containerAppHeader.js'
import CAppMenu from './CAppMenu.js'
import SectionTitle from './SectionTitle'
import Message from './Message'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

const Forms = ({forms, onNewClicked}) => {
  const sectionName = "Forms"
  
  const noData = () => {
    return (
    <Message text={"Nessun form presente nel sistema."} />
    )
  }
  const headStyle = {
    position:"relative"
  }

  const addButtonStyle = {
    position:"absolute",
    right: "25px",
    top: "25px"
  }

  const dataSection = forms === [] ? noData : noData

  return (
    <MuiThemeProvider>
      <div>
        <CAppHeader/>
        <Grid>
          <Row>
	    <Col xs={12}>
	      <div style={headStyle}>
	      <SectionTitle sectionName={sectionName}/>
	      <FloatingActionButton style={addButtonStyle} onClick={()=>{onNewClicked()}}>
		<ContentAdd/>
	      </FloatingActionButton>
	      </div>
	    </Col>
	 </Row>
	 <Row>
	   <Col xs={12}>
	   {dataSection()}
	   </Col>
	 </Row>
        </Grid>
	<CAppMenu/>
      </div>
    </MuiThemeProvider>    
  )
}

Forms.propTypes = {
  forms : PropTypes.array.isRequired,
  onNewClicked: PropTypes.func.isRequired
}

export default Forms
