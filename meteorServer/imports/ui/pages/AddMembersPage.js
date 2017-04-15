import React from "react";
import { createContainer } from "meteor/react-meteor-data";
import { GridList, GridTile } from "material-ui/GridList";
import IconButton from "material-ui/IconButton";
import Snackbar from "material-ui/Snackbar";
import PersonAddIcon from "material-ui/svg-icons/social/person-add";
import Subheader from "material-ui/Subheader";
import PageBase from "../components/PageBase";
import { connect } from "react-redux";
import { openSnackBar, closeSnackBar } from "../redux/actions/ui-actions";
import { bindActionCreators } from "redux";
const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 450,
    overflowY: 'auto',
  },
};
class AddMember extends React.Component {

  addMember(customer_id, options = []) {
    Meteor.call('members.upsert', customer_id, options, (error, result) => {
      this.handleRequestSuccess();
    });
  }

  handleRequestSuccess() {
    this.props.openSnackBar();
  }

  handleRequestClose() {
    this.props.closeSnackBar();
  }

  render() {
    return (
      <PageBase
title="Add Customer Page"
                      navigation="Application / Add Customer Page"
            >
        <GridList
                    cellHeight={180}
                    style={styles.gridList}
                >
          <Subheader>Available Customers</Subheader>
          {this.props.customers.map(customer => (
            <GridTile
                                key={customer._id}
                                title={customer.username}
                                subtitle={<span>email <b>{customer.email}</b></span>}
                                actionIcon={<IconButton onClick={() => this.addMember(customer._id)}><PersonAddIcon color="white" /></IconButton>}
                            >
              <img src={"https://avatarfiles.alphacoders.com/139/13900.gif"} />
            </GridTile>
                        ),
                    )}
        </GridList>
        <Snackbar
                    open={this.props.snackbarOpen}
                    message="Member Add Success"
                    autoHideDuration={2000}
                    onRequestClose={() => this.handleRequestClose()}
                />
      </PageBase>);
  }
}

const container = createContainer(() => {
  Meteor.subscribe('members');
  Meteor.subscribe('customers');
  return {
    customers: Meteor.users.find({ "profile.type": "c" }).fetch(),
  };
},
    AddMember);
function mapDispatchToProps(dispatch) {
  return {
    openSnackBar: bindActionCreators(openSnackBar, dispatch),
    closeSnackBar: bindActionCreators(closeSnackBar, dispatch),
  };
}

const mapStateToProps = state => ({
  snackbarOpen: state.userInterface.snackbarOpen,
});

export default connect(mapStateToProps, mapDispatchToProps)(container);
