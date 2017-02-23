import React, {Component} from "react";
import {TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import {actions} from "react-native-navigation-redux-helpers";
import {Container, Header, Title, Content, Text, Button, Icon} from "native-base/dist";
import {Grid, Row} from "react-native-easy-grid";
import Meteor, {createContainer} from "react-native-meteor";
import {openDrawer} from "../../actions/drawer";
import {setShop} from "../../actions/shopList";
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
        setShop: React.PropTypes.func,
        openDrawer: React.PropTypes.func,
        pushRoute: React.PropTypes.func,
        reset: React.PropTypes.func,
        navigation: React.PropTypes.shape({
            key: React.PropTypes.string,
        }),
    }

    pushRoute(route, i, id) {
        this.props.setShop(id);
        this.props.pushRoute({key: route, index: 1}, this.props.navigation.key);
    }

    render() {
        console.log(this.props);
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
                        {this.props.merchantsSettings.map((settings, i) =>
                            <Row key={i}>
                                <TouchableOpacity
                                    style={styles.row}
                                    onPress={() =>  this.pushRoute('shopPage',i,settings.userId)}
                                >
                                    <Text style={styles.text}>{settings.company_name}</Text>
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
        setShop: shop => dispatch(setShop(shop)),
        openDrawer: () => dispatch(openDrawer()),
        pushRoute: (route, key) => dispatch(pushRoute(route, key)),
        reset: key => dispatch(reset([{key: 'login'}], key, 0)),
    };
}

const mapStateToProps = state => ({
    name: state.user.name,
    shop: state.shop.activeShopId,
    navigation: state.cardNavigation,
});


const connector = connect(mapStateToProps, bindAction)(Home);

export default createContainer((props) => {
    const handle = Meteor.subscribe("members");
    const merchantHandle = Meteor.subscribe("members.marchentsSettings")
    const vouchersHandle = Meteor.subscribe("members.vouchers")
    const estampsHandle = Meteor.subscribe("members.estamps")

    return {
        member: handle.ready(),
        members: Meteor.collection('memberships').find({customer: Meteor.userId()}),
        merchantsSettings: Meteor.collection('settings').find({}),
        vouchers:Meteor.collection('vouchers').find({}),
        estamps:Meteor.collection('estamps').find({}),
    };
}, connector);
