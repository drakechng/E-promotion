import React, {Component} from "react";
import {connect} from "react-redux";
import {Content, Text, List, ListItem} from "native-base/dist";
import navigateTo from "../../actions/sideBarNav";
import myTheme from "../../themes/base-theme";
import styles from "./style";

class SideBar extends Component {

    static propTypes = {
        // setIndex: React.PropTypes.func,
        navigateTo: React.PropTypes.func,
    }

    navigateTo(route) {
        this.props.navigateTo(route, 'home');
    }

    render() {
        return (
            <Content theme={myTheme} style={styles.sidebar}>
                <List>
                    <ListItem button onPress={() => this.navigateTo('home')}>
                        <Text>Home</Text>
                    </ListItem>
                    <ListItem button onPress={() => this.navigateTo('shopPage')}>
                        <Text>Shop Page</Text>
                    </ListItem>
                    <ListItem button onPress={() => this.navigateTo('vouchersPage')}>
                        <Text>Vouchers Page</Text>
                    </ListItem>
                    <ListItem button onPress={() => this.navigateTo('estampsPage')}>
                        <Text>Estamps Page</Text>
                    </ListItem>
                </List>
            </Content>
        );
    }
}

function bindAction(dispatch) {
    return {
        navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
    };
}

const mapStateToProps = state => ({
    navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(SideBar);
