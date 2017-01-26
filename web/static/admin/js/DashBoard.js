import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Grid, Row, Col} from 'react-flexbox-grid'
import CAppHeader from './containerAppHeader.js'

let DashBoard = () => (
  <MuiThemeProvider>
    <Grid>
      <CAppHeader />
      <Row>
        <Col xs={12}>
	  Ciao
	</Col>
      </Row>
    </Grid>
  </MuiThemeProvider>
)

export default DashBoard
