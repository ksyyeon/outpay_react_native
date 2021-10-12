import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {navigationRef} from '../RootNavigation';

export default class PushModal extends React.Component {
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text>푸시알림 팝업</Text>
                <Button
                    onPress={() => this.props.navigation.goBack()}
                    title="닫기"
                />
            </View>
        );
    }
}
