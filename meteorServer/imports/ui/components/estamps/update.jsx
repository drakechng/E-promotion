import React from 'react'
import {Form, Field} from 'simple-react-form'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar';
import {createContainer} from 'meteor/react-meteor-data'
import {Meteor} from 'meteor/meteor'
import {browserHistory} from 'react-router'
import estampsData from '../../../api/estamps/estampsData'
import {connect} from 'react-redux'
import {openSnackBar,closeSnackBar} from '../../redux/actions/ui-actions'
import {bindActionCreators} from 'redux'
const propTypes = {
  estamp: React.PropTypes.object
}

class EstampsUpdate extends React.Component {

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
        <h1>Estamp update</h1>
        <Form
        collection={estampsData}
        type='update'
        ref='form'
        doc={this.props.estamp}
        onSuccess={()=>this.handleTouchTap()}>
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
          <Snackbar
              open={this.props.snackbarOpen}
              message="Estamps Updated"
              autoHideDuration={2000}
              onRequestClose={()=>this.handleRequestClose()}
          />
      </div>
    )
  }

}

EstampsUpdate.propTypes = propTypes

const container = createContainer(({params}) => {
  const handler = Meteor.subscribe('estamps.update', params._id)
  const isLoading = !handler.ready()
  const estamp = estampsData.findOne(params._id)
  return {isLoading, estamp}
}, EstampsUpdate)

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
