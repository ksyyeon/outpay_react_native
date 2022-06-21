import React from 'react';
import styles from '../styles/styles_CommonDialog';
import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native';
const CommonDialog = props => {
    return (
        <Modal visible={props.dialogProps.isVisible} transparent={true}>
            <View style={styles.layout}>
                <View style={styles.dialog}>
                    <View style={styles.text_wrap}>
                        <Text
                            style={StyleSheet.flatten([
                                styles.title,
                                {display: props.dialogProps.titleDisplay},
                            ])}>
                            {props.dialogProps.title}
                        </Text>
                        <Text style={styles.content}>
                            {props.dialogProps.content}
                        </Text>
                    </View>
                    <View style={styles.btn_wrap}>
                        <TouchableOpacity
                            style={StyleSheet.flatten([
                                styles.cancel_btn,
                                {display: props.dialogProps.cancelDisplay},
                            ])}
                            onPress={() => {}}>
                            <Text style={styles.btn_text}>취소</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.confirm_btn}
                            onPress={() => {}}>
                            <Text style={styles.btn_text}>확인</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default CommonDialog;