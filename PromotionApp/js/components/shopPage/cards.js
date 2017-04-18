
import React, {Component} from "react";
import {Container,Card,CardItem, Header,Badge,Body, Title, Content, Text, Button, Icon, Alert,Footer, FooterTab} from "native-base/dist";

export default class Cards extends Component {

  render(){
    return(
      <CardItem>
        <Text>
          {this.props.name}
        </Text>
      </CardItem>
    )
  };
}
