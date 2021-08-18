/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
    ActivityIndicator,
    Alert,
    BackHandler,
    Linking,
    Platform,
    ToastAndroid,
    View,
} from 'react-native';
import {WebView} from 'react-native-webview';
import createInvoke from 'react-native-webview-invoke/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SendIntentAndroid from 'react-native-send-intent';
import Share from 'react-native-share';
import SplashScreen from 'react-native-splash-screen';
import InAppBrowser from 'react-native-inappbrowser-reborn';

export default class App extends React.Component {
    // Todo 전화번호 파일에서 읽어와서 url에 이어붙이기
    constructor(props) {
        super(props);
        this.state = {
            webViewUrl:
                'http://172.16.21.58/osiris/.development/appIndex.html?mode=devMode&telNum=010-5060-3160#',
            webViewLoaded: false,
        };
        this.invoke = createInvoke(() => this.webView);
    }

    // 이벤트 동작
    componentDidMount() {
        setTimeout(() => SplashScreen.hide(), 2000);
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
        this.invoke.define('exitApp', this.exitApp);
        this.invoke.define('setUserInfo', this.setUserInfo);
        this.invoke.define('getUserInfo', this.getUserInfo);
        this.invoke.define('setUserInfoValue', this.setUserInfoValue);
        this.invoke.define('getUserInfoValue', this.getUserInfoValue);
        this.invoke.define('openBrowser', this.openBrowser);
        this.invoke.define('openShareChooser', this.openShareChooser);
        this.invoke.define('toast', this.toast);
        this.invoke.define('openInAppBrowser', this.openInAppBrowser);
    }

    // 이벤트 해제
    componentWillUnmount() {
        this.exitApp = false;
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                {/* {this.state.webViewLoaded ? null : <SplashScreen />} */}
                <WebView
                    sytle={{flex: 1}}
                    source={{uri: this.state.webViewUrl}}
                    ref={webView => {
                        this.webView = webView;
                    }}
                    originWhitelist={['*']}
                    javaScriptEnabled={true}
                    onLoadEnd={this.onLoadWebViewEnd}
                    onMessage={this.invoke.listener}
                    onShouldStartLoadWithRequest={event => {
                        return this.onShouldStartLoadWithRequest(event);
                    }}
                />
            </View>
        );
    }

    onLoadWebViewEnd = () => {
        this.setState({webViewLoaded: true});
        //TODO View 선택해서 로드하기
        const selectView = ``;
        this.webView.injectJavaScript(selectView);
        return true;
    };

    onShouldStartLoadWithRequest = event => {
        if (
            event.url.startsWith('http://') ||
            event.url.startsWith('https://') ||
            event.url.startsWith('about:blank')
        ) {
            return true;
        }
        if (Platform.OS === 'android') {
            SendIntentAndroid.openAppwithUri(event.url)
                .then(isOpened => {
                    if (!isOpened) {
                        alert('앱 실행이 실패했습니다');
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            Linking.openURL(event.url).catch(err => {
                alert(
                    '앱 실행에 실패했습니다. 설치가 되어있지 않은 경우 설치하기 버튼을 눌러주세요.',
                );
            });
            return false;
        }
    };

    onBackPress = () => {
        //TODO OS별 showBackView 호출
        const showBackView = `ifs.jsIF.showBackView()`;
        this.webView.injectJavaScript(showBackView);
        return true;
    };

    exitApp = () => {
        BackHandler.exitApp();
    };

    toast = msg => {
        ToastAndroid.show(msg, ToastAndroid.SHORT);
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
            // TODO ios 테스트 필요
            Linking.openURL(url).catch(err => {
                alert(
                    '앱 실행이 실패했습니다. 설치가 되어있지 않은 경우 설치하기 버튼을 눌러주세요.',
                );
            });
        }
    };

    openShareChooser = url => {
        if (Platform.OS === 'android') {
            SendIntentAndroid.openChooserWithOptions(
                {
                    subject: 'Story Title',
                    text: url,
                },
                'Share Story',
            );
        } else {
            // TODO ios 테스트 필요
            Share.share({
                message: url,
            })
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };

    openInAppBrowser = url => {
        try {
            if (InAppBrowser.isAvailable()) {
                const result = InAppBrowser.open(url, {
                    // iOS Properties
                    dismissButtonStyle: 'cancel',
                    preferredBarTintColor: '#453AA4',
                    preferredControlTintColor: 'white',
                    readerMode: false,
                    animated: true,
                    modalPresentationStyle: 'fullScreen',
                    modalTransitionStyle: 'coverVertical',
                    modalEnabled: true,
                    enableBarCollapsing: false,
                    // Android Properties
                    showTitle: false,
                    toolbarColor: 'white',
                    secondaryToolbarColor: 'black',
                    navigationBarColor: 'black',
                    navigationBarDividerColor: 'white',
                    enableUrlBarHiding: false,
                    enableDefaultShare: false,
                    forceCloseOnRedirection: false,
                    // Specify full animation resource identifier(package:anim/name)
                    // or only resource name(in case of animation bundled with app).
                    animations: {
                        startEnter: 'slide_in_right',
                        startExit: 'slide_out_left',
                        endEnter: 'slide_in_left',
                        endExit: 'slide_out_right',
                    },
                });
                console.log(JSON.stringify(result));
            } else {
                Linking.openURL(url);
            }
        } catch (error) {
            console.log(error.message);
        }
    };
}
