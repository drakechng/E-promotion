import React from 'react'
import Paper from 'material-ui/Paper'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import {createContainer} from 'meteor/react-meteor-data'
import {Meteor} from 'meteor/meteor'
import voucherData from '../../../api/vouchers/vouchersData'
import {browserHistory} from 'react-router'
import PageBase from '../PageBase';
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
        <PageBase title="Vouchers Management"
                  navigation="Application / Vouchers Management"
        >
      <div>
          <List>
            <ListItem primaryText='Create' onTouchTap={this.create}/>
            {this.renderPosts()}
          </List>
      </div>
        </PageBase>
    )
  }

}

PostsList.propTypes = propTypes
PostsList.defaultProps = defaultProps

export default createContainer(() => {
  const handler = Meteor.subscribe('vouchers.index')
  const isLoading = !handler.ready()
  const posts = voucherData.find().fetch()
  return {isLoading, posts}
}, PostsList)
