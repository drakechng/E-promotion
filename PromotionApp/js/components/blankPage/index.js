import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Text, Button, Icon,Alert } from 'native-base';
import Meteor, { createContainer,Collection } from 'react-native-meteor';
import { openDrawer } from '../../actions/drawer';
import styles from './styles';

const {
  popRoute,
} = actions;

class BlankPage extends Component {

  static propTypes = {
    name: React.PropTypes.string,
    index: React.PropTypes.number,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
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
    const { props: { name, index, list } } = this;
    return (
      <Container style={styles.container}>
        <Header>
          <Button transparent onPress={() => this.popRoute()}>
            <Icon name="ios-arrow-back" />
          </Button>

          <Title>{(name) ? this.props.name : 'Blank Page'}</Title>

          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Header>

        <Content padder>
          <Text>
              {this.props.members != null &&
                 JSON.stringify(this.props.members.vouchers)

              }
            {(!isNaN(index)) ? list[index] : 'Create Something Awesome . . .'}
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
  index: state.list.selectedIndex,
  list: state.list.list,
});


const connector = connect(mapStateToProps, bindAction)(BlankPage);

 export default createContainer((props)=>{
     const handle = Meteor.subscribe("members");

    return {
        member: handle.ready(),
        members: Meteor.collection('memberships').findOne({customer:Meteor.userId()}),
    };
}, connector);

