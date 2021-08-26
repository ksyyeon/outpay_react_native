import React from 'react';
import {
    BackHandler,
    Linking,
    PermissionsAndroid,
    Platform,
    ToastAndroid,
    View,
} from 'react-native';
import {WebView} from 'react-native-webview';
import createInvoke from 'react-native-webview-invoke/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SendIntentAndroid from 'react-native-send-intent';
import Share from 'react-native-share';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import Spinner from 'react-native-loading-spinner-overlay';
import Snackbar from 'react-native-snackbar';
import SplashScreen from 'react-native-splash-screen';
import {selectContact, selectContactPhone} from 'react-native-select-contact';
import {select} from 'async';

export default class MainWebView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            webViewUrl:
                'http://172.16.21.112/osiris/.development/appIndex.html?mode=devMode&telNum=010-5060-3160#',
                // 'http://172.16.21.133:8080/osiris/.development/appIndex.html?mode=devMode&telNum=010-5060-3160#',
            webViewLoaded: false,
            visible: false,
            text: '',
        };
        this.invoke = createInvoke(() => this.webView);
    }

    componentDidMount() {
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
        this.invoke.define('showSpinner', this.showSpinner);
        this.invoke.define('hideSpinner', this.hideSpinner);
        this.invoke.define('openSubWebView', this.openSubWebView);
        this.invoke.define('getContact', this.requestContactPermission);
    }

    // 이벤트 해제
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Spinner
                    visible={this.state.visible}
                    color={'#ff6801'}
                    textContent={this.state.text}
                />
                <WebView
                    sytle={{flex: 1}}
                    source={{
                        uri: this.state.webViewUrl,
                    }}
                    ref={webView => {
                        this.webView = webView;
                    }}
                    cacheEnabled={false}
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

    showSpinner = msg => {
        this.setState({visible: true, text: msg});
    };

    hideSpinner = () => {
        this.setState({visible: false});
    };

    exitApp = () => {
        BackHandler.exitApp();
    };

    toast = msg => {
        if (Platform.OS === 'android' ){
            ToastAndroid.show(msg, ToastAndroid.SHORT);
        } else{
            Snackbar.show({text:msg, duration:Snackbar.LENGTH_SHORT});
        }
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

    openSubWebView = url => {
        this.props.navigation.navigate('SubWebView', {uri: url});
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
            Share.open({
                title: 'Welcome',
                // message: 'get your first tickest here',
                url: url
            })
            .catch((err) => console.log('user did not share or ' + err));
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

    requestContactPermission = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                return this.getContact();
            } else {
                alert(
                    '주소록 접근 권한을 거부하셨습니다. [설정] > [애플리케이션] 에서 권한을 허용할 수 있습니다.',
                );
            }
        } else {
            // TODO ios 연락처 접근권한 체크?
            return this.getContact();
        }
    };

    getContact = async () => {
        return selectContactPhone().then(selection => {
            if (!selection) {
                return null;
            }
            let {contact, selectedPhone} = selection;
            console.log(
                `Selected ${selectedPhone.type} phone number ${selectedPhone.number} from ${contact.name}`,
            );
            return selectedPhone.number;
        });
    };
}
