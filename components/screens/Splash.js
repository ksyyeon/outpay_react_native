import React from 'react';
import styles from '../styles/styles_Splash';
import {View, Text, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default Splash = () => {
    return (
        <LinearGradient
            colors={['#122E46', '#081520']}
            style={styles.container}>
            <View style={styles.content}>
                <Image
                    style={styles.image}
                    source={require('../../assets/images/img_logo.png')}
                />
            </View>

            <View style={styles.footer}>
                <Text style={styles.text}>
                    Copyright © Outpay.Corp.All rights Reserved.
                </Text>
            </View>
        </LinearGradient>
    );
};
