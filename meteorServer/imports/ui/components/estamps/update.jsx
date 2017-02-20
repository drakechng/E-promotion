import React from 'react'
import {Form, Field} from 'simple-react-form'
import RaisedButton from 'material-ui/RaisedButton'
import {createContainer} from 'meteor/react-meteor-data'
import {Meteor} from 'meteor/meteor'
import {browserHistory} from 'react-router'
import estampsData from '../../../api/estamps/estampsData'

const propTypes = {
  estamp: React.PropTypes.object
}

class EstampsUpdate extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
    this.showSuccessMessage = this.showSuccessMessage.bind(this)
  }

  showSuccessMessage () {
    this.setState({successMessage: 'Estamp saved'})
    setTimeout(() => {
      this.setState({successMessage: null})
    }, 1000)
  }

  render () {
    return (
      <div>
        <h1>Estamp update</h1>
        <Form
        collection={estampsData}
        type='update'
        ref='form'
        doc={this.props.estamp}
        onSuccess={this.showSuccessMessage}>
          <Field fieldName='title'/>
          <Field fieldName='description'/>
          <Field fieldName='start_date'/>
          <Field fieldName='valid_date'/>
            <Field fieldName='max'/>
        </Form>
        <br/>
        <div>
          <RaisedButton label='Back' onTouchTap={() => browserHistory.push('/estampsList')}/>
          <RaisedButton primary label='Save' onTouchTap={() => this.refs.form.submit()}/>
        </div>
        <p>
          {this.state.successMessage}
        </p>
      </div>
    )
  }

}

EstampsUpdate.propTypes = propTypes

export default createContainer(({params}) => {
  const handler = Meteor.subscribe('estamps.update', params._id)
  const isLoading = !handler.ready()
  const estamp = estampsData.findOne(params._id)
  return {isLoading, estamp}
}, EstampsUpdate)
