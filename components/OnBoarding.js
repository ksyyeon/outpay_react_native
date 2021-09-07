import React from 'react';
import {StyleSheet, View, Text, Image, Button} from 'react-native';
import * as LocalStorage from './LocalStorage';
import CustomButton from './CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class OnBoarding extends React.Component {
    _onPress = async () => {
        LocalStorage.setUserInfo({
            name: '주신탁',
            telNum: '010-5060-3160',
            email: '',
            blackList: ['010-4022-3839'],
        });

        LocalStorage.setAppInfo({
            autoLogin: false,
            push: false,
            denialPopupNotiDate: '',
        });

        // LocalStorage.getAppInfo().then(result => {
        //     console.log('appInfo: ', result);
        // });

        // LocalStorage.getUserInfo().then(result => {
        //     console.log('userInfo: ', result);
        // });

        // LocalStorage.getUserInfoValue('telNum').then(result => {
        //     console.log('telNum: ', result);
        //     this.props.navigation.navigate('MainWebView', {
        //         telNum: result,
        //     });
        // });

        const userInfo = await AsyncStorage.getItem('@OutpayCert');
        const json = JSON.parse(userInfo);
        this.props.navigation.navigate('MainWebView', {
            telNum: json['telNum'],
        });

        // this.props.navigation.navigate('MainWebView', {
        //     telNum: LocalStorage.getUserInfoValue('telNum'),
        // });
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Image
                        style={styles.image}
                        source={require('../assets/images/1.png')}
                    />
                    <Text style={styles.text}>
                        지금 아웃페이로 결제를 주고받아보세요.
                    </Text>
                </View>

                <View style={styles.footer}>
                    <CustomButton
                        buttonColor={'#ff6801'}
                        title={'시작하기'}
                        onPress={this._onPress}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    image: {
        height: 150,
        resizeMode: 'contain',
    },
    text: {
        marginTop: 25,
        fontFamily: 'NanumSquareB',
        fontSize: 14,
        color: '#f3985a',
    },
    header: {
        width: '100%',
        height: '20%',
        backgroundColor: '#ff9a9a',
        justifyContent: 'flex-end',
        paddingLeft: 10,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#d6ca1a',
    },
    footer: {
        width: '100%',
        height: '8%',
    },
});
