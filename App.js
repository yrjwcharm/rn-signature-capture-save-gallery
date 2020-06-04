import {
  AppRegistry,
  StyleSheet,
  View,
    SafeAreaView,
  Text,
} from 'react-native';
import React, {Component} from 'react';
import { Button } from 'zarm';
export  default  class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (
        <SafeAreaView>
          <>
            <Button shape="rect" theme="primary">rect</Button>
            <Button theme="primary">radius</Button>
            <Button shape="round" theme="primary">round</Button>
            <Button shape="circle" theme="primary">circle</Button>
            <Button shape="circle" icon={<Icon type="right" />} />
          </>
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
