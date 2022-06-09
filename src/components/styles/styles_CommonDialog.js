import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
    layout: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    dialog: {
        width: '80%',
        backgroundColor: 'white',
        elevation: 20,
        borderRadius: 20,
    },
    text_wrap: {
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontFamily: 'NanumSquareB',
        fontSize: 16,
    },
    content: {
        fontFamily: 'NanumSquareR',
        fontSize: 14,
        marginTop: 10,
        textAlign: 'center',
        lineHeight: 20,
    },
    btn_wrap: {
        borderColor: '#ddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 50,
        justifyContent: 'center',
    },
    btn_text: {
        fontFamily: 'NanumSquareB',
        fontSize: 16,
    },
    cancel_btn: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ddd',
        borderRightWidth: 1,
    },
    confirm_btn: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
