import React, {Component} from "react";
import {TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import {actions} from "react-native-navigation-redux-helpers";
import {Container, Header, Title, Content, Text, Button, Icon} from "native-base";
import {Grid, Row} from "react-native-easy-grid";
import Meteor, {createContainer} from "react-native-meteor";
import {openDrawer} from "../../actions/drawer";
import {setIndex} from "../../actions/shopList";
import myTheme from "../../themes/base-theme";
import styles from "./styles";

const {
    reset,
    pushRoute,
} = actions;

class Home extends Component {

    static propTypes = {
        name: React.PropTypes.string,
        list: React.PropTypes.arrayOf(React.PropTypes.object),
        setIndex: React.PropTypes.func,
        openDrawer: React.PropTypes.func,
        pushRoute: React.PropTypes.func,
        reset: React.PropTypes.func,
        navigation: React.PropTypes.shape({
            key: React.PropTypes.string,
        }),
    }

    pushRoute(route, index) {
        this.props.setIndex(index);
        this.props.pushRoute({key: route, index: 1}, this.props.navigation.key);
    }

    setShop(members) {
        let shop = [];
        if (members != null) {
            members.map((member) =>
                shop.push(member.merchant)
            )

            this.props.setShop(shop)
        }
    }

    render() {
        return (
            <Container theme={myTheme} style={styles.container}>
                <Header>
                    <Button transparent onPress={() => this.props.reset(this.props.navigation.key)}>
                        <Icon name="ios-power"/>
                    </Button>

                    <Title>{(this.props.name) ? this.props.name : 'Home'}</Title>

                    <Button transparent onPress={this.props.openDrawer}>
                        <Icon name="ios-menu"/>
                    </Button>
                </Header>

                <Content>
                    <Grid style={styles.mt}>
                        {this.props.list.map((item, i) =>
                            <Row key={i}>
                                <TouchableOpacity
                                    style={styles.row}
                                    onPress={() => this.pushRoute('blankPage', i)}
                                >
                                    <Text style={styles.text}>{item.company_name}</Text>
                                </TouchableOpacity>
                            </Row>
                        )}
                    </Grid>
                </Content>
            </Container>
        );
    }
}

function bindAction(dispatch) {
    return {
        setIndex: index => dispatch(setIndex(index)),
        openDrawer: () => dispatch(openDrawer()),
        pushRoute: (route, key) => dispatch(pushRoute(route, key)),
        reset: key => dispatch(reset([{key: 'login'}], key, 0)),
    };
}

const mapStateToProps = state => ({
    name: state.user.name,
    list: state.list.list,
    navigation: state.cardNavigation,
});


const connector = connect(mapStateToProps, bindAction)(Home);

export default createContainer((props) => {
    const handle = Meteor.subscribe("members");

    return {
        member: handle.ready(),
        members: Meteor.collection('memberships').find({customer: Meteor.userId()}),
    };
}, connector);
