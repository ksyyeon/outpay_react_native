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
import createInvoke from 'react-native-webview-invoke/native';

export default class App extends React.Component {
    //   webView = {
    //     ref: null,
    //   };

    // Todo 전화번호 파일에서 읽어와서 url에 이어붙이기
    constructor(props) {
        super(props);
        this.state = {
            webViewUrl:
                'http://172.16.21.58/osiris/.development/appIndex.html?mode=devMode&telNum=010-5060-3160#',
        };
        this.invoke = createInvoke(() => this.webView);
    }

    onLoadWebView = () => {};

    onBackPress = () => {
        const showBackView = `ifs.jsIF.showBackView()`;
        this.webView.injectJavaScript(showBackView);
        return true;
    };

    exitApp = () => {
        ToastAndroid.show('한번 더 누르시면 종료됩니다.', ToastAndroid.SHORT);
        this.exitApp = true;
        this.timeout = setTimeout(() => {
            this.exitApp = false;
        }, 2000);

        if (this.exitApp) {
            clearTimeout(this.timeout);
            BackHandler.exitApp();
        }

        return true;

        // if (this.exitApp === undefined || !this.exitApp) {
        //     ToastAndroid.show(
        //         '한번 더 누르시면 종료됩니다.',
        //         ToastAndroid.SHORT,
        //     );
        //     this.exitApp = true;
        //     this.timeout = setTimeout(() => {
        //         this.exitApp = false;
        //     }, 2000);
        // } else {
        //     clearTimeout(this.timeout);
        //     BackHandler.exitApp();
        // }
        // return true;
    };

    // 이벤트 동작
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
        this.invoke.define('exitApp', this.exitApp);
    }

    // 이벤트 해제
    componentWillUnmount() {
        // this.exitApp = false;
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }

    render() {
        return (
            <WebView
                source={{uri: this.state.webViewUrl}}
                ref={webView => {
                    this.webView = webView;
                }}
                javaScriptEnabled={true}
                onLoad={this.onLoadWebView}
                onMessage={this.invoke.listener}
            />
        );
    }
}
