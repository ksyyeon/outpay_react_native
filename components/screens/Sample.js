import React from 'react';
import {View, Text} from 'react-native';

export default class Sample extends React.Component {
    render() {
        return (
            <View
                syle={{
                    flex: 1,
                }}>
                <Image
                    source={require('../../assets/images/icon_wifi.png')}
                    style={{
                        resizeMode: 'contain',
                        height: 70,
                        width: 70,
                        marginBottom: 30,
                    }}
                />
                <Text
                    style={{
                        fontFamily: 'NanumSquareB',
                    }}>
                    네트워크가 연결되지 않았습니다.
                </Text>
            </View>
        );
    }
}
