import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RootNavigation from './components/RootNavigation';

import {AppScreens} from './components/AppStack';
import {SignInScreens} from './components/SignInStack';

export default class App extends React.Component {
    // Todo 전화번호 파일에서 읽어와서 url에 이어붙이기
    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: false,
            isAutoLogin: false,
        };

        this.checkUserSignedIn();
    }

    checkUserSignedIn = async () => {
        const userInfo = await AsyncStorage.getItem('@OutpayCert');
        console.log('userInfo: ', userInfo);
        if (userInfo != null) {
            console.log('등록회원');
            this.state.isSignedIn = true;
            // const json = JSON.parse(userInfo);
            // RootNavigation.navigate('MainWebView', {telNum: json['telNum']});
        } else {
            console.log('미등록회원');
            this.state.isSignedIn = false;
            // RootNavigation.navigate('OnBoarding', null);
        }
    };

    // 이벤트 동작
    componentDidMount() {
        setTimeout(() => SplashScreen.hide(), 2000);
    }

    // 이벤트 해제
    componentWillUnmount() {}

    render() {
        return (
            <NavigationContainer ref={RootNavigation.navigationRef}>
                {this.state.isSignedIn ? <AppScreens /> : <SignInScreens />}
            </NavigationContainer>
        );
    }
}
