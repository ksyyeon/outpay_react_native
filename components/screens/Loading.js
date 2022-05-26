import React from 'react';
import {View, Text, Modal} from 'react-native';
import LottieView from 'lottie-react-native';

export default Loading = props => {
    return (
        <Modal visible={this.props.visible} transparent={true}>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                }}>
                <LottieView
                    source={require('../../assets/animations/loading2.json')}
                    style={{
                        width: 150,
                        height: 150,
                    }}
                    autoPlay
                    loop
                />
            </View>
        </Modal>
    );
};
