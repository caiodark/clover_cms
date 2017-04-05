import React, {PropTypes} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Grid, Row, Col} from 'react-flexbox-grid'
import CAppHeader from '../containerAppHeader.js'
import CAppMenu from '../CAppMenu.js'
import SectionTitle from '../SectionTitle'
import FormDetail from '../CFormDetail'
import RightPanel from '../RightPanel'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Legend from '../Legend'

const Language = ({language, onChange, onCancel, onSave}) => {

  const sectionName = "Lingue"
  const headStyle = {
    position:"relative"
  }

  const nameErrors = language.errors.filter((el) => el.name === 'name')
  const nameError = nameErrors.length > 0 ? nameErrors[0].error : ''
  const urlErrors  = language.errors.filter((el) => el.name === 'url')
  const urlError  = urlErrors.length > 0 ? urlErrors[0].error : ''

  const setName = (event, newValue) => {
    const newState = Object.assign({}, language, {name: newValue})
    onChange(newState)
  }

  const setUrl = (event, newValue) => {
    const newState = Object.assign({}, language, {url: newValue})
    onChange(newState)
  }

  const dvStyle = {
    marginBottom : "15px"
  }

  const dvInside = {
    padding: "10px"
  }
  return (
    <MuiThemeProvider>
      <div>
        <CAppHeader/>
        <Grid>
          <Row>
	    <Col xs={12}>
              <div style={headStyle}>
                <SectionTitle sectionName={sectionName}/>
              </div>
	    </Col>
	  </Row>
          <Row>
            <Col xs={12} sm={12} md={8}>
              <Paper style={dvStyle} zDepth={1}>
                <Legend name={'Base'} />
                <div style={dvInside}>
                  <TextField floatingLabelText="Nome" value={language.name} onChange={setName} errorText={nameError}/><br/>
                  <TextField floatingLabelText="Url" value={language.url} onChange={setUrl} errorText={urlError}/><br/>
                </div>
              </Paper>
            </Col>
            <Col xs={12} sm={12} md={4}>
	      <RightPanel onAnnullaClicked={onCancel} onSalvaClicked={() => onSave(language)}/>
            </Col>	
          </Row>
        </Grid>
	<CAppMenu/>
      </div>
    </MuiThemeProvider>    
  )

}

Language.propTypes = {
  language : PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    url: PropTypes.string,
    errors: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      error: PropTypes.string
    }))
  }),
  onChange : PropTypes.func.isRequired,
  onCancel : PropTypes.func.isRequired,
  onSave   : PropTypes.func.isRequired
}

export default Language
