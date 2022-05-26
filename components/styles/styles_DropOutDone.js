import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        width: '100%',
        height: 60,
        backgroundColor: '#ffff',
        padding: 20,
        justifyContent: 'flex-start',
    },
    header_image: {
        resizeMode: 'contain',
        height: 20,
        width: 97,
    },
    content: {
        flex: 1,
        backgroundColor: '#ffff',
        alignItems: 'center',
    },
    content_image: {
        resizeMode: 'contain',
        height: 180,
        width: 320,
        marginTop: 100,
    },
    content_text: {
        fontSize: 20,
        fontFamily: 'NanumSquareR',
        marginTop: 30,
    },
    footer: {
        width: '100%',
        padding: 20,
        backgroundColor: '#ffff',
    },
    confirm_btn: {
        width: '100%',
        height: 50,
    },

    btn_gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },

    btn_text: {
        fontFamily: 'NanumSquareR',
        fontSize: 18,
        color: '#ffff',
    },
});
