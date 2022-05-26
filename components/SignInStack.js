import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import MainWebView from './screens/MainWebView';
import SubWebView from './screens/SubWebView';
import OnBoarding from './screens/OnBoarding';
import SetPinCode from './screens/SetPinCode';
import ConfirmPinCode from './screens/ConfirmPinCode';
import SelfAuth from './screens/SelfAuth';
import DropOutDone from './screens/DropOutDone';

// TODO 화면추가: 본인인증 ...
const SignInStack = createStackNavigator();

const HeaderBackButton = navigation => {
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.goBack();
            }}>
            <Image
                style={{
                    width: 25,
                    height: 25,
                    marginLeft: 20,
                }}
                source={require('../assets/images/icon_left.png')}
            />
        </TouchableOpacity>
    );
};

const HeaderCloseButton = navigation => {
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.goBack();
            }}>
            <Image
                style={{
                    width: 20,
                    height: 20,
                    marginRight: 20,
                }}
                source={require('../assets/images/icon_close1.png')}
            />
        </TouchableOpacity>
    );
};

export const SignInScreens = () => {
    console.log('[SignInStack] SignInScrenns created');
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
                <SignInStack.Screen
                    name="SelfAuth"
                    component={SelfAuth}
                    options={({navigation}) => ({
                        headerShown: true,
                        headerTitle: '',
                        headerLeft: () => HeaderBackButton(navigation),
                        headerRight: () => null,
                    })}
                />
                <SignInStack.Screen
                    name="DropOutDone"
                    component={DropOutDone}
                    options={() => ({
                        headerShown: false,
                    })}
                />
            </SignInStack.Group>

            <SignInStack.Group
                screenOptions={{presentation: 'modal'}}></SignInStack.Group>
        </SignInStack.Navigator>
    );
};
