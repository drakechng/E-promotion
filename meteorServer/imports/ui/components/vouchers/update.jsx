import React from 'react'
import {Form, Field} from 'simple-react-form'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar';
import {createContainer} from 'meteor/react-meteor-data'
import {Meteor} from 'meteor/meteor'
import {browserHistory} from 'react-router'
import vouchersData from '../../../api/vouchers/vouchersData'
import {connect} from 'react-redux'
import {openSnackBar,closeSnackBar} from '../../redux/actions/ui-actions'
import {bindActionCreators} from 'redux'

const propTypes = {
  voucher: React.PropTypes.object
}

class VouchersUpdate extends React.Component {

  constructor (props) {
    super(props)
  }
    handleTouchTap ()  {
        this.props.openSnackBar()
    }

    handleRequestClose () {
      this.props.closeSnackBar()
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
        onSuccess={()=>this.handleTouchTap()}>
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
          <Snackbar
              open={this.props.snackbarOpen}
              message="Vouchers Updated"
              autoHideDuration={2000}
              onRequestClose={()=>this.handleRequestClose()}
          />
      </div>
    )
  }

}

VouchersUpdate.propTypes = propTypes

const container = createContainer(({params}) => {
  const handler = Meteor.subscribe('voucher.update', params._id)
  const isLoading = !handler.ready()
  const voucher = vouchersData.findOne(params._id)
  return {isLoading, voucher}
}, VouchersUpdate)


function mapDispatchToProps(dispatch) {
    return {
        openSnackBar: bindActionCreators(openSnackBar,dispatch),
        closeSnackBar: bindActionCreators(closeSnackBar,dispatch)
    };
}

const mapStateToProps = state => ({
    snackbarOpen: state.userInterface.snackbarOpen,
});

export default connect(mapStateToProps, mapDispatchToProps)(container);
