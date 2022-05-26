import React from 'react';
import styles from '../styles/styles_OnBoarding';
import {View, Text, Image, BackHandler} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../CustomButton';

export default class OnBoarding extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.backHandler) this.backHandler.remove();
        this.backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            this.onBackPress.bind(this),
        );
    }

    componentWillUnmount() {
        if (this.backHandler) this.backHandler.remove();
    }

    onBackPress = () => {
        BackHandler.exitApp();
    };

    onPress = async () => {
        await AsyncStorage.multiSet([
            [
                'AppConfig',
                JSON.stringify({
                    opMode: 'prdMode',
                    pltMode: 'appMode',
                    atum: {
                        devSrv: 'https://dev.outpay.co.kr:59090',
                        prdSrv: 'https://do-outpay.com:9090',
                        local: 'http://localhost:9090',
                        host: 'https://do-outpay.com:9090',
                    },
                }),
            ],
            [
                'OutpayCert',
                JSON.stringify({
                    atumCert: {
                        opsKeySid: 4,
                        opsPubKey: `-----BEGIN RSA Public Key-----
                    MIGJAoGBAMrrksgu9TbOvjhC2WT1IS4sMbazcG7UN9C1+Zt2MsEkdAyMSOYXIPHq
                    wQONjRZVoTKhFxhB8h5/lc27HrNTe7YlIcV+jb4EjAPxAfik2K81Hci2bq9tsscp
                    rfPRfcHe42ZIOLg8d+8QW83nd/MGifCrv8y6qtKRM5QgjKk/zOvVAgMBAAE=
                    -----END RSA Public Key-----`,
                    },
                    userAuth: {
                        loginNonce: null,
                        userOneTimeKey: null,
                        userSid: null,
                        userTableName: null,
                        rcvdPayreqsTableName: null,
                        sndablePayreqsTableName: null,
                    },
                    userInfo: {
                        telNum: '010-5060-3160',
                        name: '주신탁',
                        email: '',
                        password: '',
                    },
                }),
            ],
            ['RecentHistory', '[]'],
            ['BlockList', '[]'],
            [
                'UserVars',
                JSON.stringify({
                    payReqPush: false,
                    expReqPush: false,
                    autoLogin: true,
                    payReqLock: true,
                    denialPopupNotiDate: '',
                    accessAgree: false,
                }),
            ],
        ]);

        this.props.navigation.navigate('SetPinCode', {
            entryScreen: 'OnBoarding',
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Image
                        style={styles.image}
                        source={require('../../assets/images/img_logo.png')}
                    />
                    <Text style={styles.text}>
                        지금 아웃페이로 결제를 주고받아보세요.
                    </Text>
                </View>

                <View style={styles.footer}>
                    <CustomButton
                        buttonColor={'#ff6801'}
                        title={'시작하기'}
                        onPress={this.onPress}
                    />
                </View>
            </View>
        );
    }
}
