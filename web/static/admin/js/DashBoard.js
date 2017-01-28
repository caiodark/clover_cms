import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Grid, Row, Col} from 'react-flexbox-grid'
import CAppHeader from './containerAppHeader.js'
import CAppMenu from './CAppMenu.js'

let DashBoard = () => (
  <MuiThemeProvider>
    <div>
      <Grid>
        <CAppHeader />
        <Row>
          <Col xs={12}>
	    Ciao
	  </Col>
        </Row>
      </Grid>
      <CAppMenu />
    </div>
  </MuiThemeProvider>
)

export default DashBoard
