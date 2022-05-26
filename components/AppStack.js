import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainWebView from './screens/MainWebView';
import SubWebView from './screens/SubWebView';
import LoginPinCode from './screens/LoginPinCode';
import SetPinCode from './screens/SetPinCode';
import SelfAuth from './screens/SelfAuth';
import ConfirmPinCode from './screens/ConfirmPinCode';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Image} from 'react-native';
import DropOutDone from './screens/DropOutDone';
import SelectDefault from './screens/SelectDefault';

const AppStack = createStackNavigator();

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
    console.log('[AppStack] AppScrenns created');
    return (
        <AppStack.Navigator>
            <AppStack.Group>
                {/* <AppStack.Screen
                    name="SelectDefault"
                    component={SelectDefault}
                    options={() => ({
                        headerShown: false,
                    })}
                /> */}
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
                    options={({navigation}) => ({
                        headerShown: true,
                        headerTitle: '',
                        headerLeft: () => HeaderBackButton(navigation),
                        headerRight: () => null,
                    })}
                />
                <AppStack.Screen
                    name="SetPinCode"
                    component={SetPinCode}
                    options={() => ({
                        headerShown: false,
                    })}
                />
                <AppStack.Screen
                    name="ConfirmPinCode"
                    component={ConfirmPinCode}
                    options={() => ({
                        headerShown: false,
                    })}
                />
                <AppStack.Screen
                    name="DropOutDone"
                    component={DropOutDone}
                    options={() => ({
                        headerShown: false,
                    })}
                />
            </AppStack.Group>

            <AppStack.Group
                screenOptions={{presentation: 'modal'}}></AppStack.Group>
        </AppStack.Navigator>
    );
};
