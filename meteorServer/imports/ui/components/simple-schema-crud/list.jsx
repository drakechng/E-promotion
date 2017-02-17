import React from 'react'
import Paper from 'material-ui/Paper'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import {createContainer} from 'meteor/react-meteor-data'
import {Meteor} from 'meteor/meteor'
import Posts from '../../../api/schema-crud/posts'
import {browserHistory} from 'react-router'
const propTypes = {
  posts: React.PropTypes.array.isRequired,
  isLoading: React.PropTypes.bool.isRequired
}

const defaultProps = {

}

class PostsList extends React.Component {

  constructor (props) {
    super(props)
    this.create = this.create.bind(this)
  }

  create () {
      browserHistory.push('/create');
  }

  renderPosts () {
    return this.props.posts.map(post => {
      const onTouchTap = () => browserHistory.push('/update/'+post._id)
      return (
        <ListItem key={post._id} primaryText={post.title} onTouchTap={onTouchTap}/>
      )
    })
  }

  render () {
    return (
      <div>
        <h1>Simple Schema Example</h1>
        <Paper>
          <List>
            <Subheader>Posts</Subheader>
            <ListItem primaryText='Create' onTouchTap={this.create}/>
            {this.renderPosts()}
          </List>
        </Paper>
      </div>
    )
  }

}

PostsList.propTypes = propTypes
PostsList.defaultProps = defaultProps

export default createContainer(() => {
  const handler = Meteor.subscribe('simpleSchemaCrud.index')
  const isLoading = !handler.ready()
  const posts = Posts.find().fetch()
  return {isLoading, posts}
}, PostsList)
