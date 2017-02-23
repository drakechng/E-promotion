
import React, {Component} from "react";
import {connect} from "react-redux";
import {actions} from "react-native-navigation-redux-helpers";
import {Container, Header,Badge, Title, Content, Text, Button, Icon, Alert,Footer, FooterTab} from "native-base/dist";
import Meteor, {createContainer} from "react-native-meteor";
import {openDrawer} from "../../actions/drawer";
import styles from "./styles";
import {setTap} from "../../actions/shopList"

const {
    popRoute,
} = actions;

class ShopPage extends Component {

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
        let AppComponent = null;
//Here you can add as many tabs you need
       if (this.props.activeTap == "vouchers") {
          AppComponent = this.props.members != null &&JSON.stringify(this.props.members.vouchers)
       } else {
          AppComponent = JSON.stringify(this.props.members.estamps)
       }
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
                        {AppComponent}
                        {(!isNaN(index)) ? list[index].company_name : 'Create Something Awesome . . .'}
                    </Text>
                </Content>
                <Footer >
                         <FooterTab>
                             <Button onPress={()=>this.props.setTap("vouchers")} active ={this.props.activeTap === "vouchers"}>
                                 <Badge>2</Badge>
                                 Vouchers
                                 <Icon name='ios-apps-outline' />
                             </Button>
                             <Button onPress={()=>this.props.setTap("estamps")} active ={this.props.activeTap === "estamps"}>
                                E-stamps
                                 <Icon name='ios-contact-outline' />
                             </Button>
                         </FooterTab>
                     </Footer>
            </Container>
        );
    }
}

function bindAction(dispatch) {
    return {
        openDrawer: () => dispatch(openDrawer()),
        popRoute: key => dispatch(popRoute(key)),
        setTap : tap => dispatch(setTap(tap))
    };
}

const mapStateToProps = state => ({
    navigation: state.cardNavigation,
    name: state.user.name,
    activeShopId: state.shop.activeShopId,
    activeTap: state.shop.activeTap,
});


const container = createContainer((props) => {
    const handle = Meteor.subscribe("members");

    return {
        member: handle.ready(),
        members: Meteor.collection('memberships').findOne({
            customer: Meteor.userId(),
            merchant: props.activeShopId,
        }),
    };
}, ShopPage);

export default connect(mapStateToProps, bindAction)(container);
