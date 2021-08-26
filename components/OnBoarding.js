import React from 'react';
import {StyleSheet, View, Button} from 'react-native';
import * as LocalStorage from './LocalStorage';

export default class OnBoarding extends React.Component {
    render() {
        return (
            <View style={[styles.slide, {backgroundColor: '#C04DEE'}]}>
                <Button
                    title="Start"
                    onPress={() => {
                        LocalStorage.setUserInfo({telNum: '010-5060-3160'});
                        // this.props.navigation.navigate('MainWebView', {
                        //     telNum: LocalStorage.getUserInfoValue('telNum'),
                        // });
                        LocalStorage.getUserInfoValue('telNum').then(result => {
                            console.log('telNum: ', result);
                        });
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    // Slide styles
    slide: {
        flex: 1, // Take up all screen
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
    },
    // Header styles
    header: {
        color: '#FFFFFF',
        fontFamily: 'Avenir',
        fontSize: 30,
        fontWeight: 'bold',
        marginVertical: 15,
    },
    // Text below header
    text: {
        color: '#FFFFFF',
        fontFamily: 'Avenir',
        fontSize: 18,
        marginHorizontal: 40,
        textAlign: 'center',
    },
});
