import React, {Component} from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import Checkbox from "material-ui/Checkbox";
import PersonAdd from "material-ui/svg-icons/social/person-add";
import Help from "material-ui/svg-icons/action/help";
import TextField from "material-ui/TextField";
import {Link, browserHistory} from "react-router";
import ThemeDefault from "../stylesheets/theme-default";
import {styles} from "../stylesheets/accountStyle";
export default class LoginPage extends React.Component {

    handleOnSubmit(event) {
        event.preventDefault();
        console.log(this.refs)
        let emailAddress = event.target.elements[0].value;
        let password = event.target.elements[1].value;

        Meteor.loginWithPassword(emailAddress, password, (error) => {
            if (error) {
                console.log(error);
            } else {
                browserHistory.push('/')
            }
        });
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={ThemeDefault}>
                <div>
                    <div style={styles.loginContainer}>

                        <Paper style={styles.paper}>

                            <form onSubmit={this.handleOnSubmit}>
                                <TextField
                                    ref="emailAddress"
                                    hintText="E-mail"
                                    floatingLabelText="E-mail"
                                    fullWidth={true}
                                />
                                <TextField
                                    ref="password"
                                    hintText="Password"
                                    floatingLabelText="Password"
                                    fullWidth={true}
                                    type="password"
                                />

                                <div>
                                    <Checkbox
                                        label="Remember me"
                                        style={styles.checkRemember.style}
                                        labelStyle={styles.checkRemember.labelStyle}
                                        iconStyle={styles.checkRemember.iconStyle}
                                    />

                                    <RaisedButton label="Login"
                                                  type="submit"
                                                  primary={true}
                                                  style={styles.loginBtn}/>
                                </div>
                            </form>
                        </Paper>

                        <div style={styles.buttonsDiv}>
                            <FlatButton
                                label="Register"
                                href="/signup"
                                style={styles.flatButton}
                                icon={<PersonAdd />}
                            />

                            <FlatButton
                                label="Forgot Password?"
                                href="/"
                                style={styles.flatButton}
                                icon={<Help />}
                            />
                        </div>

                        <div style={styles.buttonsDiv}>
                            <Link to="/" style={{...styles.btn, ...styles.btnFacebook}}>
                                <i className="fa fa-facebook fa-lg"/>
                                <span style={styles.btnSpan}>Log in with Facebook</span>
                            </Link>
                            <Link to="/" style={{...styles.btn, ...styles.btnGoogle}}>
                                <i className="fa fa-google-plus fa-lg"/>
                                <span style={styles.btnSpan}>Log in with Google</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
};
