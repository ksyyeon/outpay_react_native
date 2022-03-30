import React from 'react';
import {BackHandler, View, StyleSheet, Text, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

export default class DropOutDone extends React.Component {
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

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image
                        style={{
                            resizeMode: 'contain',
                            height: 20,
                            width: 97,
                        }}
                        source={require('../../assets/images/img_logo2.png')}
                    />
                </View>
                <View style={styles.content}>
                    <Image
                        style={{
                            resizeMode: 'contain',
                            height: 180,
                            width: 320,
                            marginTop: 100,
                        }}
                        source={require('../../assets/images/img_dropout1.png')}
                    />
                    <Text
                        style={{
                            fontSize: 20,
                            fontFamily: 'NanumSquareR',
                            marginTop: 30,
                        }}>
                        탈퇴가 완료되었습니다.
                    </Text>
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity
                        style={styles.confirm_btn}
                        onPress={() => {
                            this.props.navigation.replace('OnBoarding', null);
                        }}>
                        <LinearGradient
                            colors={['#ff6801', '#fe812f']}
                            style={styles.btn_gradient}>
                            <Text style={styles.btn_text}>확인</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        width: '100%',
        height: 60,
        backgroundColor: '#ffff',
        padding: 20,
        justifyContent: 'flex-start',
    },
    content: {
        flex: 1,
        backgroundColor: '#ffff',
        alignItems: 'center',
    },
    footer: {
        width: '100%',
        padding: 20,
        backgroundColor: '#ffff',
    },
    confirm_btn: {
        width: '100%',
        height: 50,
    },

    btn_gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },

    btn_text: {
        fontFamily: 'NanumSquareR',
        fontSize: 18,
        color: '#ffff',
    },
});
