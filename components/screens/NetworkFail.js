import React from 'react';
import styles from '../styles/styles_NetWorkFail';
import {View, Text, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default NetworkFail = () => {
    return (
        <View style={styles.container}>
            <View style={styles.logo_wrap}>
                <Image
                    source={require('../../assets/images/img_logo2.png')}
                    style={styles.logo}
                />
            </View>

            <View style={styles.image_wrap}>
                <Image
                    source={require('../../assets/images/icon_wifi.png')}
                    style={styles.image}
                />
                <Text style={styles.title}>
                    네트워크가 연결되지 않았습니다.
                </Text>

                <Text style={styles.desc}>
                    네트워크 연결을 확인한 후, 다시 시도해주세요.
                </Text>

                <TouchableOpacity style={styles.reload_btn}>
                    <Text style={styles.btn_text}>새로고침</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
