import React, {PropTypes} from 'react'
import {Row, Col} from 'react-flexbox-grid'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import RaisedButton from 'material-ui/RaisedButton'

const LanguagesTable = ({languages, onOpen}) => {
  const rows = languages.map(el => {
      return (
	<TableRow key={`row_${el.id}`}>
	  <TableRowColumn>{el.id}</TableRowColumn>
	  <TableRowColumn>{el.name}</TableRowColumn>
	  <TableRowColumn>{el.url}</TableRowColumn>
	  <TableRowColumn><RaisedButton label="Apri" primary={true} onClick={()=>{onOpen(el.id)}}/></TableRowColumn>
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
		<TableHeaderColumn>Url</TableHeaderColumn>
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

LanguagesTable.propTypes = {
  languages : PropTypes.array.isRequired,
  onOpen    : PropTypes.func.isRequired
}

export default LanguagesTable
