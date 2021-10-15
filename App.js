import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import * as RootNavigation from './components/RootNavigation';
import {AppScreens} from './components/AppStack';
import {SignInScreens} from './components/SignInStack';
import Splash from './components/screens/Splash';
import * as LocalStorage from './components/LocalStorage';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: false,
            autoLogin: null,
            isLoading: true,
        };
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
            return {signedIn: true, autoLogin: null};
            // RootNavigation.navigate('OnBoarding', null);
        }
    };

    // 이벤트 동작
    async componentDidMount() {
        // setTimeout(() => SplashScreen.hide(), 2000);
        // TODO: ios에서 default 스플래시 비활성화
        const result = await this.checkUserSignedIn();
        setTimeout(
            () =>
                this.setState({
                    isSignedIn: result.signedIn,
                    autoLogin: result.autoLogin,
                    isLoading: false,
                }),
            2000,
        );
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
}
