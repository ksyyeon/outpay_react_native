import React from 'react';
import {BackHandler, Linking, Platform, ToastAndroid, View} from 'react-native';
import {WebView} from 'react-native-webview';
import createInvoke from 'react-native-webview-invoke/native';
import SendIntentAndroid from 'react-native-send-intent';
import Share from 'react-native-share';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import Spinner from 'react-native-loading-spinner-overlay';
import {localStorage} from '../LocalStorage';
import Snackbar from 'react-native-snackbar';
import {selectContactPhone} from 'react-native-select-contact';
import AccessModal from './AccessModal';
import CommonDialog from './CommonDialog';
import Loading from './Loading';
import BottomTabBar from '../BottomTabBar';
import appConsts from '../AppConsts';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import {fcmService} from '../FCMService';
import {localNotificationService} from '../LocalNotificationService';

export default class MainWebView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialUrl: null,
            telNum: null,
            isLoading: true,
            isSpinnerVisible: false,
            spinnerMsg: '',
            checkAccess: false,
            isDialogVisible: true,
            isNotiVisible: false,
            notiJs: null,
            dialogContent: null,
            isNBVisible: false,
            selectedNB: 'home',
        };
        this.mainWebViewRef = React.createRef();
        this.webViewRef = null;
        this.invoke = createInvoke(() => this.webViewRef);
        this.backHandler = null;
        this.URL_CD = appConsts.URL_CD;
    }

    async componentDidMount() {
        const telNum = await localStorage.getUserInfoValue('telNum');

        this.setState({
            initialUrl: this.URL_CD.URL_INDEX + telNum,
            telNum: telNum,
        });

        if (this.backHandler) this.backHandler.remove();
        this.backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            this.onBackPress.bind(this),
        );

        this.invokeIfs();

        const accessAgree = await localStorage.getUserVarsValue('accessAgree');
        if (!accessAgree) {
            this.setState({checkAccess: true});
        } else {
            fcmService.registerAppWithFCM();
            fcmService.register(
                this.onRegister,
                this.onNotification,
                this.onOpenNotification,
            );

            localNotificationService.configure(this.onOpenNotification);
        }
    }

    componentWillUnmount() {
        if (this.backHandler) this.backHandler.remove();

        console.log('[MainWebView] unRegister');
        fcmService.unRegister();
        localNotificationService.unRegister();
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <AccessModal
                    visible={this.state.checkAccess}
                    confirmClicked={() => {
                        this.setState({checkAccess: false});
                        fcmService.registerAppWithFCM();
                        fcmService.register(
                            this.onRegister,
                            this.onNotification,
                            this.onOpenNotification,
                        );

                        localNotificationService.configure(
                            this.onOpenNotification,
                        );
                        // TODO: FCM Token 서버로 전송
                    }}
                />
                <CommonDialog
                    visible={this.state.isNotiVisible}
                    titleDisplay={'flex'}
                    title={'알림'}
                    content={'새로운 알림이 있습니다.'}
                    cancelDisplay={'flex'}
                    confirmClicked={() => {
                        this.setState({isNotiVisible: false});
                        if (this.state.notiJs !== null)
                            this.webViewRef.injectJavaScript(this.state.notiJs);
                    }}
                    cancelClicked={() => {
                        this.setState({isNotiVisible: false});
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
                                    this.URL_CD.URL_HOME,
                                );
                                break;
                            case 'rshop':
                                this.webViewRef.injectJavaScript(
                                    this.URL_CD.URL_RSHOP,
                                );
                                break;
                            case 'event':
                                this.webViewRef.injectJavaScript(
                                    this.URL_CD.URL_EVENT,
                                );
                                break;
                            case 'settings':
                                this.webViewRef.injectJavaScript(
                                    this.URL_CD.URL_SETTINGS,
                                );
                                break;
                        }
                    }}
                />
            </View>
        );
    }

    onRegister = token => {
        console.log('[MainWebView] onRegister : token :', token);
    };

    onNotification = async (notification, data) => {
        // state: foreground
        console.log(
            '[MainWebView] onNotification notification: ',
            notification,
        );
        console.log('[MainWebView] onNotification data: ', data);

        // TODO: 푸시메시지의 종류에 따라서 처리
        if (typeof data !== undefined || data !== null)
            if (data.type === appConsts.FCM_CD.PAYREQ) {
                this.setState({
                    isNotiVisible: true,
                    notiJs: data.js,
                });
            }

        // const options = {
        //     soundName: 'default',
        //     playSound: true,
        // };
        // localNotificationService.showNotification(
        //     0,
        //     notification.title,
        //     notification.body,
        //     notification,
        //     options,
        // );
    };

    onOpenNotification = (notification, data) => {
        // state: background & quit
        console.log(
            '[MainWebView] onOpenNotification notification :',
            notification,
        );
        console.log('[MainWebView] onOpenNotification data :', data);

        if (typeof data !== 'undefined' && data !== null)
            if (data.js !== null) this.webViewRef.injectJavaScript(data.js);
    };

    onLoadEnd = () => {
        setTimeout(() => {
            this.setState({isLoading: false});
        }, 1000);
        // TODO View 선택해서 로드하기 테스트
        console.log(
            '[MainWebView] this.props.route.params: ',
            this.props.route.params,
        );
        if (
            typeof this.props.route.params !== 'undefined' &&
            this.props.route.params !== null
        ) {
            const js = this.props.route.params.js;
            if (js !== null) this.webViewRef.injectJavaScript(js);
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

        if (Platform.OS === 'ios' && event.url.startsWith('intent')) {
            Linking.openURL(event.url).catch(err => {
                this.setState({
                    dialogContent:
                        '앱 실행에 실패했습니다.{\n}설치가 되어있지 않은 경우 설치하기 버튼을 눌러주세요.',
                });
            });
            return false;
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
        // TODO: OS별 showBackView 호출
        this.webViewRef.injectJavaScript(this.URL_CD.URL_BACKVIEW);
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

    openSubWebView = (url, title) => {
        this.props.navigation.navigate('SubWebView', {
            name: title,
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
            console.log('[MainWebView] Android Permission Contacts:', granted);
            switch (granted) {
                case RESULTS.GRANTED:
                    return this.getContact();
                case RESULTS.DENIED:
                    const result = await request(
                        PERMISSIONS.ANDROID.READ_CONTACTS,
                    );
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
            return {
                acqName: contact.name,
                acqTelNum: selectedPhone.number,
            };
        });
    };

    navigateScreen = async (screen, param) => {
        // 화면 이동
        this.props.navigation.navigate(screen, param);
    };

    openSms = body => {
        // 문자 or 카카오톡 선택
        // 수신인 선택
        const SMSDivider = Platform.OS === 'android' ? '?' : '&';
        Linking.openURL(`sms:${SMSDivider}body=${body}`);
    };

    openTel = tel => {
        Linking.openURL(`tel:${tel}`);
    };

    invokeIfs = () => {
        this.invoke.define('getAppConfig', localStorage.setAppConfig);
        this.invoke.define('setAppConfig', localStorage.getAppConfig);
        this.invoke.define('getAppConfigValue', localStorage.setAppConfigValue);
        this.invoke.define('setAppConfigValue', localStorage.getAppConfigValue);
        this.invoke.define('getUserInfo', localStorage.getUserInfo);
        this.invoke.define('setUserInfo', localStorage.setUserInfo);
        this.invoke.define('getUserInfoValue', localStorage.getUserInfoValue);
        this.invoke.define('setUserInfoValue', localStorage.setUserInfoValue);
        this.invoke.define('getRecentHistory', localStorage.getRecentHistory);
        this.invoke.define('setRecentHistory', localStorage.setRecentHistory);
        this.invoke.define('getBlockList', localStorage.getBlockList);
        this.invoke.define('setBlockList', localStorage.setBlockList);
        this.invoke.define('getUserVars', localStorage.getUserVars);
        this.invoke.define('setUserVars', localStorage.setUserVars);
        this.invoke.define('getUserVarsValue', localStorage.getUserVarsValue);
        this.invoke.define('setUserVarsValue', localStorage.setUserVarsValue);
        this.invoke.define('clearStorage', localStorage.clearStorage);
        this.invoke.define('showNB', this.showNB);
        this.invoke.define('hideNB', this.hideNB);
        this.invoke.define('setSelectedNB', this.setSelectedNB);
        this.invoke.define('hideSpinner', this.hideSpinner);
        this.invoke.define('showSpinner', this.showSpinner);
        this.invoke.define('exitApp', this.exitApp);
        this.invoke.define('openBrowser', this.openBrowser);
        // TODO: copyClipBoard: 링크 클립보드 복사
        this.invoke.define('openShareChooser', this.openShareChooser);
        this.invoke.define('toast', this.toast);
        this.invoke.define('openInAppBrowser', this.openInAppBrowser);
        this.invoke.define('openSubWebView', this.openSubWebView);
        this.invoke.define('openSelfAuth', this.openSelfAuth);
        this.invoke.define(
            'requestContactPermission',
            this.requestContactPermission,
        );
        this.invoke.define('navigateScreen', this.navigateScreen);
        this.invoke.define('openSms', this.openSms);
        this.invoke.define('openTel', this.openTel);
    };
}
