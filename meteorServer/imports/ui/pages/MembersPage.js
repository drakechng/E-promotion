import React from "react";
import {Link} from "react-router";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentCreate from "material-ui/svg-icons/content/create";
import ContentAdd from "material-ui/svg-icons/content/add";
import {createContainer} from "meteor/react-meteor-data";
import {pink500, grey200, grey500} from "material-ui/styles/colors";
import PageBase from "../components/PageBase";
import {MembersData} from "../../api/members/membersData";
const styles = {
        floatingActionButton: {
            margin: 0,
            top: 'auto',
            right: 20,
            bottom: 20,
            left: 'auto',
            position: 'fixed',
        },
        editButton: {
            fill: grey500
        },
        columns: {
            id: {
                width: '10%'
            },
            name: {
                width: '40%'
            },
            price: {
                width: '20%'
            },
            category: {
                width: '20%'
            },
            edit: {
                width: '10%'
            }
        }
    };
class MembersPage extends React.Component{

    handleCellClick(rowNumber, columnNumber, event) {
        console.log("activityId", rowNumber);
    }

    render() {
        return (
            <PageBase title="Customer Page"
                      navigation="Application / Customer Page"
            >

                <Link to="/form">
                    <FloatingActionButton style={styles.floatingActionButton} iconStyle={{backgroundColor: pink500}}>
                        <ContentAdd />
                    </FloatingActionButton>
                </Link>

                <Table onCellClick={this.handleCellClick}>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn style={styles.columns.name}>Name</TableHeaderColumn>
                            <TableHeaderColumn style={styles.columns.edit}>Edit</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {this.props.members.map(member =>
                            <TableRow key={member._id}>
                                <TableRowColumn style={styles.columns.name}>{member.username}</TableRowColumn>
                                <TableRowColumn style={styles.columns.edit}>
                                    <Link className="button" to= {"/membersList/" + member._id}>
                                        <FloatingActionButton zDepth={0}
                                                              mini={true}
                                                              backgroundColor={grey200}
                                                              iconStyle={styles.editButton}>
                                            <ContentCreate  />
                                        </FloatingActionButton>
                                    </Link>
                                </TableRowColumn>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                {this.props.children}
            </PageBase>
        );
    }
}
;


export default createContainer(() => {
    Meteor.subscribe('members');
    return {
        members: MembersData.find({merchant: Meteor.userId()}, {sort: {createdAt: -1}}).fetch(),
    };
}, MembersPage);