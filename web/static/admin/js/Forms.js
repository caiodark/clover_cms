import React, {PropTypes} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Grid, Row, Col} from 'react-flexbox-grid'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import CAppHeader from './containerAppHeader.js'
import CAppMenu from './CAppMenu.js'
import SectionTitle from './SectionTitle'
import Message from './Message'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import FormDetail from './CFormDetail'
import RightPanel from './RightPanel'
import RaisedButton from 'material-ui/RaisedButton'

const Forms = ({forms, view, formToEdit, onNewClicked, onAnnullaClicked, onSaveClicked, onOpenClicked}) => {
  const sectionName = "Forms"
  
  const noData = () => {
    return (
      <Row>
        <Col xs={12} sm={12} md={8}>
	  <Message text={"Non sono presenti form nel sistema."} />
	</Col>
      </Row>
    )
  }

  const thereData = () => {
    const rows = forms.map(el => {
      return (
	<TableRow key={`row_${el.id}`}>
	  <TableRowColumn>{el.id}</TableRowColumn>
	  <TableRowColumn>{el.name}</TableRowColumn>
	  <TableRowColumn><RaisedButton label="Apri" primary={true} onClick={() => {onOpenClicked(el.id)}}/></TableRowColumn>
	</TableRow>
      )
    })

    return (
      <Row>
        <Col xs={12} sm={12} md={8}>
          <Table>
	    <TableHeader displaySelectAll={false}>
	      <TableRow>
	        <TableHeaderColumn>ID</TableHeaderColumn>
	        <TableHeaderColumn>Name</TableHeaderColumn>
		<TableHeaderColumn>{' '}</TableHeaderColumn>
	      </TableRow>
	    </TableHeader>
	    <TableBody displayRowCheckbox={false}>
	      {rows}
	    </TableBody>
	  </Table>
	</Col>
      </Row>
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

  const listHeader = (
    <div style={headStyle}>
      <SectionTitle sectionName={sectionName}/>
      <FloatingActionButton secondary={true} style={addButtonStyle} onClick={()=>{onNewClicked()}}>
        <ContentAdd/>
      </FloatingActionButton>
    </div>
  )

  const formHeader = (
    <div style={headStyle}>
      <SectionTitle sectionName={sectionName}/>
    </div>
  )
  const dataSectionList = forms === [] && view === "list" ? noData : thereData

  const dataSectionDetail = () => (
      <Row>
        <Col xs={12} sm={12} md={8}>
          <FormDetail/>
        </Col>
        <Col xs={12} sm={12} md={4}>
	  <RightPanel onAnnullaClicked={onAnnullaClicked} onSalvaClicked={() => onSaveClicked(formToEdit)}/>
        </Col>	
      </Row>
  )
  
  let header = view === "list" ? listHeader : formHeader
  const dataSection = view === "list" ? dataSectionList : dataSectionDetail

  return (
    <MuiThemeProvider>
      <div>
        <CAppHeader/>
        <Grid>
          <Row>
	    <Col xs={12}>
	      {header}
	    </Col>
	 </Row>
	 {dataSection()}
        </Grid>
	<CAppMenu/>
      </div>
    </MuiThemeProvider>    
  )
}

Forms.propTypes = {
  forms : PropTypes.array.isRequired,
  view  : PropTypes.string.isRequired,
  formToEdit: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    defaultMessage: PropTypes.string,
    errors: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      error: PropTypes.string
    }))
  }),
  onNewClicked: PropTypes.func.isRequired,
  onAnnullaClicked: PropTypes.func.isRequired,
  onSaveClicked: PropTypes.func.isRequired,
  onOpenClicked: PropTypes.func.isRequired
}

export default Forms
