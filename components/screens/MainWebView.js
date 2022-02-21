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
import SendIntentAndroid from 'react-native-send-intent';
import Share from 'react-native-share';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import Spinner from 'react-native-loading-spinner-overlay';
import * as LocalStorage from '../LocalStorage';
import Snackbar from 'react-native-snackbar';
import {selectContactPhone} from 'react-native-select-contact';
import AccessModal from './AccessModal';
import CommonDialog from './CommonDialog';
import Loading from './Loading';
import BottomTabBar from '../BottomTabBar';
import appConsts from '../AppConsts';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';

export default class MainWebView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialUrl: null,
            telNum: null,
            isLoading: true,
            isSpinnerVisible: false,
            spinnerMsg: '',
            isModalVisible: false,
            isDialogVisible: true,
            dialogContent: null,
            isNBVisible: false,
            selectedNB: 'home',
        };
        this.mainWebViewRef = React.createRef();
        this.webViewRef = null;
        this.invoke = createInvoke(() => this.webViewRef);
        this.backHandler = null;
        this.urlConsts = appConsts.urlConsts;
    }

    async componentDidMount() {
        const telNum = await LocalStorage.getUserInfoValue('telNum');
        this.setState({
            initialUrl: this.urlConsts.URL_INDEX + telNum,
            telNum: telNum,
        });

        if (this.backHandler) this.backHandler.remove();
        this.backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            this.onBackPress.bind(this),
        );

        this.invokeIfs();

        const accessAgree = await LocalStorage.getAppConfigValue('accessAgree');
        if (accessAgree) {
            this.setState({isModalVisible: false});
        }
    }

    componentWillUnmount() {
        if (this.backHandler) this.backHandler.remove();
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <AccessModal
                    visible={this.state.isModalVisible}
                    confirmClicked={() => {
                        this.setState({isModalVisible: false});
                    }}
                />
                {this.state.dialogContent && (
                    <CommonDialog
                        visible={this.state.isDialogVisible}
                        titleDisplay={'none'}
                        content={this.state.dialogContent}
                        cancelDisplay={'none'}
                        confirmClicked={() => {
                            this.setState({isDialogVisible: false});
                        }}
                    />
                )}
                <Loading visible={this.state.isLoading} />
                <Spinner
                    visible={this.state.isSpinnerVisible}
                    color={'#ff6801'}
                    textContent={this.state.spinnerMsg}
                />
                <WebView
                    sytle={{flex: 1}}
                    source={{uri: this.state.initialUrl}}
                    ref={webView => {
                        this.webViewRef = webView;
                    }}
                    originWhitelist={['http://*', 'https://*', 'intent://*']}
                    javaScriptEnabled={true}
                    onLoad={() => this.onLoadEnd()}
                    onMessage={this.invoke.listener}
                    onShouldStartLoadWithRequest={event =>
                        this.onShouldStartLoadWithRequest(event)
                    }
                    cacheEnabled={false}
                    cacheMode={'LOAD_NO_CACHE'}
                    incognito={true}
                />
                <BottomTabBar
                    visible={this.state.isNBVisible}
                    selected={this.state.selectedNB}
                    onPress={label => {
                        this.setState({selectedNB: label});
                        switch (label) {
                            case 'payreqs':
                                this.webViewRef.injectJavaScript(
                                    this.urlConsts.URL_HOME,
                                );
                                break;
                            case 'rshop':
                                this.webViewRef.injectJavaScript(
                                    this.urlConsts.URL_RSHOP,
                                );
                                break;
                            case 'event':
                                this.webViewRef.injectJavaScript(
                                    this.urlConsts.URL_EVENT,
                                );
                                break;
                            case 'settings':
                                this.webViewRef.injectJavaScript(
                                    this.urlConsts.URL_SETTINGS,
                                );
                                break;
                        }
                    }}
                />
            </View>
        );
    }

    onLoadEnd = () => {
        setTimeout(() => {
            this.setState({isLoading: false});
        }, 1000);
        // TODO View 선택해서 로드하기
        console.log(
            '[MainWebView] this.props.route.params: ',
            this.props.route.params,
        );
        if (
            typeof this.props.route.params !== 'undefined' &&
            this.props.route.params !== null
        ) {
            console.log(
                '[MainWebView] this.props.route.params.js: ',
                this.props.route.params.js,
            );
            const selectView = this.props.route.params.js;
            this.webViewRef.injectJavaScript(selectView);
        }
        return true;
    };

    onShouldStartLoadWithRequest = event => {
        // console.log('onShouldStart called: ', event.url);
        // if (event.url.startsWith('http')) {
        //     // Linking.openURL(event.url);
        //     this.setState({initialUrl: event.url});
        // }
        if (Platform.OS === 'android' && event.url.startsWith('intent')) {
            SendIntentAndroid.openChromeIntent(event.url)
                .then(isOpened => {
                    if (!isOpened) {
                        this.setState({
                            dialogContent:
                                '앱 실행에 실패했습니다.{\n}설치가 되어있지 않은 경우 설치하기 버튼을 눌러주세요.',
                        });
                    }
                    return false;
                })
                .catch(err => {
                    console.log(err);
                });
            return false;
        }

        if (Platform.OS === 'ios') {
            return true;
        }
        return true;

        // TODO 앱카드 실행 테스트
        // if (
        //     event.url.startsWith('http://') ||
        //     event.url.startsWith('https://') ||
        //     event.url.startsWith('about:blank')
        // ) {
        //     return true;
        // }
        // if (Platform.OS === 'android') {
        //     console.log('openAppWithUri Called: ', event.url);
        //     SendIntentAndroid.openAppWithUri(event.url)
        //         .then(isOpened => {
        //             if (!isOpened) {
        //                 this.setState({
        //                     dialogContent:
        //                         '앱 실행에 실패했습니다.{\n}설치가 되어있지 않은 경우 설치하기 버튼을 눌러주세요.',
        //                 });
        //             }
        //         })
        //         .catch(err => {
        //             console.log(err);
        //         });
        // } else {
        //     Linking.openURL(event.url).catch(err => {
        //         this.setState({
        //             dialogContent:
        //                 '앱 실행에 실패했습니다.{\n}설치가 되어있지 않은 경우 설치하기 버튼을 눌러주세요.',
        //         });
        //     });
        //     return false;
        // }
    };

    onBackPress = () => {
        //TODO OS별 showBackView 호출
        //TODO 뷰가 아직 생성 안됐을 때 뒤로가기
        this.webViewRef.injectJavaScript(this.urlConsts.URL_BACKVIEW);
        return true;
    };

    showSpinner = msg => {
        this.setState({isSpinnerVisible: true, spinnerMsg: msg});
    };

    hideSpinner = () => {
        this.setState({isSpinnerVisible: false});
    };

    showNB = label => {
        this.setState({isNBVisible: true});
        console.log('[MainWebView] showNB label:', label);
        this.setState({selectedNB: label});
    };

    hideNB = () => {
        this.setState({isNBVisible: false});
    };

    setSelectedNB = label => {
        console.log('[MainWebView] setSelectedNB label:', label);
        this.setState({selectedNB: label});
    };

    exitApp = () => {
        BackHandler.exitApp();
    };

    toast = msg => {
        if (Platform.OS === 'android') {
            ToastAndroid.show(msg, ToastAndroid.SHORT);
        } else {
            Snackbar.show({text: msg, duration: Snackbar.LENGTH_SHORT});
        }
    };

    openSubWebView = url => {
        this.props.navigation.navigate('SubWebView', {
            uri: url,
        });
    };

    openSelfAuth = param => {
        this.props.navigation.navigate('SelfAuth', {param: param});
    };

    openBrowser = url => {
        console.log('opnBrowser Called: ', url);
        if (Platform.OS === 'android') {
            SendIntentAndroid.openChromeIntent(url)
                .then(isOpened => {
                    if (!isOpened) {
                        this.setState({
                            dialogContent:
                                '앱 실행에 실패했습니다.{\n}설치가 되어있지 않은 경우 설치하기 버튼을 눌러주세요.',
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            // TODO ios 테스트 필요
            Linking.openURL(url).catch(err => {
                this.setState({
                    dialogContent:
                        '앱 실행에 실패했습니다.{\n}설치가 되어있지 않은 경우 설치하기 버튼을 눌러주세요.',
                });
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
                url: url,
            }).catch(err =>
                console.log('[MainWebView] user did not share or ' + err),
            );
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
                console.log('[MainWebView]', JSON.stringify(result));
            } else {
                Linking.openURL(url);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    requestContactPermission = async () => {
        if (Platform.OS === 'android') {
            const granted = await check(PERMISSIONS.ANDROID.READ_CONTACTS);
            console.log('[MainWebView] IOS Permission Contacts:', granted);
            switch (granted) {
                case RESULTS.GRANTED:
                    return this.getContact();
                case RESULTS.DENIED:
                    const result = await request(PERMISSIONS.ANDROID.READ_CONTACTS);
                    if (result === RESULTS.GRANTED) {
                        return this.getContact();
                    } else {
                        this.setState({
                            dialogContent:
                                '주소록 접근 권한을 거부하셨습니다.\n[설정] > [애플리케이션] 에서 권한을 허용할 수 있습니다.',
                        });
                        return null;
                    }
                case RESULTS.BLOCKED:
                    this.setState({
                        dialogContent:
                            '주소록 접근 권한을 거부하셨습니다.\n[설정] > [애플리케이션] 에서 권한을 허용할 수 있습니다.',
                    });
                    return null;
            }
        } else {
            const granted = await check(PERMISSIONS.IOS.CONTACTS);
            console.log('[MainWebView] IOS Permission Contacts:', granted);
            switch (granted) {
                case RESULTS.GRANTED:
                    return this.getContact();
                case RESULTS.DENIED:
                    const result = await request(PERMISSIONS.IOS.CONTACTS);
                    if (result === RESULTS.GRANTED) {
                        return this.getContact();
                    } else {
                        this.setState({
                            dialogContent:
                                '주소록 접근 권한을 거부하셨습니다.\n[설정] > [애플리케이션] 에서 권한을 허용할 수 있습니다.',
                        });
                        return null;
                    }
                case RESULTS.BLOCKED:
                    this.setState({
                        dialogContent:
                            '주소록 접근 권한을 거부하셨습니다.\n[설정] > [애플리케이션] 에서 권한을 허용할 수 있습니다.',
                    });
                    return null;
            }
        }
        
    };

    getContact = async () => {
        console.log('[MainWebView] getContact is called');
        return selectContactPhone().then(selection => {
            if (!selection) {
                return null;
            }
            let {contact, selectedPhone} = selection;
            console.log(
                `[MainWebView] Selected ${selectedPhone.type} phone number ${selectedPhone.number} from ${contact.name}`,
            );
            return selectedPhone.number;
        });
    };


    navigateNext = (screen, param) => {
        // 화면이동 호출
        this.props.navigation.navigate(screen, param);
    };

    invokeIfs = () => {
        this.invoke.define('exitApp', this.exitApp);
        this.invoke.define('setUserInfo', LocalStorage.setUserInfo);
        this.invoke.define('getUserInfo', LocalStorage.getUserInfo);
        this.invoke.define('setUserInfoValue', LocalStorage.setUserInfoValue);
        this.invoke.define('getUserInfoValue', LocalStorage.getUserInfoValue);
        this.invoke.define('openBrowser', this.openBrowser);
        this.invoke.define('openShareChooser', this.openShareChooser);
        this.invoke.define('toast', this.toast);
        this.invoke.define('openInAppBrowser', this.openInAppBrowser);
        this.invoke.define('showNB', this.showNB);
        this.invoke.define('hideNB', this.hideNB);
        this.invoke.define('setSelectedNB', this.setSelectedNB);
        this.invoke.define('showSpinner', this.showSpinner);
        this.invoke.define('hideSpinner', this.hideSpinner);
        this.invoke.define('openSubWebView', this.openSubWebView);
        this.invoke.define('openSelfAuth', this.openSelfAuth);
        this.invoke.define('requestContactPermission', this.requestContactPermission);
        this.invoke.define('setAppConfig', LocalStorage.setAppConfig);
        this.invoke.define('getAppConfig', LocalStorage.getAppConfig);
        this.invoke.define('setAppConfigValue', LocalStorage.setAppConfigValue);
        this.invoke.define('getAppConfigValue', LocalStorage.getAppConfigValue);
        this.invoke.define('getBlockList', LocalStorage.getBlockList);
        this.invoke.define('setBlockList', LocalStorage.setBlockList);
        this.invoke.define('clearStorage', LocalStorage.clearStorage);
        this.invoke.define('requestPushPermission', this.requestPushPermission);
        this.invoke.define('navigateNext', this.navigateNext);
    };
}
