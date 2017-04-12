import React from "react";
import {List, ListItem} from "material-ui/List";
import Divider from "material-ui/Divider";
import {createContainer} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor";
import eventsData from "../../../api/events/server/publications";
import {browserHistory} from "react-router";
import RenderEstamp from './renderEstamp'
import PageBase from "../PageBase";
import {convertFromRaw,Editor, EditorState} from 'draft-js';

const propTypes = {
  estamps: React.PropTypes.array.isRequired,
  isLoading: React.PropTypes.bool.isRequired
}

const defaultProps = {}

class EventsList extends React.Component {

  constructor(props) {
    super(props)
    this.create = this.create.bind(this)
  }

  create() {
    browserHistory.push('/editor');
  }

  render() {
    return (
      <PageBase
        title="Events Management"
        navigation="Application / Events Management"
      >
        <div>
          <List>
            <ListItem
              primaryText='Create'
              onTouchTap={this.create}
            />
            <Divider />
            {
              this.props.events.map(estamp=>
                <p>estamp.subject<p/>
                <Editor
                  customStyleMap={styleMap}
                  editorState={estamp.editorState}
                />
                <p>estamp.date<p/>
              )
            }
            <List/>
            <div/>
            <PageBase/>
            )
            }
            }

            EventsList.propTypes = propTypes
            EventsList.defaultProps = defaultProps

            export default createContainer(() => {
              const events = eventsData.find().fetch()
              return {events}
            }, EventsList)
