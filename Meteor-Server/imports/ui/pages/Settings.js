import React, {Component, PropTypes} from 'react';
import {Settings} from  '../../api/settings/settings'
import {createContainer} from 'meteor/react-meteor-data';
import {SettingRow} from '../components/SettingRow';
import SubNavBar from '../components/SubNavBar'
class Setting extends Component {


    handleSubmit(event) {
        event.preventDefault()
        const industry = event.target.elements[0].value
        const company_name = event.target.elements[1].value
        const contact = Number(event.target.elements[2].value)

        Meteor.call('settings.upsert', company_name, industry, contact);
    }

    render() {
        return (
            <div  className="content-wrapper" style={{minHeight : 997+"px"}}>
                <SubNavBar title ="Settings"/>
                <section className="content">
                    <div className="row">
                <form className="form-horizontal" onSubmit={this.handleSubmit}>
                    <SettingRow name="industry" label="Industry" model={this.props.settings}/>
                    <SettingRow name="company_name" label="Company Name" model={this.props.settings}/>
                    <SettingRow name="contact" label="Contact" model={this.props.settings}/>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button className="btn btn-default">Go</button>
                        </div>
                    </div>
                </form>
                {this.props.children}
                    </div></section>
            </div>
        )
    }
}
export default createContainer(() => {
    Meteor.subscribe('settings');
    return {
        settings: Settings.findOne(),
    };
}, Setting);
