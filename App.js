import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import * as RootNavigation from './components/RootNavigation';
import {AppScreens} from './components/AppStack';
import {SignInScreens} from './components/SignInStack';
import Splash from './components/screens/Splash';
import * as LocalStorage from './components/LocalStorage';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import CommonDialog from './components/screens/CommonDialog';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: false,
            autoLogin: null,
            isLoading: true,
            isModalVisible: false,
        };
    }

    // 이벤트 동작
    async componentDidMount() {
        // setTimeout(() => SplashScreen.hide(), 2000);
        // TODO: iOS에서 default 스플래시 비활성화
        const result = await this.checkUserSignedIn();
        setTimeout(() => {
            this.setState({
                isSignedIn: result.signedIn,
                autoLogin: result.autoLogin,
                isLoading: false,
            });
            this.createPushNotiChannel();
            this.requestUserPermssionForFcm();
        }, 2000);
    }

    // 이벤트 해제
    componentWillUnmount() {}

    render() {
        if (this.state.isLoading) return <Splash />;
        return (
            <NavigationContainer ref={RootNavigation.navigationRef}>
                <CommonDialog
                    visible={this.state.isModalVisible}
                    titleDisplay={'flex'}
                    title={'결제요청 알림'}
                    content={
                        '새로운 결제요청이 있습니다.\n지금 결제하시겠습니까?'
                    }
                    cancelDisplay={'flex'}
                    confirmClicked={() => {
                        this.setState({isModalVisible: false});
                    }}
                    cancelClicked={() => {
                        this.setState({isModalVisible: false});
                    }}
                />
                {this.state.isSignedIn
                    ? AppScreens(this.state.autoLogin)
                    : SignInScreens()}
            </NavigationContainer>
        );
    }

    checkUserSignedIn = async () => {
        const userInfo = await LocalStorage.getUserInfo();
        const appConfig = await LocalStorage.getAppConfig();
        console.log('userInfo: ', userInfo);
        console.log('appConfig: ', appConfig);
        if (userInfo != null && appConfig != null) {
            console.log('등록회원');
            return {signedIn: true, autoLogin: JSON.parse(appConfig).autoLogin};
            // const json = JSON.parse(userInfo);
            // RootNavigation.navigate('MainWebView', {telNum: json['telNum']});
        } else {
            console.log('미등록회원');
            return {signedIn: false, autoLogin: null};
            // RootNavigation.navigate('OnBoarding', null);
        }
    };

    requestUserPermssionForFcm = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            const token = await messaging().getToken();

            console.log('fcm token:', token);
            console.log('Authorization status:', authStatus);

            this.handleFcmMessage();
        } else {
            console.log('fcm auth failed!');
        }
    };

    createPushNotiChannel = () => {
        PushNotification.createChannel(
            {
                channelId: 'channel-id',
                channelName: 'ChannelName',
            },
            created => console.log(' Channel created: ', created),
        );
    };

    handleFcmMessage = () => {
        //  Foreground 상태에서 FCM 메세지를 받으면 호출
        messaging().onMessage(async remoteMessage => {
            console.log('FCM message:', JSON.stringify(remoteMessage));

            // TODO 상황별로 푸시,팝업 보여주기
            // 푸시 형식
            PushNotification.localNotification({
                // Android Only
                channelId: 'channel-id',
                showWhen: true,
                when: remoteMessage.sentTime,
                color: '#ff6801',
                largeIcon: '',

                // Android & iOS
                message: remoteMessage.notification.body,
                title: remoteMessage.notification.title,
            });

            // 팝업 형식
            this.setState({isModalVisible: true});
        });

        // 알림창을 클릭한 경우 호출
        messaging().onNotificationOpenedApp(remoteMessage => {
            console.log(
                'Notification caused app to open from background state:',
                remoteMessage.notification,
            );
        });
    };
}
