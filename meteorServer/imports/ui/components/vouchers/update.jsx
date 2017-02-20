import React from 'react'
import {Form, Field} from 'simple-react-form'
import RaisedButton from 'material-ui/RaisedButton'
import {createContainer} from 'meteor/react-meteor-data'
import {Meteor} from 'meteor/meteor'
import {browserHistory} from 'react-router'
import vouchersData from '../../../api/vouchers/vouchersData'

const propTypes = {
  voucher: React.PropTypes.object
}

class VouchersUpdate extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
    this.showSuccessMessage = this.showSuccessMessage.bind(this)
  }

  showSuccessMessage () {
    this.setState({successMessage: 'Voucher saved'})
    setTimeout(() => {
      this.setState({successMessage: null})
    }, 1000)
  }

  render () {
    return (
      <div>
        <h1>Voucher update</h1>
        <Form
        collection={vouchersData}
        type='update'
        ref='form'
        doc={this.props.voucher}
        onSuccess={this.showSuccessMessage}>
          <Field fieldName='title'/>
          <Field fieldName='description'/>
          <Field fieldName='start_date'/>
          <Field fieldName='valid_date'/>
          <Field fieldName='vouchers'>
            <Field fieldName='name'/>
            <Field fieldName='value'/>
          </Field>
          <Field fieldName='editor'>
            <Field fieldName='name'/>
            <Field fieldName='value'/>
          </Field>
        </Form>
        <br/>
        <div>
          <RaisedButton label='Back' onTouchTap={() => browserHistory.push('/vouchersList')}/>
          <RaisedButton primary label='Save' onTouchTap={() => this.refs.form.submit()}/>
        </div>
        <p>
          {this.state.successMessage}
        </p>
      </div>
    )
  }

}

VouchersUpdate.propTypes = propTypes

export default createContainer(({params}) => {
  const handler = Meteor.subscribe('voucher.update', params._id)
  const isLoading = !handler.ready()
  const voucher = vouchersData.findOne(params._id)
  return {isLoading, voucher}
}, VouchersUpdate)