import React from 'react';
import {View, Text, Modal} from 'react-native';
import AnimatedLottieView from 'lottie-react-native';

export default class Loading extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal visible={this.props.visible} transparent={true}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}>
                    <AnimatedLottieView
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
    }
}
