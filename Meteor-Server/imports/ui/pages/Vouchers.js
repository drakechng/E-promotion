import React, {Component, PropTypes} from 'react';
import NavLink from '../Layouts/NavLink'
import { createContainer } from 'meteor/react-meteor-data'
import { VouchersData } from '../../api/vouchers/vouchersData'

import SubNavBar from '../components/SubNavBar'
const Vouchers =React.createClass({
    getInitialState () {
        return {
            hideCompleted: false,
        };
    },
    contextTypes:{
       router: React.PropTypes.object
    },
  handleSubmit(event) {
    event.preventDefault();
    const value = event.target.elements[0].value;
    const validTime = event.target.elements[1].value;
    const path = `/vouchers/${value}/${validTime}`;

      Meteor.call('vouchers.insert', value,validTime);
      // Clear form
      event.target.elements[0].value = "";
      event.target.elements[1].value = "";
      this.context.router.push(path);

  },
    renderVouchers() {
        let filteredVouchers = this.props.vouchers;
        if (this.state.hideCompleted) {
            filteredVouchers = filteredVouchers.filter(voucher => !voucher.checked);
        }
        return filteredVouchers.map((voucher) => {
            const currentUserId = this.props.currentUser && this.props.currentUser._id;

            return (
                <li key={voucher.createdAt.toLocaleTimeString()}><NavLink to={"/vouchers/"+voucher.value+"/"+voucher.validTime}>{"S$"+voucher.value}</NavLink></li>
            );
        });
    },

  render() {
    return (
      <div  className="content-wrapper" style={{minHeight : 997+"px"}}>
          <SubNavBar title = "Voucher"/>
          <section className="content">
              <div className="row">
        <ul>
          <li>
            <form onSubmit={this.handleSubmit}>
              <input type="text" placeholder="Voucher Price"/> / {' '}
              <input type="date" placeholder="Validation Time"/>{' '}
              <button type="submit">Go</button>
            </form>
          </li>
            {this.renderVouchers()}
        </ul>
                  {this.props.children}</div>
          </section>
      </div>
    )
  }
})


export default createContainer(() => {
    Meteor.subscribe('vouchers');
    return {
        vouchers: VouchersData.find({}, { sort: { createdAt: -1 } }).fetch(),
    };
}, Vouchers);
