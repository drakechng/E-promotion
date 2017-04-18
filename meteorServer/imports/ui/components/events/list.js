import React from "react";
import { browserHistory } from "react-router";
import { Meteor } from "meteor/meteor";
import { convertFromRaw, Editor, EditorState } from 'draft-js';
import { List, ListItem } from "material-ui/List";
import Divider from "material-ui/Divider";
import { createContainer } from "meteor/react-meteor-data";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import eventsData from "../../../api/events/eventsData";
import PageBase from "../PageBase";

const propTypes = {
  events: React.PropTypes.array.isRequired,
};

const defaultProps = {};

class EventsList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <PageBase
        title="Events Management"
        navigation="Application / Events Management"
      >
        <div>
          <List>
            <ListItem primaryText="Create Event" onTouchTap={() => browserHistory.push('/eventCreate')} />
            <Divider />
            {this.props.events.map(event => 
              <div key={event._id}>
                <Card>
                  <CardHeader
                    title={event.content}
                    subtitle={event.date.toLocaleString()}
                  />
                  <CardMedia>
                    <Editor
                      editorState={EditorState.createWithContent(convertFromRaw(event.subject))}
                      readOnly="true" 
                    />
                  </CardMedia>
                  <CardActions></CardActions>
                </Card>
              </div>,
            )}
          </List>
        </div>
      </PageBase>
    );
  }

}

EventsList.propTypes = propTypes;
EventsList.defaultProps = defaultProps;

export default createContainer(() => {
  Meteor.subscribe('events.index');
  const events = eventsData.find({}).fetch();
  return { events };
}, EventsList);
