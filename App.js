import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import MainWebView from './components/MainWebView';
import SubWebView from './components/SubWebView';
import OnBoarding from './components/OnBoarding';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RootNavigation from './components/RootNavigation';

const Stack = createStackNavigator();

export default class App extends React.Component {
    // Todo 전화번호 파일에서 읽어와서 url에 이어붙이기
    constructor(props) {
        super(props);
        this.state = {};

        this.checkUserSignedIn();
    }

    // 이벤트 동작
    componentDidMount() {
        setTimeout(() => SplashScreen.hide(), 2000);
    }

    // 이벤트 해제
    componentWillUnmount() {}

    render() {
        return (
            <NavigationContainer ref={RootNavigation.navigationRef}>
                <Stack.Navigator>
                    <Stack.Screen
                        name="OnBoarding"
                        component={OnBoarding}
                        options={() => ({
                            headerShown: false,
                        })}
                    />
                    <Stack.Screen
                        name="MainWebView"
                        component={MainWebView}
                        options={() => ({
                            headerShown: false,
                        })}
                    />
                    <Stack.Screen
                        name="SubWebView"
                        component={SubWebView}
                        options={() => ({
                            headerShown: true,
                            headerTitleAlign: 'center',
                            headerTitleStyle: {
                                fontFamily: 'NanumSquareB',
                                fontSize: 18,
                            },
                        })}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }

    checkUserSignedIn = async () => {
        const userInfo = await AsyncStorage.getItem('@OutpayCert');
        if (userInfo != null) {
            // TODO 자동로그인 여부 체크
            // this.checkAutoLogin(result => {
            //     if (result) {
            //         // 홈 화면으로
            //     } else {
            //         // 비밀번호 입력 화면으로
            //     }
            // });
            console.log('등록회원');
            const json = JSON.parse(userInfo);
            RootNavigation.navigate('MainWebView', {telNum: json['telNum']});
        } else {
            console.log('미등록회원');
            RootNavigation.navigate('OnBoarding', null);
        }
    };

    checkAutoLogin = async () => {
        const userInfo = await AsyncStorage.getItem('@OutpayCert');
        const json = JSON.parse(userInfo);
        return json['autoLogin'];
    };
}
