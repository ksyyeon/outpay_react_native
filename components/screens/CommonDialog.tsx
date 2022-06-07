import React from 'react';
import styles from '../styles/styles_CommonDialog';
import { View, Text, Modal, TouchableOpacity, StyleProp, TextStyle, StyleSheet } from 'react-native';

interface Props {
    visible: boolean;
    titleDisplay?: any;
    title: string;
    content: string;
    cancelDisplay?: any;
    cancelClicked: () => void;
    confirmClicked: () => void;
}

const CommonDialog = ({ visible, titleDisplay, title, content, cancelDisplay, cancelClicked, confirmClicked }: Props) => {
    return (
        <Modal visible={visible} transparent={true}>
            <View style={styles.layout}>
                <View style={styles.dialog}>
                    <View style={styles.text_wrap}>
                        <Text
                            style={
                                StyleSheet.flatten([styles.title, { display: titleDisplay }])
                            }>
                            {title}
                        </Text>
                        <Text style={styles.content}>{content}</Text>
                    </View>
                    <View style={styles.btn_wrap}>
                        <TouchableOpacity
                            style={
                                StyleSheet.flatten([styles.cancel_btn, { display: cancelDisplay }])
                            }
                            onPress={cancelClicked}>
                            <Text style={styles.btn_text}>취소</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.confirm_btn}
                            onPress={confirmClicked}>
                            <Text style={styles.btn_text}>확인</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

export default CommonDialog;
