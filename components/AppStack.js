import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainWebView from './screens/MainWebView';
import SubWebView from './screens/SubWebView';
import LoginPinCode from './screens/LoginPinCode';
import SelfAuth from './screens/SelfAuth';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Image} from 'react-native';

const AppStack = createStackNavigator();

export const AppScreens = autoLogin => {
    console.log('[AppStack] AppScrenns created');
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
                <AppStack.Screen
                    name="SelfAuth"
                    component={SelfAuth}
                    options={() => ({
                        headerShown: true,
                        headerTitle: '',
                        headerLeft: () => null,
                        headerRight: () => (
                            <TouchableOpacity
                                onPress={() => {
                                    alert('dismiss button');
                                }}>
                                <Image
                                    style={{
                                        width: 15,
                                        height: 15,
                                        marginRight: 20,
                                    }}
                                    source={require('../assets/images/icon_close1.png')}
                                />
                            </TouchableOpacity>
                        ),
                    })}
                />
            </AppStack.Group>

            <AppStack.Group
                screenOptions={{presentation: 'modal'}}></AppStack.Group>
        </AppStack.Navigator>
    );
};
