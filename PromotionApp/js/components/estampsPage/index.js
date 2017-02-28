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

class EstampsPage extends Component {

    popRoute() {
        this.props.popRoute(this.props.navigation.key);
    }

    render() {
        let estampsPrototype = this.props.estamps;
        let estampsList = this.props.members.estamps;
        console.log(estampsPrototype)
        console.log(estampsList)
        let estampsCards = []
        for(let [key,value] of Object.entries(estampsList)){
            estampsPrototype.forEach(e=>
                {if(e._id == key ){
                       estampsCards.push({
                               name:e.title,
                               max : e.max,
                               enable:value,
                               image: require('../../../images/estamps.jpg'),}
                               ); } }  )}
        let numEstamps = estampsCards.length;
        console.log(numEstamps);
        console.log(estampsCards);
        return (
            <Container>
                <Header>
                    <Button transparent onPress={() => this.popRoute()}>
                        <Icon name="ios-arrow-back"/>
                    </Button>

                    <Title>{'Estamps Page'}</Title>

                    <Button transparent onPress={this.props.openDrawer}>
                        <Icon name="ios-menu"/>
                    </Button>
                </Header>
                <View>
                    <DeckSwiper
                        dataSource={estampsCards}
                        renderItem={item =>
                          <Card style={{ elevation: 3 }}>
                              <CardItem>
                                  <Thumbnail source={item.image} />
                                  <Text>{item.name}</Text>
                                  <Text note>NativeBase</Text>
                              </CardItem>
                              <CardItem>
                                  <Image style={{ resizeMode: 'stretch' }} source={item.image} />
                              </CardItem>
                              <CardItem>
                                  <Icon name="ios-heart" style={{ color: '#ED4A6A' }} />
                                  <Text>{item.name}</Text>
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

    const estampsHandle = Meteor.subscribe("members.estamps")
    return {
        estamps:Meteor.collection('estamps').find({}),
        member: handle.ready(),
        members: Meteor.collection('memberships').findOne({
            customer: Meteor.userId()
        }),
    };
}, EstampsPage);

export default connect(mapStateToProps, bindAction)(container);
