/**
 * Created by fruittec on 14/1/17.
 */
import React, {Component, PropTypes} from 'react';

export class SettingRow extends Component {

    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        if (this.props.model != undefined) {
            this.props.model[this.props.name] = e.target.value;
        }
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <div className="form-group">
                <label className="control-label col-sm-2" htmlFor={this.props.name}>{this.props.label}:</label>
                <div className="col-sm-10">
                    <input name={this.props.name} className="form-control" onChange={this.handleChange} type="text"
                           placeholder={this.props.name}
                           value={this.props.model ? this.props.model[this.props.name] : ""}/>
                </div>
            </div>
        )
    }
}