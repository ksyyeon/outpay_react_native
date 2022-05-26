import React from 'react';
import styles from '../styles/styles_DropOutDone';
import {BackHandler, View, Text, Image} from 'react-native';
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
                        style={styles.header_image}
                        source={require('../../assets/images/img_logo2.png')}
                    />
                </View>
                <View style={styles.content}>
                    <Image
                        style={styles.content_image}
                        source={require('../../assets/images/img_dropout1.png')}
                    />
                    <Text style={styles.content_text}>
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
