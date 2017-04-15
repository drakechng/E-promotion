/**
 * Created by xiongchenyu on 8/2/17.
 */
import React, { Component, PropTypes } from "react";
import { createContainer } from "meteor/react-meteor-data";
import RenderEstamp from '../estamps/renderEstamp';
import ActionAssignment from "material-ui/svg-icons/action/assignment";
import { List, ListItem } from "material-ui/List";
import Avatar from "material-ui/Avatar";
import Subheader from "material-ui/Subheader";
import { yellow600 } from "material-ui/styles/colors";
import AddIcon from "material-ui/svg-icons/action/note-add";
import Paper from "material-ui/Paper";

export default class AddEstamp extends React.Component {
  constructor() {
    super();
    this.state = {
      zDepth: 1,
    };
  }
  addEstamp() {
    Meteor.call('members.addEstamps', this.props.customer, this.props.estamp._id, !this.props.active);
  }
  render() {
    const estamp = this.props.estamp;
    return (
      <Paper style={{ marginBottom: 50 }} zDepth={3}>
        <List key={estamp._id}>
          <Subheader inset={true}>{`${estamp.title}:${estamp.description}`}</Subheader>
          <Subheader inset={true}>{`Until:${estamp.valid_date.toLocaleString()}`}</Subheader>
          <ListItem
                        leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={yellow600} />}
                        rightIcon={<AddIcon />}
                        primaryText={estamp.name}
                        secondaryText={`Status: ${this.props.active}`}
                        onTouchTap={() => this.addEstamp()}
                    />
        </List>
      </Paper>
    );
  }
}
