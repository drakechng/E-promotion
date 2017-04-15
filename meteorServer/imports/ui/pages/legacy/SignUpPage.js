/**
 * Created by xiongchenyu on 16/2/17.
 */
import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";
import Checkbox from "material-ui/Checkbox";
import TextField from "material-ui/TextField";
import { Link, browserHistory } from "react-router";
import ThemeDefault from "../../stylesheets/theme-default";
import { Accounts } from "meteor/accounts-base";
import { styles } from "../../stylesheets/accountStyle";

export default class LoginPage extends React.Component {

  handleOnSubmit(event) {
    event.preventDefault();
    const username = event.target.elements[0].value;
    const password = event.target.elements[1].value;
    console.log(username, password);
    Accounts.createUser({
      username,
      password,
      profile: {
        type: 'm',
        IsActive: 0,
      },
    }, (error) => {
      if (error) {
        alert(error.reason);
      } else {
        Meteor.call('settings.upsert', "", 1, "", "", false);
        browserHistory.push('/');
        alert("Success Now Auto Sign In");
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

                  <RaisedButton
label="SignUp"
                                                  type="submit"
                                                  primary={true}
                                                  style={styles.loginBtn} />
                </div>
              </form>
            </Paper>

            <div style={styles.buttonsDiv}>
              <Link to="/" style={{ ...styles.btn, ...styles.btnFacebook }}>
                <i className="fa fa-facebook fa-lg" />
                <span style={styles.btnSpan}>Log in with Facebook</span>
              </Link>
              <Link to="/" style={{ ...styles.btn, ...styles.btnGoogle }}>
                <i className="fa fa-google-plus fa-lg" />
                <span style={styles.btnSpan}>Log in with Google</span>
              </Link>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}