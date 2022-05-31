import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import * as RootNavigation from './components/RootNavigation';
import Splash from './components/screens/Splash';
import AppScreens from './components/LogInStack';
import {SignInScreens} from './components/SignInStack';
import {localStorage} from './components/LocalStorage';
import CommonDialog from './components/screens/CommonDialog';
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
            this.state.userVars = await localStorage.getUserVars();

            this.checkNetworkConnected();
        }, 2000);
    }

    // 이벤트 해제
    componentWillUnmount() {
        // networkUnsubscribe();
    }

    render() {
        if (this.state.isLoading) return <Splash />;
        return (
            <NavigationContainer ref={RootNavigation.navigationRef}>
                <CommonDialog
                    visible={this.state.isDialogVisible}
                    titleDisplay={'flex'}
                    title={'알림'}
                    content={'새로운 알림이 있습니다'}
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
            // TODO: 비밀번호 설정 안하고 종료했을 때도 미등록회원으로
            if (
                cert.userInfo.password.length < 6 ||
                cert.userInfo.password === undefined
            ) {
                console.log('[App] 등록회원');
                return {
                    signedIn: true,
                    autoLogin: this.state.userVars.autoLogin,
                };
            }
        }
        console.log('[App] 미등록회원');
        return {signedIn: false, autoLogin: null};
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
