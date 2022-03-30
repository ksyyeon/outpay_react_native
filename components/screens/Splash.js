import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class Splash extends React.Component {
    render() {
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
        fontFamily: 'NanumSquareEB',
        fontSize: 12,
        color: '#f3985a',
        textAlign: 'center',
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
