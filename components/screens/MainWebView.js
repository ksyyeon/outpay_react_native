import React, {useEffect, useRef, useState} from 'react';
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
import Loading from './Loading';
import BottomTabBar from '../BottomTabBar';
import appConsts from '../AppConsts';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import {fcmService} from '../FCMService';
import {localNotificationService} from '../LocalNotificationService';
import {useDispatch} from 'react-redux';

export default MainWebView = props => {
    const [initialUrl, setInitialUrl] = useState(null);
    const [telNum, setTelNum] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSpinnerVisible, setIsSpinnerVisible] = useState(false);
    const [spinnerMsg, setSpinnerMsg] = useState('');
    const [checkPermission, setCheckPermission] = useState(false);
    const [isNBVisible, setIsNBVisible] = useState(false);
    const [NBLabel, setNBLabel] = useState('home');

    const webViewRef = useRef(null);
    const invoke = createInvoke(() => webViewRef.current);
    const URL_CD = appConsts.URL_CD;

    const dispatch = useDispatch();

    useEffect(async () => {
        const telNum = await localStorage.getUserInfoValue('telNum');
        setTelNum(telNum);
        setInitialUrl(URL_CD.URL_INDEX + telNum);

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            onBackPress,
        );

        invokeIfs(invoke);

        const permissionAgree = await localStorage.getUserVarsValue(
            'permissionAgree',
        );
        if (!permissionAgree) {
            setCheckPermission(true);
        } else {
            fcmService.registerAppWithFCM();
            fcmService.register(onRegister, onNotification, onOpenNotification);

            localNotificationService.configure(onOpenNotification);
        }

        return () => {
            backHandler.remove();

            console.log('[MainWebView] unRegister');
            fcmService.unRegister();
            localNotificationService.unRegister();
        };
    }, []);

    const onRegister = token => {
        console.log('[MainWebView] onRegister : token :', token);
    };

    const onNotification = async (notification, data) => {
        // state: foreground
        console.log(
            '[MainWebView] onNotification notification: ',
            notification,
        );
        console.log('[MainWebView] onNotification data: ', data);

        // TODO: 푸시메시지의 종류에 따라서 처리
        if (typeof data !== undefined || data !== null)
            if (data.type === appConsts.FCM_CD.PAYREQ) {
                dispatch(
                    showDialog({
                        type: 'SHOW_DIALOG',
                        calledBy: 'Notification',
                        js: data.js,
                    }),
                );
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

    const onOpenNotification = (notification, data) => {
        // state: background & quit
        console.log(
            '[MainWebView] onOpenNotification notification :',
            notification,
        );
        console.log('[MainWebView] onOpenNotification data :', data);

        if (typeof data !== 'undefined' && data !== null)
            if (data.js !== null) webViewRef.injectJavaScript(data.js);
    };

    const onLoadEnd = () => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        // TODO View 선택해서 로드하기 테스트
        console.log('[MainWebView] props.route.params: ', props.route.params);
        if (
            typeof props.route.params !== 'undefined' &&
            props.route.params !== null
        ) {
            const js = props.route.params.js;
            if (js !== null) webViewRef.injectJavaScript(js);
        }
        return true;
    };

    const onShouldStartLoadWithRequest = event => {
        if (Platform.OS === 'android' && event.url.startsWith('intent')) {
            SendIntentAndroid.openChromeIntent(event.url)
                .then(isOpened => {
                    if (!isOpened) {
                        dispatch(
                            showDialog({
                                type: 'SHOW_DIALOG',
                                calledBy: 'MainWebView',
                                content:
                                    '앱 실행에 실패했습니다.{\n}설치가 되어있지 않은 경우 설치하기 버튼을 눌러주세요.',
                            }),
                        );
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
                dispatch(
                    showDialog({
                        type: 'SHOW_DIALOG',
                        calledBy: 'MainWebView',
                        content:
                            '앱 실행에 실패했습니다.{\n}설치가 되어있지 않은 경우 설치하기 버튼을 눌러주세요.',
                    }),
                );
            });
            return false;
        }
        return true;
    };

    const onBackPress = () => {
        // TODO: OS별 showBackView 호출
        webViewRef.injectJavaScript(URL_CD.URL_BACKVIEW);
        return true;
    };

    const showSpinner = msg => {
        setIsSpinnerVisible(true);
        setSpinnerMsg(msg);
    };

    const hideSpinner = () => {
        setIsSpinnerVisible(false);
    };

    const showNB = label => {
        setIsNBVisible(true);
        setNBLabel(label);
    };

    const hideNB = () => {
        setIsNBVisible(fasle);
    };

    const setSelectedNB = label => {
        console.log('[MainWebView] setSelectedNB label:', label);
        setNBLabel(label);
    };

    const exitApp = () => {
        BackHandler.exitApp();
    };

    const toast = msg => {
        if (Platform.OS === 'android') {
            ToastAndroid.show(msg, ToastAndroid.SHORT);
        } else {
            Snackbar.show({text: msg, duration: Snackbar.LENGTH_SHORT});
        }
    };

    const openSubWebView = (url, title) => {
        props.navigation.navigate('SubWebView', {
            name: title,
            uri: url,
        });
    };

    const openSelfAuth = param => {
        props.navigation.navigate('SelfAuth', {param: param});
    };

    const openBrowser = url => {
        console.log('opnBrowser Called: ', url);
        if (Platform.OS === 'android') {
            SendIntentAndroid.openChromeIntent(url)
                .then(isOpened => {
                    if (!isOpened) {
                        dispatch(
                            showDialog({
                                type: 'SHOW_DIALOG',
                                calledBy: 'MainWebView',
                                content:
                                    '앱 실행에 실패했습니다.{\n}설치가 되어있지 않은 경우 설치하기 버튼을 눌러주세요.',
                            }),
                        );
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            // TODO ios 테스트 필요
            Linking.openURL(url).catch(err => {
                dispatch(
                    showDialog({
                        type: 'SHOW_DIALOG',
                        calledBy: 'MainWebView',
                        content:
                            '앱 실행에 실패했습니다.{\n}설치가 되어있지 않은 경우 설치하기 버튼을 눌러주세요.',
                    }),
                );
            });
        }
    };

    const openShareChooser = url => {
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

    const openInAppBrowser = url => {
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

    const requestContactPermission = async () => {
        if (Platform.OS === 'android') {
            const granted = await check(PERMISSIONS.ANDROID.READ_CONTACTS);
            console.log('[MainWebView] Android Permission Contacts:', granted);
            switch (granted) {
                case RESULTS.GRANTED:
                    return getContact();
                case RESULTS.DENIED:
                    const result = await request(
                        PERMISSIONS.ANDROID.READ_CONTACTS,
                    );
                    if (result === RESULTS.GRANTED) {
                        return getContact();
                    } else {
                        dispatch(
                            showDialog({
                                type: 'SHOW_DIALOG',
                                calledBy: 'MainWebView',
                                content:
                                    '주소록 접근 권한을 거부하셨습니다.\n[설정] > [애플리케이션] 에서 권한을 허용할 수 있습니다.',
                            }),
                        );
                        return null;
                    }
                case RESULTS.BLOCKED:
                    dispatch(
                        showDialog({
                            type: 'SHOW_DIALOG',
                            calledBy: 'MainWebView',
                            content:
                                '주소록 접근 권한을 거부하셨습니다.\n[설정] > [애플리케이션] 에서 권한을 허용할 수 있습니다.',
                        }),
                    );
                    return null;
            }
        } else {
            const granted = await check(PERMISSIONS.IOS.CONTACTS);
            console.log('[MainWebView] IOS Permission Contacts:', granted);
            switch (granted) {
                case RESULTS.GRANTED:
                    return getContact();
                case RESULTS.DENIED:
                    const result = await request(PERMISSIONS.IOS.CONTACTS);
                    if (result === RESULTS.GRANTED) {
                        return getContact();
                    } else {
                        dispatch(
                            showDialog({
                                type: 'SHOW_DIALOG',
                                calledBy: 'MainWebView',
                                content:
                                    '주소록 접근 권한을 거부하셨습니다.\n[설정] > [애플리케이션] 에서 권한을 허용할 수 있습니다.',
                            }),
                        );
                        return null;
                    }
                case RESULTS.BLOCKED:
                    dispatch(
                        showDialog({
                            type: 'SHOW_DIALOG',
                            calledBy: 'MainWebView',
                            content:
                                '주소록 접근 권한을 거부하셨습니다.\n[설정] > [애플리케이션] 에서 권한을 허용할 수 있습니다.',
                        }),
                    );
                    return null;
            }
        }
    };

    const getContact = async () => {
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

    const navigateScreen = async (screen, param) => {
        // 화면 이동
        props.navigation.navigate(screen, param);
    };

    const openSms = body => {
        // 문자 or 카카오톡 선택
        // 수신인 선택
        const SMSDivider = Platform.OS === 'android' ? '?' : '&';
        Linking.openURL(`sms:${SMSDivider}body=${body}`);
    };

    const openTel = tel => {
        Linking.openURL(`tel:${tel}`);
    };

    const invokeIfs = invoke => {
        invoke.define('getAppConfig', localStorage.setAppConfig);
        invoke.define('setAppConfig', localStorage.getAppConfig);
        invoke.define('getAppConfigValue', localStorage.setAppConfigValue);
        invoke.define('setAppConfigValue', localStorage.getAppConfigValue);
        invoke.define('getUserInfo', localStorage.getUserInfo);
        invoke.define('setUserInfo', localStorage.setUserInfo);
        invoke.define('getUserInfoValue', localStorage.getUserInfoValue);
        invoke.define('setUserInfoValue', localStorage.setUserInfoValue);
        invoke.define('getRecentHistory', localStorage.getRecentHistory);
        invoke.define('setRecentHistory', localStorage.setRecentHistory);
        invoke.define('getBlockList', localStorage.getBlockList);
        invoke.define('setBlockList', localStorage.setBlockList);
        invoke.define('getUserVars', localStorage.getUserVars);
        invoke.define('setUserVars', localStorage.setUserVars);
        invoke.define('getUserVarsValue', localStorage.getUserVarsValue);
        invoke.define('setUserVarsValue', localStorage.setUserVarsValue);
        invoke.define('clearStorage', localStorage.clearStorage);
        invoke.define('showNB', showNB);
        invoke.define('hideNB', hideNB);
        invoke.define('setSelectedNB', setSelectedNB);
        invoke.define('hideSpinner', hideSpinner);
        invoke.define('showSpinner', showSpinner);
        invoke.define('exitApp', exitApp);
        invoke.define('openBrowser', openBrowser);
        // TODO: copyClipBoard: 링크 클립보드 복사
        invoke.define('openShareChooser', openShareChooser);
        invoke.define('toast', toast);
        invoke.define('openInAppBrowser', openInAppBrowser);
        invoke.define('openSubWebView', openSubWebView);
        invoke.define('openSelfAuth', openSelfAuth);
        invoke.define('requestContactPermission', requestContactPermission);
        invoke.define('navigateScreen', navigateScreen);
        invoke.define('openSms', openSms);
        invoke.define('openTel', openTel);
    };

    return (
        <View style={{flex: 1}}>
            <AccessModal
                visible={checkPermission}
                confirmClicked={() => {
                    setCheckPermission(false);
                    fcmService.registerAppWithFCM();
                    fcmService.register(
                        onRegister,
                        onNotification,
                        onOpenNotification,
                    );

                    localNotificationService.configure(onOpenNotification);
                    // TODO: FCM Token 서버로 전송
                }}
            />
            <Loading visible={isLoading} />
            <Spinner
                visible={isSpinnerVisible}
                color={'#ff6801'}
                textContent={spinnerMsg}
            />
            <WebView
                sytle={{flex: 1}}
                source={{uri: initialUrl}}
                ref={webViewRef}
                originWhitelist={['http://*', 'https://*', 'intent://*']}
                javaScriptEnabled={true}
                onLoad={() => onLoadEnd()}
                onMessage={invoke.listener}
                onShouldStartLoadWithRequest={event =>
                    onShouldStartLoadWithRequest(event)
                }
                cacheEnabled={false}
                cacheMode={'LOAD_NO_CACHE'}
                incognito={true}
            />
            <BottomTabBar
                visible={isNBVisible}
                selected={NBLabel}
                onPress={label => {
                    setNBLabel(label);
                    switch (label) {
                        case 'payreqs':
                            webViewRef.injectJavaScript(URL_CD.URL_HOME);
                            break;
                        case 'rshop':
                            webViewRef.injectJavaScript(URL_CD.URL_RSHOP);
                            break;
                        case 'event':
                            webViewRef.injectJavaScript(URL_CD.URL_EVENT);
                            break;
                        case 'settings':
                            webViewRef.injectJavaScript(URL_CD.URL_SETTINGS);
                            break;
                    }
                }}
            />
        </View>
    );
};
