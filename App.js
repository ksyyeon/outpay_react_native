/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import MainWebView from './components/MainWebView';
import SubWebView from './components/SubWebView';

const Stack = createStackNavigator();

export default class App extends React.Component {
    // Todo 전화번호 파일에서 읽어와서 url에 이어붙이기
    constructor(props) {
        super(props);
        this.state = {};
    }

    // 이벤트 동작
    componentDidMount() {
        setTimeout(() => SplashScreen.hide(), 2000);
    }

    // 이벤트 해제
    componentWillUnmount() {}

    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
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
                            headerShown: false,
                        })}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}
