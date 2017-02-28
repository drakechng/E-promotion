/**
 * Created by xiongchenyu on 28/2/17.
 */
import React, {Component} from "react";
import {Image} from "react-native";
import {actions} from "react-native-navigation-redux-helpers";
import {Container, Header, Button, Title, Icon, View, DeckSwiper, Card, CardItem, Thumbnail, Text} from "native-base";
import {connect} from "react-redux";
import Meteor, {createContainer} from "react-native-meteor";
import {openDrawer} from "../../actions/drawer";
import {setTap} from "../../actions/shopList";

const {
    popRoute,
} = actions;

class VouchersPage extends Component {

    popRoute() {
        this.props.popRoute(this.props.navigation.key);
    }

    render() {
        let voucherPrototype = this.props.vouchers;
        let voucherList = this.props.members.vouchers;
        console.log(voucherPrototype)
        console.log(voucherList)
        let voucherCards = []
        for(let [key,value] of Object.entries(voucherList)){
            voucherPrototype.forEach(e=>
                {if(e._id == key ){
                    for(let [key1,value1] of Object.entries(value)){
                       voucherCards.push(
                           {  text: e.vouchers[key1].name,
                               quantity: value1,
                               value:e.vouchers[key1].value,
                               image: require('../../../images/vouchers.jpg'),}
                               ); } } } ) }
        let num = voucherCards.length;
        console.log(num);
        console.log(voucherCards);
        return (
            <Container>
                <Header>
                    <Button transparent onPress={() => this.popRoute()}>
                        <Icon name="ios-arrow-back"/>
                    </Button>

                    <Title>{'Vouchers Page'}</Title>

                    <Button transparent onPress={this.props.openDrawer}>
                        <Icon name="ios-menu"/>
                    </Button>
                </Header>
                <View>
                    <DeckSwiper
                        dataSource={voucherCards}
                        renderItem={item =>
                          <Card style={{ elevation: num }}>
                              <CardItem>
                                  <Thumbnail source={item.image} />
                                  <Text>{item.text}</Text>
                                  <Text note>NativeBase</Text>
                              </CardItem>
                              <CardItem>
                                  <Image style={{ resizeMode: 'stretch' }} source={item.image} />
                              </CardItem>
                              <CardItem>
                                  <Icon name="ios-heart" style={{ color: '#ED4A6A' }} />
                                  <Text>{item.value}</Text>
                                  <Text>{item.quantity}</Text>
                              </CardItem>
                          </Card>
                      }>
                    </DeckSwiper>
                </View>
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

    const vouchersHandle = Meteor.subscribe("members.vouchers")
    return {
        vouchers:Meteor.collection('vouchers').find({}),
        member: handle.ready(),
        members: Meteor.collection('memberships').findOne({
            customer: Meteor.userId()
        }),
    };
}, VouchersPage);

export default connect(mapStateToProps, bindAction)(container);
