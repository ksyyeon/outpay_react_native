import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Modal,
    TouchableOpacity,
} from 'react-native';
import {localStorage} from '../LocalStorage';

export default class AccessModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal visible={this.props.visible} transparent={true}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Image
                            style={styles.logo_image}
                            source={require('../../assets/images/4.png')}
                        />
                        <Text style={styles.header_text}>
                            아웃페이에서는{'\n'}아래의 앱 접근권한을 사용하고
                            있습니다.
                        </Text>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.content_item}>
                            <Text style={styles.title_text}>
                                · 저장공간 (필수)
                            </Text>
                            <Text style={styles.desc_text}>
                                기기의 내부 저장소 사용
                            </Text>
                        </View>
                        <View style={styles.content_item}>
                            <Text style={styles.title_text}>
                                · 주소록 (선택)
                            </Text>
                            <Text style={styles.desc_text}>
                                결제를 부탁할 대상자 연락처 입력
                                {'\n'}
                                수신 차단 연락처 입력
                            </Text>
                        </View>
                        <View style={styles.content_item}>
                            <Text style={styles.title_text}>
                                · 휴대전화 (선택)
                            </Text>
                            <Text style={styles.desc_text}>
                                푸시 알림 서비스 제공
                            </Text>
                        </View>
                        <Text style={styles.note_text}>
                            선택적 접근권한은 해당 기능을 사용하실 때 동의를
                            받으며, 허용하지 않으셔도 아웃페이를 이용하실 수
                            있습니다.
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={styles.footer}
                        activeOpacity={1}
                        onPress={() => {
                            this.props.confirmClicked();
                            localStorage.setUserVarsValue('accessAgree', true);
                        }}>
                        <Text style={styles.btn_text}>
                            위의 내용을 확인했습니다.
                        </Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        width: '100%',
        height: '30%',
        backgroundColor: '#ffff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderBottomColor: '#f0f0f0',
        borderBottomWidth: 1,
    },
    content: {
        flex: 1,
        backgroundColor: '#fff',
        // backgroundColor: '#f0f0f0',
        padding: 30,
    },
    content_item: {
        // backgroundColor: '#f2f2f2',
        padding: 20,
    },
    footer: {
        width: '100%',
        height: '8%',
        backgroundColor: '#ff6801',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo_image: {
        resizeMode: 'contain',
        width: 150,
    },
    icon_image: {
        resizeMode: 'contain',
        width: 50,
    },
    header_text: {
        fontFamily: 'NanumSquareR',
        fontSize: 16,
        color: '#000000',
        lineHeight: 30,
        textAlign: 'center',
    },
    title_text: {
        fontFamily: 'NanumSquareB',
        fontSize: 15,
    },
    desc_text: {
        fontFamily: 'NanumSquareR',
        fontSize: 13,
        padding: 10,
        color: 'gray',
        lineHeight: 20,
    },
    note_text: {
        fontFamily: 'NanumSquareR',
        fontSize: 11,
        color: 'gray',
        // backgroundColor: '#f0f0f0',
        paddingHorizontal: 20,
        marginTop: 30,
        lineHeight: 15,
        flexShrink: 1,
    },
    btn_text: {
        fontFamily: 'NanumSquareR',
        fontSize: 16,
        color: '#ffff',
    },
});
