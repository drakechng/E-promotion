import React from "react";
import {Link} from "react-router";
import RaisedButton from "material-ui/RaisedButton";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import Toggle from "material-ui/Toggle";
import {grey400} from "material-ui/styles/colors";
import Divider from "material-ui/Divider";
import PageBase from "../components/PageBase";
import {Settings} from "../../api/settings/settings";
import {createContainer} from "meteor/react-meteor-data";

const styles = {
    toggleDiv: {
        maxWidth: 300,
        marginTop: 40,
        marginBottom: 5
    },
    toggleLabel: {
        color: grey400,
        fontWeight: 100
    },
    buttons: {
        marginTop: 30,
        float: 'right'
    },
    saveButton: {
        marginLeft: 5
    }
};
class SettingsPage extends React.Component {

    constructor() {
        super();
        this.onSelectChanged = this.onSelectChanged.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            selectValue: 1
        }
    }

    onSelectChanged(event, index, value) {
        this.setState({selectValue: value})
    }


    handleSubmit(event) {
        event.preventDefault()
        const industry = event.target.elements[2].value
        const company_name = event.target.elements[0].value
        const city = this.state.selectValue
        const disabled = event.target.elements[4].checked;
        const contact = Number(event.target.elements[3].value)


        Meteor.call('settings.upsert', company_name, city, industry, contact, disabled);
    }

    render() {
        if (!this.props.settings) {
            if(this.props.ready){
                Meteor.call('settings.upsert', "", 1, "", "", false)
            }
            return false;
        }

        return (
            <PageBase title="Settings"
                      navigation="Application / Settings">
                <form onSubmit={this.handleSubmit}>

                    <TextField
                        name="company_name"
                        hintText="Company Name"
                        floatingLabelText="Company Name"
                        onChange={this.onChange}
                        defaultValue={this.props.settings.company_name}
                        fullWidth={true}
                    />

                    <SelectField floatingLabelText="City" onChange={this.onSelectChanged} value={this.state.selectValue}
                                 fullWidth={true}>

                        <MenuItem value={1} primaryText="Singapore"/>
                        <MenuItem value={2} primaryText="China"/>
                        <MenuItem value={3} primaryText="Australia"/>
                    </SelectField>

                    <TextField
                        name="industry"
                        hintText="Industry"
                        floatingLabelText="Industry"
                        onChange={this.onChange}
                        defaultValue={this.props.settings.industry}
                        fullWidth={true}
                    />

                    <TextField
                        name="contact"
                        hintText="Contact Number"
                        onChange={this.onChange}
                        floatingLabelText="Contact Number"
                        defaultValue={this.props.settings.contact}
                        fullWidth={true}
                    />

                    <div style={styles.toggleDiv}>
                        <Toggle
                            label="Disabled"
                            defaultToggled={this.props.settings.disabled}
                            labelStyle={styles.toggleLabel}
                        />
                    </div>

                    <Divider/>

                    <div style={styles.buttons}>
                        <Link to="/">
                            <RaisedButton label="Cancel"/>
                        </Link>

                        <RaisedButton label="Save"
                                      style={styles.saveButton}
                                      type="submit"
                                      primary={true}/>
                    </div>
                </form>
            </PageBase>
        );
    }
}
;

export default createContainer(() => {
    const sub = Meteor.subscribe('settings');
    return {
        settings: Settings.findOne(),
        ready:sub.ready()
    };
}, SettingsPage);
