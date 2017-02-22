import React, {Component} from "react";
import {connect} from "react-redux";
import {actions} from "react-native-navigation-redux-helpers";
import {Container, Header, Title, Content, Text, Button, Icon, Alert} from "native-base";
import Meteor, {createContainer} from "react-native-meteor";
import {openDrawer} from "../../actions/drawer";
import styles from "./styles";

const {
    popRoute,
} = actions;

class BlankPage extends Component {

    static propTypes = {
        name: React.PropTypes.string,
        index: React.PropTypes.number,
        list: React.PropTypes.arrayOf(React.PropTypes.object),
        openDrawer: React.PropTypes.func,
        popRoute: React.PropTypes.func,
        navigation: React.PropTypes.shape({
            key: React.PropTypes.string,
        }),
    }

    popRoute() {
        this.props.popRoute(this.props.navigation.key);
    }

    render() {
        const {props: {name, index, list}} = this;
        return (
            <Container style={styles.container}>
                <Header>
                    <Button transparent onPress={() => this.popRoute()}>
                        <Icon name="ios-arrow-back"/>
                    </Button>

                    <Title>{(name) ? this.props.name : 'Blank Page'}</Title>

                    <Button transparent onPress={this.props.openDrawer}>
                        <Icon name="ios-menu"/>
                    </Button>
                </Header>

                <Content padder>
                    <Text>
                        {this.props.members != null &&
                        JSON.stringify(this.props.members.vouchers) +
                        JSON.stringify(this.props.members.estamps)

                        }
                        {(!isNaN(index)) ? list[index].company_name : 'Create Something Awesome . . .'}
                    </Text>
                </Content>
            </Container>
        );
    }
}

function bindAction(dispatch) {
    return {
        openDrawer: () => dispatch(openDrawer()),
        popRoute: key => dispatch(popRoute(key)),
    };
}

const mapStateToProps = state => ({
    navigation: state.cardNavigation,
    name: state.user.name,
    index: state.shop.selectedIndex,
    shopId: state.shop.shopId,
});


const container = createContainer((props) => {
    console.log(props)
    const handle = Meteor.subscribe("members");

    return {
        member: handle.ready(),
        members: Meteor.collection('memberships').findOne({
            customer: Meteor.userId(),
            merchant: props.shopId,
        }),
    };
}, BlankPage);

export default connect(mapStateToProps, bindAction)(container);
