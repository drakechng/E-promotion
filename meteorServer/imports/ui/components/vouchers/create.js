import React from "react";
import { Form } from "simple-react-form";
import RaisedButton from "material-ui/RaisedButton";
// import ArrayComponent from 'simple-react-form-material-ui/lib/array'
import { browserHistory } from "react-router";
import vouchersData from "../../../api/vouchers/vouchersData";

export default class VouchersCreate extends React.Component {
  render() {
    return (
      <div>
        <h1>Create a voucher</h1>
        <Form
                    collection={vouchersData}
                    type="insert"
                    ref="form"
                    logErrors
                    onSuccess={() => browserHistory.push('/vouchersList')} />
        <br />
        <RaisedButton label="Cancel" onTouchTap={() => browserHistory.push('/voucherList')} />
        <RaisedButton primary label="Create" onTouchTap={() => this.refs.form.submit()} />
      </div>
    );
  }
}
