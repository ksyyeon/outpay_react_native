import React from 'react';
import {View, Text, Image, Animated, Easing} from 'react-native';
import LottieView from 'lottie-react-native';
import AnimatedLottieView from 'lottie-react-native';

export default class Loading extends React.Component {
    render() {
        return (
            <View
                style={{
                    flex: 1,

                    backgroundColor: '#ffff',
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
                    }}>
                    <View
                        style={{
                            height: '35%',
                            // backgroundColor: '#FFD7BA',
                            // justifyContent: 'flex-end',
                            // alignItems: 'center',
                        }}>
                        <AnimatedLottieView
                            source={require('../../assets/animations/loading2.json')}
                            style={{
                                marginTop: 50,
                            }}
                            autoPlay
                            loop
                        />
                    </View>
                    <View
                        syle={{
                            flex: 1,
                        }}>
                        <Image
                            source={require('../../assets/images/img_loading.png')}
                            style={{
                                resizeMode: 'contain',
                                height: 180,
                                width: 320,
                                alignSelf: 'center',
                            }}
                        />
                        <Text
                            style={{
                                marginTop: 20,
                                fontFamily: 'NanumSquareB',
                                alignSelf: 'center',
                            }}>
                            데이터를 불러오는 중 입니다...
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}
