import React from "react";
import { Meteor } from "meteor/meteor";
import { List, ListItem } from "material-ui/List";
import Divider from "material-ui/Divider";
import { createContainer } from "meteor/react-meteor-data";
import estampsData from "../../../api/estamps/estampsData";
import { browserHistory } from "react-router";
import PageBase from "../PageBase";

const propTypes = {
  estamps: React.PropTypes.array.isRequired,
  isLoading: React.PropTypes.bool.isRequired,
};

const defaultProps = {};

class EventsList extends React.Component {

  constructor(props) {
    super(props);
    this.create = this.create.bind(this);
  }

  create() {
    browserHistory.push('/eventCreate');
  }

  render() {
    return (
      <PageBase
title="Events Management"
        navigation="Application / Events Management"
      >
        <div>
          <List>
            <ListItem primaryText="Create Event" onTouchTap={this.create} />
            <Divider />
          </List>
        </div>
      </PageBase>
    );
  }

}

EventsList.propTypes = propTypes;
EventsList.defaultProps = defaultProps;

export default createContainer(() => {
  const handler = Meteor.subscribe('estamps.index');
  const isLoading = !handler.ready();
  const estamps = estampsData.find().fetch();
  return { isLoading, estamps };
}, EventsList);
