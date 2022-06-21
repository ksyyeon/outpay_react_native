import React, {useEffect, useState} from 'react';
import styles from '../styles/styles_CommonDialog';
import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const initialProps = {
    isVisible: false,
    titleDisplay: 'none',
    title: '',
    content: '',
    cancelDisplay: 'flex',
    confirmClicked: () => {},
    cancelClicked: () => {},
};

const CommonDialog = props => {
    console.log(props);
    const [dialogProps, setDialogProps] = useState(initialProps);
    const navigation = useNavigation();

    useEffect(() => {
        switch (props.dialogProps.calledBy) {
            case 'SetPinCode':
                setDialogProps(SetPinCodeProps(props.dialogProps.entryScreen));
                break;
            default:
                break;
        }
    }, [props]);

    const SetPinCodeProps = entryScreen => {
        return {
            isVisible: true,
            titleDisplay: 'none',
            title: '',
            content:
                entryScreen === 'OnBoarding'
                    ? '뒤로 가시면 가입과정이 초기화 됩니다.\n뒤로 가시겠습니까?'
                    : '뒤로 가시면 비밀번호 재설정 과정이 초기화 됩니다.\n뒤로 가시겠습니까?',
            cancelDisplay: 'flex',
            confirmClicked: () => {
                setDialogProps(initialProps);
                navigation.goBack();
            },
            cancelClicked: () => {
                setDialogProps(initialProps);
            },
        };
    };

    return (
        <Modal visible={dialogProps.isVisible} transparent={true}>
            <View style={styles.layout}>
                <View style={styles.dialog}>
                    <View style={styles.text_wrap}>
                        <Text
                            style={StyleSheet.flatten([
                                styles.title,
                                {display: dialogProps.titleDisplay},
                            ])}>
                            {dialogProps.title}
                        </Text>
                        <Text style={styles.content}>
                            {dialogProps.content}
                        </Text>
                    </View>
                    <View style={styles.btn_wrap}>
                        <TouchableOpacity
                            style={StyleSheet.flatten([
                                styles.cancel_btn,
                                {display: dialogProps.cancelDisplay},
                            ])}
                            onPress={dialogProps.cancelClicked}>
                            <Text style={styles.btn_text}>취소</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.confirm_btn}
                            onPress={dialogProps.confirmClicked}>
                            <Text style={styles.btn_text}>확인</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default CommonDialog;
