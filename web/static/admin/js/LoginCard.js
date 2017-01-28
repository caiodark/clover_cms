import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import TextField from 'material-ui/TextField'
import {Grid, Row, Col} from 'react-flexbox-grid'
import {Card, CardTitle, CardText, CardActions} from 'material-ui/Card'
import {connect} from 'react-redux'
import {login} from './actions'
import CAppHeader from './containerAppHeader.js'

let cardStyle = 
{
  paddingTop: 40
}

let user
let pass

let LoginCard = ({dispatch}) => (
  <MuiThemeProvider>
    <Grid>
      <CAppHeader />
      <Row>
        <Col mdOffset={3} md={6} xs={12} style={cardStyle}>
	  <form onSubmit={e => {
	    e.preventDefault()
	    dispatch(login(user.getValue(), pass.getValue()))
	  }}>
	    <Card>
	      <CardTitle title="Login" subtitle="CloverLab CMS"/>
	      <CardText>
	        <div>
	          <TextField hintText="Inserire il nome utente" floatingLabelText="Nome utente" ref={node => user = node}/>
	        </div>
	        <div>
	          <TextField hintText="Inserire la password" floatingLabelText="Password" type="password" ref={node => pass = node}/>
	        </div>
	      </CardText> 
	      <CardActions>
                <FlatButton label="Login" type="submit"/>
                <FlatButton label="Cancel" type="reset"/>
	      </CardActions>
	    </Card>
	  </form>
	</Col>
      </Row>
    </Grid>
  </MuiThemeProvider>
)

LoginCard = connect()(LoginCard)

export default LoginCard
