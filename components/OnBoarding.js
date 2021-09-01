import React from 'react';
import {StyleSheet, View, Button, TouchableOpacity, Text} from 'react-native';
import * as LocalStorage from './LocalStorage';

export default class OnBoarding extends React.Component {
    render() {
        return (
            <View style={[styles.slide, {backgroundColor: '#ffff'}]}>
                <Text style={styles.text}>
                    아웃페이로 결제를 주고받아 보세요!
                </Text>
                <TouchableOpacity>
                    <View style={styles.button}>
                        <Text style={styles.button_text}>시작하기</Text>
                    </View>
                </TouchableOpacity>
                {/* title="시작하기"
                    onPress={() => {
                        LocalStorage.setUserInfo({
                            name: '주신탁',
                            telNum: '010-5060-3160',
                            email: '',
                            blackList: [],
                        });

                        LocalStorage.setAppInfo({
                            autoLogin: false,
                            push: false,
                        });

                        LocalStorage.getUserInfo().then(result => {
                            console.log('userInfo: ', result);
                        });

                        LocalStorage.getAppInfo().then(result => {
                            console.log('appInfo: ', result);
                        });

                        // this.props.navigation.navigate('MainWebView', {
                        //     telNum: LocalStorage.getUserInfoValue('telNum'),
                        // });
                    }} */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    // Slide styles
    slide: {
        flex: 1, // Take up all screen
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
    },
    // Header styles
    header: {
        color: '#FFFFFF',
        fontFamily: 'NanumSquareB',
        fontSize: 30,
        marginVertical: 15,
    },
    // Text below header
    text: {
        color: '#FFFFFF',
        fontFamily: 'NanumSquareR',
        fontSize: 18,
        marginHorizontal: 40,
        textAlign: 'center',
    },
    //Button conatiner
    button: {
        borderRadius: 50, // Rounded border
        borderWidth: 2, // 2 point border widht
        borderColor: '#FFFFFF', // White colored border
        paddingHorizontal: 50, // Horizontal padding
        paddingVertical: 10, // Vertical padding
    },
    //Button text
    button_text: {
        color: '#FFFFFF',
        fontFamily: 'NanumSquareB',
    },
});
