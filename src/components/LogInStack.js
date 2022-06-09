import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainWebView from './screens/MainWebView';
import SubWebView from './screens/SubWebView';
import LoginPinCode from './screens/LoginPinCode';
import SetPinCode from './screens/SetPinCode';
import SelfAuth from './screens/SelfAuth';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Image} from 'react-native';
import DropOutDone from './screens/DropOutDone';
import SelectDefault from './screens/SelectDefault';

const LogInStack = createStackNavigator();

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

export default AppScreens = autoLogin => {
    console.log('[LogInStack] AppScrenns created');
    return (
        <LogInStack.Navigator>
            <LogInStack.Group>
                {/* <LogInStack.Screen
                    name="SelectDefault"
                    component={SelectDefault}
                    options={() => ({
                        headerShown: false,
                    })}
                /> */}
                {autoLogin ? null : (
                    <LogInStack.Screen
                        name="LoginPinCode"
                        component={LoginPinCode}
                        options={() => ({
                            headerShown: false,
                        })}
                    />
                )}
                <LogInStack.Screen
                    name="MainWebView"
                    component={MainWebView}
                    options={() => ({
                        headerShown: false,
                    })}
                />
                <LogInStack.Screen
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
                <LogInStack.Screen
                    name="SelfAuth"
                    component={SelfAuth}
                    options={({navigation}) => ({
                        headerShown: true,
                        headerTitle: '',
                        headerLeft: () => HeaderBackButton(navigation),
                        headerRight: () => null,
                    })}
                />
                <LogInStack.Screen
                    name="SetPinCode"
                    component={SetPinCode}
                    options={() => ({
                        headerShown: false,
                    })}
                />
                <LogInStack.Screen
                    name="DropOutDone"
                    component={DropOutDone}
                    options={() => ({
                        headerShown: false,
                    })}
                />
            </LogInStack.Group>

            <LogInStack.Group
                screenOptions={{presentation: 'modal'}}></LogInStack.Group>
        </LogInStack.Navigator>
    );
};
