import React from "react";
import {Form} from "simple-react-form";
import RaisedButton from "material-ui/RaisedButton";
// import ArrayComponent from 'simple-react-form-material-ui/lib/array'
import {browserHistory} from "react-router";
import estampsData from "../../../api/estamps/estampsData";

export default class EstampsCreate extends React.Component {
    render() {
        return (
            <div>
                <h1>Create a Estamp</h1>
                <Form
                    collection={estampsData}
                    type='insert'
                    ref='form'
                    logErrors
                    onSuccess={(docId) => browserHistory.push('/estampsList')}/>
                <br/>
                <RaisedButton label='Cancel' onTouchTap={() => browserHistory.push('/estampsList')}/>
                <RaisedButton primary label='Create' onTouchTap={() => this.refs.form.submit()}/>
            </div>
        )
    }
}
