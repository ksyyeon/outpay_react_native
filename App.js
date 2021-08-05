/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {BackHandler, Linking, Platform, ToastAndroid} from 'react-native';
import {WebView} from 'react-native-webview';
import createInvoke from 'react-native-webview-invoke/native';
// import asUtils from './asyncStorageUtils.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SendIntentAndroid from 'react-native-send-intent';

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

    // 이벤트 동작
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
        this.invoke.define('exitApp', this.exitApp);
        this.invoke.define('setUserInfo', this.setUserInfo);
        this.invoke.define('getUserInfo', this.getUserInfo);
        this.invoke.define('setUserInfoValue', this.setUserInfoValue);
        this.invoke.define('getUserInfoValue', this.getUserInfoValue);
        this.invoke.define('openBrowser', this.openBrowser);
        this.invoke.define('openShareChooser', this.openBrowser);
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

    getUserInfo = async () => {
        const userInfo = await AsyncStorage.getItem('@OutpayCert');
        return userInfo;
    };

    setUserInfo = async item => {
        await AsyncStorage.setItem('@OutpayCert', JSON.stringify(item));
    };

    getUserInfoValue = async key => {
        const userInfo = await AsyncStorage.getItem('@OutpayCert');
        const json = JSON.parse(userInfo);
        return json[key];
    };

    setUserInfoValue = async (key, value) => {
        const userInfo = await AsyncStorage.getItem('@OutpayCert');
        const json = JSON.parse(userInfo);
        json[key] = value;
        await AsyncStorage.setItem('@OutpayCert', JSON.stringify(json));
    };

    openBrowser = url => {
        if (Platform.OS === 'android') {
            SendIntentAndroid.openChromeIntent(url)
                .then(isOpened => {
                    if (!isOpened) {
                        alert('앱 실행이 실패했습니다');
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            // T0d0 ios 테스트 필요
            Linking.openURL(url).catch(err => {
                alert(
                    '앱 실행이 실패했습니다. 설치가 되어있지 않은 경우 설치하기 버튼을 눌러주세요.',
                );
            });
        }
    };
}
