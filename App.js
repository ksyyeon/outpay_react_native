import React, {useEffect, useState} from 'react';
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
import store from './store';
import {connect, Provider} from 'react-redux';
import * as actions from './actions';

export default App = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [autoLogin, setAutoLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [js, setJs] = useState('');
    const [networkConnected, setNetworkConnected] = useState(null);
    const [userVars, setUserVars] = useState(null);

    useEffect(() => {
        // setTimeout(() => SplashScreen.hide(), 2000);
        // TODO: iOS에서 default 스플래시 비활성화
        setTimeout(async () => {
            setUserVars(await localStorage.getUserVars());
            checkNetworkConnected();
        }, 2000);
        return () => {
            // networkUnsubscribe();
        };
    }, []);

    const checkUserSignedIn = async () => {
        let cert = await AsyncStorage.getItem('OutpayCert');
        cert = JSON.parse(cert);
        console.log('[App] outpayCert:', cert);
        console.log('[App] userVars: ', userVars);
        if (cert !== null && userVars !== null) {
            // TODO: 비밀번호 설정 안하고 종료했을 때도 미등록회원으로
            if (cert.userInfo.password.length === 6) {
                console.log('[App] 등록회원');
                return {
                    signedIn: true,
                    autoLogin: userVars.autoLogin,
                };
            }
        }
        console.log('[App] 미등록회원');
        return {signedIn: false, autoLogin: null};
    };

    const checkNetworkConnected = () => {
        NetInfo.fetch().then(async state => {
            const result = await checkUserSignedIn();
            console.log('[App] Connection type', state.type);
            console.log('[App] Is connected?', state.isConnected);
            setIsSignedIn(result.signedIn);
            setAutoLogin(result.autoLogin);
            setIsLoading(false);
            setNetworkConnected(state.isConnected);
        });
    };

    const mapStateToProps = state => ({
        dialogProps: state.dialogProps,
    });

    const CommonDialogContainer = connect(
        mapStateToProps,
        actions,
    )(CommonDialog);

    return isLoading ? (
        <Splash />
    ) : (
        <Provider store={store}>
            <NavigationContainer ref={RootNavigation.navigationRef}>
                <CommonDialogContainer />
                {networkConnected ? (
                    isSignedIn ? (
                        AppScreens(autoLogin)
                    ) : (
                        SignInScreens()
                    )
                ) : (
                    <NetworkFail />
                )}
            </NavigationContainer>
        </Provider>
    );
};
