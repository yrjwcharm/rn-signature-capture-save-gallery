import React, { Component } from 'react';

import {
  Platform,
    Alert,
  View, StyleSheet, Text, Image, TouchableOpacity
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';
import SignatureView from './SignatureView';
import CameraRoll from "@react-native-community/cameraroll";
const flexCenter = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
};

class ExampleApp extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
  }

  render() {
    const {data} = this.state;
    return (
      <View style={flexCenter}>
        <TouchableOpacity onPress={this._showSignatureView.bind(this)}>
          <View style={[flexCenter, {padding: 10}]}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              {data ? 'This is a your signature.' : 'Click here.'}
            </Text>
            <View style={{paddingBottom: 10}} />
            {data &&
              <View style={{backgroundColor: 'white'}}>
                <Image
                  resizeMode={'contain'}
                  style={{width: 300, height: 300}}
                  source={{uri: data}}
                />
              </View>
            }
          </View>
        </TouchableOpacity>
        <SignatureView
          ref={r => this._signatureView = r}
          rotateClockwise={!!true}
          onSave={this._onSave.bind(this)}
        />
      </View>
    );
  }

  _showSignatureView() {
    this._signatureView.show(true);
  }

  _onSave(result) {
    const base64String = `data:image/png;base64,${result.encoded}`;
    this.setState({data: base64String});
    if(Platform.OS==='android'){
      const dirs = Platform.OS === 'ios' ? RNFS.LibraryDirectoryPath : RNFS.ExternalDirectoryPath; // 外部文件，共享目录的绝对路径（仅限android）
      const downloadDest = `${dirs}/${((Math.random() * 10000000) | 0)}.png`;
      const imageDatas = base64String.split('data:image/png;base64,');
      const imageData = imageDatas[1];

      RNFetchBlob.fs.writeFile(downloadDest, imageData, 'base64').then((rst) => {
        console.log('writeFile',downloadDest)
        try {
          CameraRoll.save(downloadDest).then((e1) => {
            console.log('suc',e1)
          }).catch((e2) => {
            console.log('fai',e2)
            Alert.alert('没有读写权限。请在[设置]-[应用权限]-[实验助手]开启')
          })
        } catch (e3) {
          // Alert.alert(JSON.stringify(e3))
          console.log('catch',e3)
        }
      });
    }

    this._signatureView.show(false);
  }
}

export default ExampleApp;
