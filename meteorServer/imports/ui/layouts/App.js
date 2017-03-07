import React, {PropTypes} from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Header from "../components/Header";
import LeftDrawer from "../components/LeftDrawer";
import withWidth, {SMALL} from "material-ui/utils/withWidth";
import ThemeDefault from "../stylesheets/theme-default";
import Data from "../../api/data";
import {Tracker} from "meteor/tracker";
import {browserHistory} from "react-router";
import {connect} from "react-redux";
import {toggleDrawer} from "../redux/actions/ui-actions";
import {bindActionCreators} from "redux";

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // Check that the user is logged in before the component mounts
        Tracker.autorun(() => {
            if (!Meteor.userId()) {
                browserHistory.push('/login')
            }
        })
    }


    handleChangeRequestNavDrawer() {
        this.props.toggleDrawer();
    }

    render() {
        const paddingLeftDrawerOpen = 236;

        const styles = {
            header: {
                paddingLeft: this.props.navDrawerOpen ? paddingLeftDrawerOpen : 0
            },
            container: {
                margin: '80px 20px 20px 15px',
                paddingLeft: this.props.navDrawerOpen && this.props.width !== SMALL ? paddingLeftDrawerOpen : 0
            }
        };

        return (
            <MuiThemeProvider muiTheme={ThemeDefault}>
                <div>
                    <Header styles={styles.header}
                            handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer.bind(this)}/>

                    <LeftDrawer navDrawerOpen={this.props.navDrawerOpen}
                                menus={Data.menus}
                                username={Meteor.userId()}/>

                    <div style={styles.container}>
                        {this.props.children}
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

App.propTypes = {
    children: PropTypes.element,
    width: PropTypes.number
};

function mapDispatchToProps(dispatch) {
    return {
        toggleDrawer: bindActionCreators(toggleDrawer, dispatch)
    };
}

const mapStateToProps = state => ({
    navDrawerOpen: state.userInterface.navDrawerOpen,
});

export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(App));
