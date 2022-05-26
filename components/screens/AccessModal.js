import React from 'react';
import styles from '../styles/styles_AccessModal';
import {View, Text, Image, Modal, TouchableOpacity} from 'react-native';
import {localStorage} from '../LocalStorage';

export default AccessModal = props => {
    return (
        <Modal visible={props.visible} transparent={true}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image
                        style={styles.logo_image}
                        source={require('../../assets/images/img_logo3.png')}
                    />
                    <Text style={styles.header_text}>
                        아웃페이에서는{'\n'}아래의 앱 접근권한을 사용하고
                        있습니다.
                    </Text>
                </View>
                <View style={styles.content}>
                    <View style={styles.content_item}>
                        <Text style={styles.title_text}>· 저장공간 (필수)</Text>
                        <Text style={styles.desc_text}>
                            기기의 내부 저장소 사용
                        </Text>
                    </View>
                    <View style={styles.content_item}>
                        <Text style={styles.title_text}>· 주소록 (선택)</Text>
                        <Text style={styles.desc_text}>
                            결제요청 수신 차단할 연락처 가져오기 결제를 부탁할
                            사람의 연락처 가져오기
                        </Text>
                    </View>
                    <View style={styles.content_item}>
                        <Text style={styles.title_text}>
                            · 푸시 알림 (선택)
                        </Text>
                        <Text style={styles.desc_text}>결제요청 수신 알림</Text>
                    </View>
                    <Text style={styles.note_text}>
                        선택적 접근권한은 해당 기능을 사용하실 때 동의를 받으며,
                        허용하지 않으셔도 아웃페이를 이용하실 수 있습니다.
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.footer}
                    activeOpacity={1}
                    onPress={() => {
                        props.confirmClicked();
                        localStorage.setUserVarsValue('accessAgree', true);
                    }}>
                    <Text style={styles.btn_text}>
                        위의 내용을 확인했습니다.
                    </Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};
