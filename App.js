import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RootNavigation from './components/RootNavigation';
import {AppScreens} from './components/AppStack';
import {SignInScreens} from './components/SignInStack';
import {SampleScreen} from './components/screens/Sample';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: null,
        };

        // this.checkUserSignedIn();
    }

    checkUserSignedIn = async () => {
        const userInfo = await AsyncStorage.getItem('@OutpayCert');
        console.log('userInfo: ', userInfo);
        if (userInfo != null) {
            console.log('등록회원');
            return true;
            // const json = JSON.parse(userInfo);
            // RootNavigation.navigate('MainWebView', {telNum: json['telNum']});
        } else {
            console.log('미등록회원');
            return false;
            // RootNavigation.navigate('OnBoarding', null);
        }
    };

    // 이벤트 동작
    async componentDidMount() {
        setTimeout(() => SplashScreen.hide(), 2000);
        const result = await this.checkUserSignedIn();
        this.setState({isSignedIn: result});
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
