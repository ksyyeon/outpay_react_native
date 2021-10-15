import React from 'react';
import {StyleSheet, View, Text, Image, Button} from 'react-native';
import * as LocalStorage from '../LocalStorage';
import CustomButton from '../CustomButton';

export default class OnBoarding extends React.Component {
    _onPress = async () => {
        LocalStorage.setUserInfo({
            name: '주신탁',
            telNum: '010-5060-3160',
            email: '',
            password: '',
        });

        LocalStorage.setBlockList([]);

        LocalStorage.setAppConfig({
            payReqPush: false,
            expReqPush: false,
            autoLogin: true,
            payReqLock: true,
            denialPopupNotiDate: '',
            accessAgree: false,
        });

        this.props.navigation.navigate('SetPinCode', null);
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Image
                        style={styles.image}
                        source={require('../../assets/images/logo_image.png')}
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
