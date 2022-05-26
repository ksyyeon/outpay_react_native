import React from 'react';
import styles from '../styles/styles_CommonDialog';
import {View, Text, Modal, TouchableOpacity} from 'react-native';

export default CommonDialog = props => {
    return (
        <Modal visible={this.props.visible} transparent={true}>
            <View style={styles.layout}>
                <View style={styles.dialog}>
                    <View style={styles.text_wrap}>
                        <Text
                            style={
                                (styles.title, {display: props.titleDisplay})
                            }>
                            {this.props.title}
                        </Text>
                        <Text style={styles.content}>{props.content}</Text>
                    </View>
                    <View style={styles.btn_wrap}>
                        <TouchableOpacity
                            style={
                                (styles.cancel_btn,
                                {display: this.props.cancelDisplay})
                            }
                            onPress={this.props.cancelClicked}>
                            <Text style={styles.btn_text}>취소</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.confirm_btn}
                            onPress={this.props.confirmClicked}>
                            <Text style={styles.btn_text}>확인</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};
