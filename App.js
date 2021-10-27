import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import * as RootNavigation from './components/RootNavigation';
import {AppScreens} from './components/AppStack';
import {SignInScreens} from './components/SignInStack';
import Splash from './components/screens/Splash';
import * as LocalStorage from './components/LocalStorage';
import CommonDialog from './components/screens/CommonDialog';
import {fcmService} from './components/FCMService';
import {localNotificationService} from './components/LocalNotificationService';
import Loading2 from './components/screens/Loading2';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: false,
            autoLogin: null,
            isLoading: true,
            isDialogVisible: false,
            selectView: null,
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

            // this.createPushNotiChannel();
            fcmService.register(
                this.onRegister,
                this.onNotification,
                this.onOpenNotification,
            );
            localNotificationService.configure(this.onOpenNotification);
        }, 2000);
    }

    onRegister = token => {
        console.log('[App] onRegister : token :', token);
    };

    onNotification = async (notification, data) => {
        // state: foreground
        console.log('[App] onNotification notification: ', notification);
        console.log('[App] onNotification data: ', data);

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

        this.setState({isDialogVisible: true, selectView: data.js});
    };

    onOpenNotification = (notification, data) => {
        // state: background & quit
        console.log('[App] onOpenNotification notification :', notification);
        console.log('[App] onOpenNotification data :', data);

        RootNavigation.push('MainWebView', {
            js: data.js,
        });
    };

    // 이벤트 해제
    componentWillUnmount() {
        console.log('[App] unRegister');
        fcmService.unRegister();
        localNotificationService.unRegister();
    }

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
                            js: this.state.selectView,
                        });
                    }}
                    cancelClicked={() => {
                        this.setState({isDialogVisible: false});
                    }}
                />
                {this.state.isSignedIn
                    ? AppScreens(this.state.autoLogin)
                    : SignInScreens()}
                {/* {this.state.isSignedIn ? <Loading /> : <Loading />} */}
            </NavigationContainer>
        );
    }

    checkUserSignedIn = async () => {
        const userInfo = await LocalStorage.getUserInfo();
        const appConfig = await LocalStorage.getAppConfig();
        console.log('[App] userInfo: ', userInfo);
        console.log('[App] appConfig: ', appConfig);
        if (userInfo != null && appConfig != null) {
            console.log('[App] 등록회원');
            return {signedIn: true, autoLogin: appConfig.autoLogin};
        } else {
            console.log('[App] 미등록회원');
            return {signedIn: false, autoLogin: null};
        }
    };
}
