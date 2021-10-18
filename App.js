import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import * as RootNavigation from './components/RootNavigation';
import {AppScreens} from './components/AppStack';
import {SignInScreens} from './components/SignInStack';
import Splash from './components/screens/Splash';
import * as LocalStorage from './components/LocalStorage';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: false,
            autoLogin: null,
            isLoading: true,
        };
    }

    // 이벤트 동작
    async componentDidMount() {
        // setTimeout(() => SplashScreen.hide(), 2000);
        // TODO: ios에서 default 스플래시 비활성화
        const result = await this.checkUserSignedIn();
        setTimeout(() => {
            this.requestUserPermssionForFcm();
            this.setState({
                isSignedIn: result.signedIn,
                autoLogin: result.autoLogin,
                isLoading: false,
            });
        }, 2000);
    }

    // 이벤트 해제
    componentWillUnmount() {}

    render() {
        if (this.state.isLoading) return <Splash />;
        return (
            <NavigationContainer ref={RootNavigation.navigationRef}>
                {this.state.isSignedIn ? (
                    AppScreens(this.state.autoLogin)
                ) : (
                    <SignInScreens />
                )}
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

    handleFcmMessage = () => {
        // 푸시를 받으면 호출
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            console.log(
                'A new FCM message arrived!',
                JSON.stringify(remoteMessage),
            );
            Alert.alert(
                'A new FCM message arrived!',
                JSON.stringify(remoteMessage),
            );
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
