import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Image} from 'react-native';

const CheckBox = props => {
    const icon_src = props.isChecked
        ? require('../assets/images/icon_checkbox1_on.png')
        : require('../assets/images/icon_checkbox1.png');

    return (
        <TouchableOpacity onPress={props.onPress}>
            <Image source={icon_src} style={styles.img_icon} />
        </TouchableOpacity>
    );
};

export default CheckBox;

const styles = StyleSheet.create({
    img_icon: {
        width: 22,
        height: 22,
    },
});
