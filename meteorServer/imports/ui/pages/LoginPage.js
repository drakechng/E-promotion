import React from "react";
import { Accounts, STATES } from "meteor/std:accounts-ui";
import { RaisedButton, FlatButton, FontIcon, TextField, Snackbar } from "material-ui";
import { socialButtonsColors, socialButtonIcons } from "./social_buttons_config";
import { green500, red500, yellow600, lightBlue600 } from "material-ui/styles/colors";
import Paper from "material-ui/Paper";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import ThemeDefault from "../stylesheets/theme-default";
import { styles } from "../stylesheets/accountStyle";
import { Link } from "react-router";
/**
 * Form.propTypes = {
 *   fields: React.PropTypes.object.isRequired,
 *   buttons: React.PropTypes.object.isRequired,
 *   error: React.PropTypes.string,
 *   ready: React.PropTypes.bool
 * };
 */
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL',
});

class LoginForm extends Accounts.ui.LoginForm {
  componentWillMount() {
        // FIXME hack to solve issue #18
  }
}

class Form extends Accounts.ui.Form {

  render() {
    const {
            hasPasswordService,
            oauthServices,
            fields,
            buttons,
            error,
            message,
            ready = true,
            className,
            formState,
        } = this.props;
    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <div>
          <div style={styles.loginContainer}>

            <Paper style={styles.paper}>
              <form
                                ref={ref => this.form = ref}
                                className={["accounts", className].join(' ')}>
                {Object.keys(fields).length > 0
                                    ? (<Accounts.ui.Fields fields={fields} />)
                                    : null}
                <Accounts.ui.Buttons buttons={buttons} />
                <br />
                {formState == STATES.SIGN_IN || formState == STATES.SIGN_UP
                                    ? (
                                      <div className="or-sep">
                                        <Accounts.ui.PasswordOrService oauthServices={oauthServices} />
                                      </div>
                                    )
                                    : null}
                {formState == STATES.SIGN_IN || formState == STATES.SIGN_UP
                                    ? (<Accounts.ui.SocialButtons oauthServices={oauthServices} />)
                                    : null}

                {formState == STATES.PROFILE
                                    ? (<Link to="/">jump to main</Link>)
                                    : null}
                <br />
                <Accounts.ui.FormMessage {...message} />
              </form>
            </Paper>
          </div>
        </div>

      </MuiThemeProvider>
    );
  }
}

class Buttons extends Accounts.ui.Buttons {
}
class Button extends Accounts.ui.Button {
  render() {
    const {
            label,
            href = null,
            type,
            disabled = false,
            onClick,
            className,
            icon,
        } = this.props;
    return type == 'link'
            ? (
              <FlatButton
                    href={href}
                    label={label}
                    icon={icon
					? <FontIcon className={`fa ${icon}`} />
					: null}
                    className={className}
                    onTouchTap={onClick}
                    disabled={disabled}
                    style={{ marginRight: '5px' }}
                />
            )
            : (
              <RaisedButton
                    label={label}
                    icon={icon
					? <FontIcon className={`fa ${icon}`} />
					: null}
                    primary={true}
                    type={type}
                    className={className}
                    onTouchTap={onClick}
                    disabled={disabled}
                    style={{ marginRight: '5px' }}
                />
            );
  }
}
class Fields extends Accounts.ui.Fields {

  render() {
    const {
            fields = {},
            className = "",
        } = this.props;
    return (
      <div className={[className].join(' ')}>
        {Object.keys(fields).map((id, i) => <div key={i}>
          <Accounts.ui.Field {...fields[id]} />
          <br />
        </div>)}
      </div>
    );
  }
}
class Field extends Accounts.ui.Field {
  triggerUpdate() {
    const { onChange } = this.props;
    let value;
    if (this.input) {
      value = this.input.value;
    }
    if (value === undefined) {
      value = '';
    } else {
            // do nothing
    }

    if (this.input) {
      onChange({
        target: {
          value,
        },
      });
    }
  }

  render() {
    const {
            id,
            hint,
            label,
            type = 'text',
            onChange,
            required = false,
            className,
            defaultValue = "",
        } = this.props;
    const {
            mount = true,
        } = this.state;
    return mount
            ? (<TextField
                floatingLabelText={label}
                hintText={hint}
                onChange={onChange}
                fullWidth={true}
                defaultValue={defaultValue}
                name={id}
                type={type}
                ref={ref => this.input = ref}
                required={required
				? "required"
				: ""}
                autoCapitalize={type == 'email'
				? 'none'
				: false}
                autoCorrect="off" />)
            : null;
  }
}
class SocialButtons extends Accounts.ui.SocialButtons {
  render() {
    const {
            oauthServices = {},
            className = "social-buttons",
        } = this.props;
    if (Object.keys(oauthServices).length > 0) {
      return (
        <div className={[className].join(' ')}>
          {Object.keys(oauthServices).map((id, i) => {
            const serviceClass = id.replace(/google|meteor\-developer/gi, matched => socialButtonIcons[matched]);
            const { label, type, onClick, disabled } = oauthServices[id];
            return (
              <RaisedButton
                                key={i}
                                label={label}
                                type={type}
                                onTouchTap={onClick}
                                disabled={disabled}
                                className={serviceClass.length > 0
								? `${serviceClass}`
								: ''}
                                icon={serviceClass.length > 0
								? <FontIcon className={`fa fa-${serviceClass}`} />
								: ''}
                                backgroundColor={socialButtonsColors[id].background}
                                labelColor={socialButtonsColors[id].label}
                                style={{ marginRight: '5px' }}
                            />
            );
          })}
        </div>
      );
    } 
    return null;
  }
}


class FormMessage extends Accounts.ui.FormMessage {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.message) {
      this.setState({ open: true });
    }
  }

  handleRequestClose() {
    this.setState({ open: false });
  }

  render() {
    const { message, type } = this.props;
    let bodyStyle;
    switch (type) {
      case 'warning':
        bodyStyle = {
          backgroundColor: yellow600,
        };
        break;
      case 'success':
        bodyStyle = {
          backgroundColor: green500,
        };
        break;
      case 'error':
        bodyStyle = {
          backgroundColor: red500,
        };
        break;
      case 'info':
        bodyStyle = {
          backgroundColor: lightBlue600,
        };
        break;
    }

    return message
            ? (<Snackbar
                open={this.state.open}
                message={message}
                bodyStyle={bodyStyle}
                action="OK"
                autoHideDuration={4000}
                onActionTouchTap={this.handleRequestClose.bind(this)}
                onRequestClose={this.handleRequestClose.bind(this)} />)
            : null;
  }
}

// Notice! Accounts.ui.LoginForm manages all state logic at the moment, so avoid overwriting this
// one, but have a look at it and learn how it works. And pull requests altering how that works are
// welcome. Alter provided default unstyled UI.
Accounts.ui.LoginForm = LoginForm;
Accounts.ui.Form = Form;
Accounts.ui.Buttons = Buttons;
Accounts.ui.Button = Button;
Accounts.ui.Fields = Fields;
Accounts.ui.Field = Field;
Accounts.ui.FormMessage = FormMessage;
Accounts.ui.SocialButtons = SocialButtons;

// Export the themed version.
export { Accounts, STATES };
