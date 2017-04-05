import React, {PropTypes} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Grid, Row, Col} from 'react-flexbox-grid'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import CAppHeader from '../containerAppHeader.js'
import CAppMenu from '../CAppMenu.js'
import SectionTitle from '../SectionTitle'
import Message from '../Message'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import FormDetail from '../CFormDetail'
import RightPanel from '../RightPanel'
import RaisedButton from 'material-ui/RaisedButton'
import LanguagesTable from './LanguagesTable'

const Languages = ({languages, onNewLanguage, onOpenLanguage}) =>
{
  const sectionName = "Lingue"
  const headStyle = {
    position:"relative"
  }

  const addButtonStyle = {
    position:"absolute",
    right: "25px",
    top: "25px"
  }

  const noData = () => {
    return (
      <Row>
        <Col xs={12} sm={12} md={8}>
	  <Message text={"Non sono presenti lingue nel sistema."} />
	</Col>
      </Row>
    )
  }

  const theresData = () => {
    console.log(languages.length)
    return (
	<LanguagesTable languages={languages} onOpen={onOpenLanguage}/>
    )
  }

  const dataSection = languages.length === 0 ? noData() : theresData()

  return (
    <MuiThemeProvider>
      <div>
        <CAppHeader/>
        <Grid>
          <Row>
	    <Col xs={12}>
              <div style={headStyle}>
                <SectionTitle sectionName={sectionName}/>
                <FloatingActionButton secondary={true} style={addButtonStyle} onClick={()=>{onNewLanguage()}}> 
                  <ContentAdd/>
                </FloatingActionButton>
              </div>
	    </Col>
	  </Row>
	  {dataSection}
        </Grid>
	<CAppMenu/>
      </div>
    </MuiThemeProvider>    
  )
}

Languages.propTypes = {
  languages : PropTypes.array.isRequired,
  onNewLanguage: PropTypes.func.isRequired,
  onOpenLanguage: PropTypes.func.isRequired
}

export default Languages
