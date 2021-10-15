import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainWebView from './screens/MainWebView';
import SubWebView from './screens/SubWebView';
import LoginPinCode from './screens/LoginPinCode';

const AppStack = createStackNavigator();

export const AppScreens = autoLogin => {
    console.log('AppScrenns created');
    return (
        <AppStack.Navigator>
            <AppStack.Group>
                {autoLogin ? null : (
                    <AppStack.Screen
                        name="LoginPinCode"
                        component={LoginPinCode}
                        options={() => ({
                            headerShown: false,
                        })}
                    />
                )}
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
