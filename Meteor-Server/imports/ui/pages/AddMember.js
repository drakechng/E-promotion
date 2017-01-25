import React from 'react'
import SubNavBar from '../components/SubNavBar'
import {createContainer} from 'meteor/react-meteor-data'


const AddMember = React.createClass({

    addMember(customer_id,options =[]){
       Meteor.call('members.upsert',customer_id,options)
    },
    render() {
        return <div  className="content-wrapper" style={{minHeight : 997+"px"}}>
            <SubNavBar title = "Events"/>    <section className="content">
              <div className="row">
            {this.props.customers.map((customer)=>


                <button onClick={()=>this.addMember(customer._id)}>{customer.username}</button>

            )}</div></section>
        </div>
    }
})

export default createContainer(()=>{
Meteor.subscribe('members');
Meteor.subscribe('customers');
    return{
    customers: Meteor.users.find({"profile.type":"c"}).fetch(),
    };
},
    AddMember);
