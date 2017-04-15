import React from "react";
import { List, ListItem } from "material-ui/List";
import { createContainer } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import voucherData from "../../../api/vouchers/vouchersData";
import { browserHistory } from "react-router";
import PageBase from "../PageBase";
const propTypes = {
  vouchers: React.PropTypes.array.isRequired,
  isLoading: React.PropTypes.bool.isRequired,
};

const defaultProps = {};

class VouchersList extends React.Component {

  constructor(props) {
    super(props);
    this.create = this.create.bind(this);
  }

  create() {
    browserHistory.push('/vouchersCreate');
  }

  renderVouchers() {
    return this.props.vouchers.map((voucher) => {
      const onTouchTap = () => browserHistory.push(`/vouchersUpdate/${voucher._id}`);
      return (
        <ListItem
                    key={voucher._id}
                    primaryText={voucher.title}
                    onTouchTap={onTouchTap}
                />
      );
    });
  }

  render() {
    return (
      <PageBase
                title="Vouchers Management"
                navigation="Application / Vouchers Management"
            >
        <div>
          <List>
            <ListItem
                            primaryText="Create"
                            onTouchTap={this.create}
                        />
            {this.renderVouchers()}
          </List>
        </div>
      </PageBase>
    );
  }
}

VouchersList.propTypes = propTypes;
VouchersList.defaultProps = defaultProps;

export default createContainer(() => {
  const handler = Meteor.subscribe('vouchers.index');
  const isLoading = !handler.ready();
  const vouchers = voucherData.find().fetch();
  return { isLoading, vouchers };
}, VouchersList);
