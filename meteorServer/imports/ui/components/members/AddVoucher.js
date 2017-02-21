/**
 * Created by xiongchenyu on 24/1/17.
 */
import React, {Component, PropTypes} from "react";
import {createContainer} from "meteor/react-meteor-data";
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import {blue500, yellow600} from 'material-ui/styles/colors';
import AddIcon from 'material-ui/svg-icons/action/note-add';
import Paper from 'material-ui/Paper';


export default class AddVoucher extends React.Component{
   constructor(){
       super();
       this.state = {
           zDepth :1
       }
   }
    addVoucher(index,quantity){
        Meteor.call('members.addVouchers', this.props.customer,this.props.voucher._id,index,quantity)

    }
    renderVouchers(voucher,index){

        let quantity = 0;
        if(this.props.quantityMap[index] != undefined){
           quantity = this.props.quantityMap[index];
        }
        return(
        <ListItem
            key = {index+"dsfsf"}
            leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={yellow600} />}
            rightIcon={<AddIcon />}
            primaryText={voucher.name}
            secondaryText={"S$"+voucher.value+" Total Number: "+quantity}
            onTouchTap={()=>this.addVoucher(index,quantity+1)}
        />)
    }
    render() {
        return (
        <Paper style={{marginBottom:50}} zDepth={3} >
                    <List key = {this.props.voucher._id}>
                        <Subheader inset={true}>{this.props.voucher.title +":" + this.props.description}</Subheader>
                        <Subheader inset={true}>{"Until:"+this.props.voucher.valid_date.toLocaleString()}</Subheader>
                        {
                            this.props.voucher.vouchers.map((voucher,index)=>
                                this.renderVouchers(voucher,index)
                            )
                        }
                    </List>
        </Paper>

        )
    }
}

