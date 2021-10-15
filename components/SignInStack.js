import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainWebView from './screens/MainWebView';
import SubWebView from './screens/SubWebView';
import OnBoarding from './screens/OnBoarding';
import PushModal from './screens/PushModal';
import AccessModal from './screens/AccessModal';
import SetPinCode from './screens/SetPinCode';
import ConfirmPinCode from './screens/ConfirmPinCode';

// TODO 화면추가: 본인인증, 비밀번호설정 ...
const SignInStack = createStackNavigator();
export const SignInScreens = () => {
    console.log('SignInScrenns created');
    return (
        <SignInStack.Navigator>
            <SignInStack.Group>
                <SignInStack.Screen
                    name="OnBoarding"
                    component={OnBoarding}
                    options={() => ({
                        headerShown: false,
                    })}
                />
                <SignInStack.Screen
                    name="SetPinCode"
                    component={SetPinCode}
                    options={() => ({
                        headerShown: false,
                    })}
                />
                <SignInStack.Screen
                    name="ConfirmPinCode"
                    component={ConfirmPinCode}
                    options={() => ({
                        headerShown: false,
                    })}
                />
                <SignInStack.Screen
                    name="MainWebView"
                    component={MainWebView}
                    options={() => ({
                        headerShown: false,
                    })}
                />
                <SignInStack.Screen
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
            </SignInStack.Group>

            <SignInStack.Group
                screenOptions={{presentation: 'modal'}}></SignInStack.Group>
        </SignInStack.Navigator>
    );
};
