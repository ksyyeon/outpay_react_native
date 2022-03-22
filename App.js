import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import * as RootNavigation from './components/RootNavigation';
import {AppScreens} from './components/AppStack';
import {SignInScreens} from './components/SignInStack';
import Splash from './components/screens/Splash';
import {localStorage} from './components/LocalStorage';
import CommonDialog from './components/screens/CommonDialog';
import {fcmService} from './components/FCMService';
import {localNotificationService} from './components/LocalNotificationService';
import NetInfo from '@react-native-community/netinfo';
import NetworkFail from './components/screens/NetworkFail';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: false,
            isLoading: true,
            isDialogVisible: false,
            js: null,
            networkUnsubscribe: null,
            networkConnected: false,
            userVars: null,
        };
    }

    // 이벤트 동작
    componentDidMount() {
        // setTimeout(() => SplashScreen.hide(), 2000);
        // TODO: iOS에서 default 스플래시 비활성화
        setTimeout(async () => {
            // this.createPushNotiChannel();
            this.state.userVars = await localStorage.getUserVars();
            if (this.state.userVars !== null) {
                if (this.state.userVars.accessAgree) {
                    fcmService.registerAppWithFCM();
                    fcmService.register(
                        this.onRegister,
                        this.onNotification,
                        this.onOpenNotification,
                    );

                    localNotificationService.configure(this.onOpenNotification);
                }
            }

            this.checkNetworkConnected();
        }, 2000);
    }

    // 이벤트 해제
    componentWillUnmount() {
        // networkUnsubscribe();

        console.log('[App] unRegister');
        fcmService.unRegister();
        localNotificationService.unRegister();
    }

    onRegister = token => {
        console.log('[App] onRegister : token :', token);
    };

    onNotification = async (notification, data) => {
        // state: foreground
        console.log('[App] onNotification notification: ', notification);
        console.log('[App] onNotification data: ', data);

        // "data" : {
        //     "title" : "title",
        //     "message" : "message",
        //     "type" : "payReq, expReq ...",
        //     "js" : "웹뷰에서 실행 시킬 코드"
        // }

        // TODO: 푸시메시지의 종류(결제요청 알림, 만료 임박 알림...)에 따라서 처리
        if (typeof data !== undefined || data !== null)
            if (data.type === 'payReq') {
                this.setState({isDialogVisible: true, js: data.js});
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
        console.log('[App] onOpenNotification notification :', notification);
        console.log('[App] onOpenNotification data :', data);

        // js: 푸시를 눌렀을 때 보여줘야 할 뷰로 이동하는 코드
        if (typeof data !== undefined || data !== null)
            RootNavigation.push('MainWebView', {
                js: data.js,
            });
    };

    render() {
        if (this.state.isLoading) return <Splash />;
        return (
            <NavigationContainer ref={RootNavigation.navigationRef}>
                <CommonDialog
                    visible={this.state.isDialogVisible}
                    titleDisplay={'flex'}
                    title={'결제요청 알림'}
                    content={
                        '새로운 결제요청이 있습니다.\n지금 결제하시겠습니까?'
                    }
                    cancelDisplay={'flex'}
                    confirmClicked={() => {
                        this.setState({isDialogVisible: false});
                        RootNavigation.push('MainWebView', {
                            js: this.state.js,
                        });
                    }}
                    cancelClicked={() => {
                        this.setState({isDialogVisible: false});
                    }}
                />
                {this.state.networkConnected ? (
                    this.state.isSignedIn ? (
                        AppScreens(this.state.autoLogin)
                    ) : (
                        SignInScreens()
                    )
                ) : (
                    <NetworkFail />
                )}
            </NavigationContainer>
        );
    }

    checkUserSignedIn = async () => {
        const cert = await AsyncStorage.getItem('OutpayCert');
        console.log('[App] outpayCert:', cert);
        console.log('[App] userVars: ', this.state.userVars);
        if (cert !== null && this.state.userVars !== null) {
            console.log('[App] 등록회원');
            return {signedIn: true, autoLogin: this.state.userVars.autoLogin};
        } else {
            console.log('[App] 미등록회원');
            return {signedIn: false, autoLogin: null};
        }
    };

    checkNetworkConnected = () => {
        NetInfo.fetch().then(async state => {
            const result = await this.checkUserSignedIn();
            console.log('[App] Connection type', state.type);
            console.log('[App] Is connected?', state.isConnected);
            this.setState({
                isSignedIn: result.signedIn,
                autoLogin: result.autoLogin,
                isLoading: false,
                networkConnected: state.isConnected,
            });
        });
    };
}
