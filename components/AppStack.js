import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainWebView from './screens/MainWebView';
import SubWebView from './screens/SubWebView';
import LoginPinCode from './screens/LoginPinCode';
import AsyncStorage from '@react-native-async-storage/async-storage';

// TODO 화면추가: 접근권한안내 팝업, 비밀번호 입력...
// TODO 자동로그인 여부 체크
const checkAutoLogin = async () => {
    const userInfo = await AsyncStorage.getItem('@AppConfig');
    const json = JSON.parse(userInfo);
    console.log('appLock:', json['appLock']);
    return json['appLock'];
};

const AppStack = createStackNavigator();
export const AppScreens = () => {
    console.log('AppScrenns created');
    return (
        <AppStack.Navigator>
            <AppStack.Group>
                {checkAutoLogin() ? (
                    <AppStack.Screen
                        name="LoginPinCode"
                        component={LoginPinCode}
                        options={() => ({
                            headerShown: false,
                        })}
                    />
                ) : null}
                <AppStack.Screen
                    name="MainWebView"
                    component={MainWebView}
                    options={() => ({
                        headerShown: false,
                    })}
                />
                <AppStack.Screen
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
            </AppStack.Group>

            <AppStack.Group
                screenOptions={{presentation: 'modal'}}></AppStack.Group>
        </AppStack.Navigator>
    );
};
