import React from 'react'
import {Form, Field} from 'simple-react-form'
import RaisedButton from 'material-ui/RaisedButton'
import {createContainer} from 'meteor/react-meteor-data'
import {Meteor} from 'meteor/meteor'
import {browserHistory} from 'react-router'
import Posts from '../../../api/schema-crud/posts'

const propTypes = {
  post: React.PropTypes.object
}

class PostsUpdate extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
    this.showSuccessMessage = this.showSuccessMessage.bind(this)
  }

  showSuccessMessage () {
    this.setState({successMessage: 'Post saved'})
    setTimeout(() => {
      this.setState({successMessage: null})
    }, 1000)
  }

  render () {
    return (
      <div>
        <h1>Post update</h1>
        <Form
        collection={Posts}
        type='update'
        ref='form'
        doc={this.props.post}
        onSuccess={this.showSuccessMessage}>
          <Field fieldName='title'/>
          <Field fieldName='title'/>
          <Field fieldName='body'/>
          <Field fieldName='date'/>
          <Field fieldName='authors'>
            <Field fieldName='name'/>
            <Field fieldName='age'/>
          </Field>
          <Field fieldName='editor'>
            <Field fieldName='name'/>
            <Field fieldName='age'/>
          </Field>
        </Form>
        <br/>
        <div>
          <RaisedButton label='Back' onTouchTap={() => browserHistory.push('/list')}/>
          <RaisedButton primary label='Save' onTouchTap={() => this.refs.form.submit()}/>
        </div>
        <p>
          {this.state.successMessage}
        </p>
      </div>
    )
  }

}

PostsUpdate.propTypes = propTypes

export default createContainer(({params}) => {
  const handler = Meteor.subscribe('simpleSchemaCrud.update', params._id)
  const isLoading = !handler.ready()
  const post = Posts.findOne(params._id)
  return {isLoading, post}
}, PostsUpdate)
