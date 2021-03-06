import React from 'react';
import {View, Text, Image, Modal} from 'react-native';
import AnimatedLottieView from 'lottie-react-native';

export default Loading2 = props => {
    return (
        <Modal visible={props.visible} transparent={false}>
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
                            ???????????? ???????????? ??? ?????????...
                        </Text>
                    </View>
                </View>
            </View>
        </Modal>
    );
};
