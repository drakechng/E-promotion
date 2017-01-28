
import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, InputGroup, Input, Button, Icon, View,Alert } from 'native-base';
import Meteor, { createContainer,Accounts } from 'react-native-meteor';

import { setUser } from '../../actions/user';
import styles from './styles';

const { replaceAt, } = actions;

const background = require('../../../images/shadow.png');

class Login extends Component {

    componentWillMount() {
        console.log(Meteor);
        const url = 'ws://localhost:3000/websocket';
        Meteor.connect(url);
    }

  static propTypes = {
    setUser: React.PropTypes.func,
    replaceAt: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);
    this.state = {
      name: '',
        password:'',
        pendingLoginRequest:false
    };
  }

  setUser(name,password) {
    this.props.setUser(name,password);
  }

  setLogin(route) {
      Meteor.loginWithPassword(this.state.name, this.state.password, (error) => {
          if (error) {
              alert(error.reason)
          }else {
    this.setUser(this.state.name,this.state.password);
    this.props.replaceAt('login', { key: route }, this.props.navigation.key);}});
    }

    setSignup(route) {
        let  username = this.state.name;
        let password = this.state.password;
        Accounts.createUser({username, password,profile: {
            type: 'c',
            point: 0,
            IsActive: 0
        }}, (error) => {
            if (error) {
                alert(error.reason);
            }else {
                this.setUser(this.state.name,this.state.password);
                alert("Success Now Auto Sign In")
                this.props.replaceAt('login', { key: route }, this.props.navigation.key);}});
    }
  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Content>
            <Image source={background} style={styles.shadow}>
              <View style={styles.bg}>
                <InputGroup style={styles.input}>
                  <Icon name="ios-person" />
                  <Input placeholder="EMAIL" onChangeText={name => this.setState({ name })} />
                </InputGroup>
                <InputGroup style={styles.input}>
                  <Icon name="ios-unlock-outline" />
                  <Input
                    placeholder="PASSWORD"
                    secureTextEntry
                    onChangeText = {password => this.setState({password})}
                  />
                </InputGroup>
                  <View  style = {{flex: 1, flexDirection: 'row',justifyContent: 'space-around',  alignItems: 'center',}}>
                <Button style={styles.btn} onPress={() => this.setLogin('home')}>
                  Login
                </Button>
                  <Button style={styles.btn} onPress={() => this.setSignup('home')}>
                      Create Account
                  </Button></View>
              </View>
            </Image>
          </Content>
        </View>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    setUser: (name,password) => dispatch(setUser(name,password)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindActions)(Login);
