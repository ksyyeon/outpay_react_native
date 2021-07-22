/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {BackHandler, Platform, ToastAndroid} from 'react-native';
import {WebView} from 'react-native-webview';

export default class App extends React.Component {
  webView = {
    ref: null,
  };

  onWebViewMessage = e => {};

  onLoadWebView = () => {};

  onBackPress = () => {
    // if (this.webView.canGoBack && this.webView.ref) {
    //   this.webView.ref.goBack();
    //   return true;
    // }
    // return false;
    if (this.exitApp === undefined || !this.exitApp) {
      ToastAndroid.show('한번 더 누르시면 종료됩니다.', ToastAndroid.SHORT);
      this.exitApp = true;

      this.timeout = setTimeout(() => {
        this.exitApp = false;
      }, 2000);
    } else {
      clearTimeout(this.timeout);

      BackHandler.exitApp();
    }
    return true;
  };

  // 이벤트 동작
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  // 이벤트 해제
  componentWillUnmount() {
    this.exitApp = false;
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  render() {
    return (
      <WebView
        source={{
          uri: 'http://172.16.21.58/osiris/.development/appIndex.html?mode=devMode&telNum=010-5060-3160#',
        }}
        ref={webView => {
          this.webView.ref = webView;
        }}
        javaScriptEnabled={true}
        onLoad={this.onLoadWebView}
        onMessage={this.onWebViewMessage}
      />
    );
  }
}
