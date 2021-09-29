import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainWebView from './MainWebView';
import SubWebView from './SubWebView';

// TODO 화면추가: 접근권한안내 팝업, 비밀번호 입력...
// TODO 자동로그인 여부 체크
// checkAutoLogin = async () => {
//     const userInfo = await AsyncStorage.getItem('@AppConfig');
//     const json = JSON.parse(userInfo);
//     return json['autoLogin'];
// };

const AppStack = createStackNavigator();
export const AppScreens = () => {
    return (
        <AppStack.Navigator>
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
        </AppStack.Navigator>
    );
};
