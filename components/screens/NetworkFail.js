import React from 'react';
import {View, Text, Image, Button} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class NetworkFail extends React.Component {
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#ffff',
                    paddingBottom: 60,
                }}>
                <View
                    style={{
                        height: 60,
                        width: '100%',
                        // backgroundColor: '#D8E2DC',
                    }}>
                    <Image
                        source={require('../../assets/images/img_logo2.png')}
                        style={{
                            resizeMode: 'contain',
                            height: 20,
                            width: 97,
                            marginLeft: 20,
                            marginTop: 20,
                        }}
                    />
                </View>

                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        // backgroundColor: 'grey',
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
                            fontSize: 16,
                            marginBottom: 10,
                        }}>
                        네트워크가 연결되지 않았습니다.
                    </Text>

                    <Text
                        style={{
                            fontFamily: 'NanumSquareR',
                            fontSize: 13,
                            textAlign: 'center',
                            lineHeight: 20,
                        }}>
                        네트워크 연결을 확인한 후, 다시 시도해주세요.
                    </Text>

                    <TouchableOpacity
                        style={{
                            marginTop: 30,
                            backgroundColor: '#f0f1f5',
                            width: 150,
                            height: 40,
                            justifyContent: 'center',
                            borderRadius: 2,
                        }}>
                        <Text
                            style={{
                                fontFamily: 'NanumSquareB',
                                textAlign: 'center',
                            }}>
                            새로고침
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
